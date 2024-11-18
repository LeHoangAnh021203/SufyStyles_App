import { View, Text, ToastAndroid, TouchableOpacity, Alert } from "react-native";
import React, { Children, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../screens/Profile";
import FollowScreen from "../screens/FollowScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import EditProfile from "../components/EditProfile/editProfile";
import EditBio from "../components/EditProfile/editBio";
import EditName from "../components/EditProfile/editName";
import EditUsername from "../components/EditProfile/editUsername";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { LogoutIcon } from "../assets/Icon";
const Stack = createNativeStackNavigator();
export default function ProfileStack() {
  const navigation = useNavigation();
  const [username, setUsername] = React.useState("Khôi");
  const [user, setUser] = useState('');
  const [userId, setUserId] = useState(null);

  const handleLogout = () => {
    Alert.alert(
      "Are you sure?",
      "Do you really want to proceed?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { 
          text: "OK", 
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('userId');
              await AsyncStorage.removeItem('token');
              navigation.navigate('LoginNav');
            } catch (e) {
                console.error("Failed to clear AsyncStorage:", e);
            }
          }
        }
      ]
    );
  }

  // const ToastMessage = () => {
  //   ToastAndroid.show("Save Successfully !", ToastAndroid.SHORT);
  // };
  // const handleSave = () => {
  //   const usernameCheck = /^[a-zA-Z0-9._]+$/;
  //   if (!usernameCheck.test(username)) {
  //     ToastAndroid.show(
  //       "Invalid username! Please try again.",
  //       ToastAndroid.SHORT
  //     );
  //     return;
  //   }

  //   ToastMessage();
  //   navigation.navigate("EditProfile", { updatedUsername: username });
  // };
  const checkUserId = async () => {
    try {
      const id = await AsyncStorage.getItem('userId');
      if (id) {
        setUserId(id);
      } else {
        navigation.navigate("LoginNav");
      }
    } catch (e) {
      console.error(e);
    }
  };
  useFocusEffect(
    useCallback(() => {
      checkUserId();
    }, [])
  );
  return (
    <Stack.Navigator initialRouteName="profile">
      <Stack.Screen
        name="profile"
        component={Profile}
        options={{
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity
              style={{ paddingLeft: 12 }}
              onPress={() => {
                navigation.navigate("home");
              }}
            >
              <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity style={{ paddingRight: 12, paddingVertical: 4 }} onPress={() => handleLogout()}>
              <LogoutIcon width={20} height={20} stroke={'#010101'} strokeWidth={1.5} />
            </TouchableOpacity>
          ),
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="followScreen"
        component={FollowScreen}
        options={{
          headerTitle: "yz.co.kr",
          headerLeft: () => (
            <TouchableOpacity
              style={{ paddingLeft: 12, paddingRight: 16 }}
              onPress={() => {
                navigation.navigate("profile");
              }}
            >
              <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={{ paddingRight: 12 }}>
              <Entypo
                name="dots-three-vertical"
                size={20}
                color="black"
                style={{ paddingHorizontal: 5, paddingVertical: 3 }}
              />
            </View>
          ),
          headerShadowVisible: false,
        }}
      />

      <Stack.Screen
        name="EditProfile"
        options={{
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <MaterialIcons
                name="keyboard-arrow-left"
                size={24}
                color={Colors.black}
                onPress={() => navigation.goBack()}
              />
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "500",
                  lineHeight: 22,
                  marginLeft: 12,
                }}
              >
                Edit your Profile
              </Text>
            </View>
          ),
        }}
        component={EditProfile}
      />

      <Stack.Screen
        name="Username"
        options={{
          headerShown: false,
        }}
        component={EditUsername}
      />

      <Stack.Screen
        name="Name"
        options={{
          headerShown: false,
        }}
        component={EditName}
      />
      <Stack.Screen
        name="Bio"
        options={{
          headerShown: false,
        }}
        component={EditBio}
      />
    </Stack.Navigator>
  );
}
