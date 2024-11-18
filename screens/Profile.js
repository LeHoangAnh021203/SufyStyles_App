
import { useCallback, useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfileContainer from "../components/Profiles/ProfileContainer";
import TabContainers from "../components/Profiles/TabContainers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { api } from "../config"
const Tab = createMaterialTopTabNavigator();


export default Profile = ({ route }) => {
  const [user, setUser] = useState('');
  const [post, setPost] = useState('');
  const { postUserId } = route.params || {};
  const navigation = useNavigation();

  const getProfile = async (userId) => {
    try {
      const result = await fetch(`${api}/user/${userId}`);
      if (!result.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await result.json();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPost = async (userId) => {
    try {
      const response = await fetch(`${api}/style/posts/user?userId=${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const postData = await response.json();
      const filterVideo = postData ? postData.filter((post) => post.urlVideo != null) : [];
      setPost(filterVideo);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserId = async () => {
    const userID = await AsyncStorage.getItem('userId');
    if (userID) {
      const idToFetch = postUserId ? postUserId : userID; // Nếu postUser Id không có, sử dụng userID từ AsyncStorage
      await getProfile(idToFetch);
      await fetchPost(idToFetch);
    } else {
      navigation.navigate('LoginNav');
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchUserId();
    }, [postUserId])
  );

  // Log the post whenever it updates
  useEffect(() => {
    console.log('Updated Post');
  }, [post]);
  return (

    <View style={styles.profileContainer}>
      <ProfileContainer user={user} />
      <View style={styles.tabContentContainer}>
        <TabContainers post={post} user={user} />
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    gap: 8,
  },
  profileInfoContainer: {
    backgroundColor: 'white',
    paddingVertical: 24,
    paddingHorizontal: 17,
  },
  profileHeader: {
    flexDirection: 'row',
    gap: 20,
  },
  profileBio: {
    paddingLeft: 12,
    paddingTop: 12,
  },
  profileButton: {
    flexDirection: 'row',
    paddingTop: 12,
    gap: 12,
  },
  profilePictureContainer: {
    width: 96,
    height: 96,
    borderRadius: 100,
    overflow: 'hidden'
  },
  profileDetails: {
    gap: 12,
  },
  profileName: {},
  profileFollow: {
    flexDirection: 'row',
  },
  profileFollowers: {
    paddingRight: 12,
    borderStyle: 'solid',
    borderRightWidth: 1,
    borderRightColor: "#a0a0a0"
  },
  profileFollowing: {
    paddingLeft: 12,
  },
  profileFollowText: {
    fontFamily: "Roboto",
    fontSize: 13,
    fontWeight: 400,
  },
  followBTN: {
    paddingHorizontal: 12,
    paddingVertical: 3,
    backgroundColor: '#FF385C',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  followBTNAlter: {
    paddingHorizontal: 12,
    paddingVertical: 3,
    backgroundColor: '#000000',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ShareYourProfileBTN: {
    paddingHorizontal: 12,
    paddingVertical: 3,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#a0a0a0'
  },
  tabContentContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 17,
    flex: 1,
  }
})

