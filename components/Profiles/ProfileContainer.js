import { Button, Image, StyleSheet, Text, View, TouchableOpacity, Pressable } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useState } from "react";
import { api } from "../../config";
import { useEffect } from "react";
export default function ProfileContainer({ user }) {
  const navigation = useNavigation();
  const [userData, setUserData] = useState('');
  const NumberFollower = userData.followers?.length || 0;
  const NumberFollowing = userData.following?.length || 0;
  const [isFollowing, setIsFollowing] = React.useState(false);
  const [showFollow, setShowFollow] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);
  const checkIfFollowing = (userId) => {
    const isUserFollowing = userData.followers?.some((item) => {
      return item.userId === userId;
    });
    setIsFollowing(isUserFollowing);
    setShowFollow(isUserFollowing);
  };
  const getCurrentUser = async () => {
    const userId = await AsyncStorage.getItem("userId");
    if (userId) {
      setCurrentUser(userId);

    }
  }
  const followData = [
    userData.followers,
    userData.following
  ]
  const handlefollow = async (userId, isFollow) => {
    const token = await AsyncStorage.getItem("token");
    try {
      const response = await fetch(`${api}/user/func/follow?userId=${userId}&isFollowed=${isFollow}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        const error = contentType && contentType.includes("application/json")
          ? await response.json()
          : await response.text();
        console.error("API error:", error);
        return error.message || error; 
      }
      const message = await response.text();
      console.log("API response:", message);
      return message; 
    } catch (error) {
      console.log(error)
    }
  }
  const handleFollowToggle = async () => {
    const result = await handlefollow(userData.userId, !isFollowing);
    if (result === "followed" || result === "unfollowed") {
      setIsFollowing(!isFollowing);
      setShowFollow(!showFollow); // Update button label
      
    }
  };
  useFocusEffect(
    useCallback(() => {
      getCurrentUser();
    }, [])
  );

  useEffect(() => {
    if (user && currentUser) {
      checkIfFollowing(currentUser);
      setUserData(user);
    }
  }, [user, currentUser, userData])

  return (
    <View style={styles.profileInfoContainer} >
      <View style={styles.profileHeader} >
        <View style={styles.profilePictureContainer} >
          <Image source={{ uri: user.urlImage }} style={{ width: 96, height: 96 }} />
        </View>
        <View style={styles.profileDetails} >
          <View style={styles.profileName}>
            <Text style={{
              fontFamily: "Roboto",
              fontSize: 24,
              fontWeight: 400,
            }} >{userData.username}</Text>
          </View>
          <View style={styles.profileFollow}>
            <View style={styles.profileFollowers}>
              <Pressable onPress={() => navigation.navigate('followScreen', { name: "followers", followData: followData })}>
                <Text>Followers <Text style={{ fontWeight: 600 }}>{NumberFollower}</Text></Text>
              </Pressable>
            </View>
            <View style={styles.profileFollowing}>
              <Pressable onPress={() => navigation.navigate('followScreen', { name: "following", followData: followData })}>
                <Text>Following <Text style={{ fontWeight: 600 }}>{NumberFollowing}</Text></Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.profileBio} >
        <Text style={{ fontWeight: 500, fontSize: 14 }}>
          {user.profileName}
        </Text>
        <Text style={{ fontWeight: 400, fontSize: 14 }}>{userData.bio}</Text>
      </View>
      <View style={styles.profileButton} >
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={currentUser == userData.userId ? styles.followBTN : styles.followBTNAlter} onPress={() => currentUser == userData.userId ? navigation.navigate('EditProfile', { user }) : handleFollowToggle()}>
            <Text style={{ fontFamily: 'Roboto', fontSize: 13, color: '#fff', fontWeight: 500, lineHeight: 22 }} >{currentUser == userData.userId ? 'Edit Profile' : (showFollow ? 'Unfollow' : 'Follow')}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={styles.ShareYourProfileBTN} >
            <Text style={{ fontFamily: 'Roboto', fontSize: 13, color: '#010101', fontWeight: 500, lineHeight: 22 }} >Share Your Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    gap: 12,
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
