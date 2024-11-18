import {
    Text,
    View,
    TouchableOpacity,
    ToastAndroid,
    TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "../../config";

export default function EditUsername({ route }) {
    const navigation = useNavigation();
    const ToastMessage = () => {
        ToastAndroid.show("Save Successfully !", ToastAndroid.SHORT);
    };
    const { currentUsername } = route.params;
    const [username, setUsername] = useState("");

    const handleSave = () => {
        const usernameCheck = /^[a-zA-Z0-9._]+$/;
        if (!usernameCheck.test(username)) {
            ToastAndroid.show(
                "Invalid username! Please try again.",
                ToastAndroid.SHORT
            );
            return;
        }

        ToastMessage();
        navigation.navigate("editProfile", { updatedUsername: username });
    };



    useEffect(() => {
        setUsername(currentUsername);
    }, [])

    const updateProfile = async (username) => {
        const userId = await AsyncStorage.getItem("userId");
        const token = await AsyncStorage.getItem("token");
        try {
            const usernameCheck = /^[a-zA-Z0-9._]+$/;
            if (!usernameCheck.test(username)) {
                ToastAndroid.show(
                    "Invalid username! Please try again.",
                    ToastAndroid.SHORT
                );
                return;
            }
            const response = await fetch(`${api}/user/profile/edit/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({username: username}),
            });
            if (!response.ok) {
                const errorText = await response.text(); // Get the error response as text
                console.error('Error response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            ToastMessage();
        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        <SafeAreaView style={{
            flex: 1,

            backgroundColor: "white",
        }}>

            <View style={{ padding: 20, flexDirection: "row", justifyContent: "space-between", alignItems:'center' }}>
                <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                    <Ionicons name="close-outline" size={24} color="black" />
                </TouchableOpacity>
                <Text style={{ fontWeight: 500, fontSize: 17}}>
                    User Name
                </Text>
                <TouchableOpacity onPress={() => updateProfile(username)}>
                    <AntDesign name="check" size={24} color="#4EB77B" />
                </TouchableOpacity>
            </View>
            <View
                style={{
                    width: "100%",
                    paddingHorizontal: 17,
                    paddingTop: 42,
                    paddingBottom: 86,
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        paddingHorizontal: 12,
                        paddingVertical: 7,
                        borderRadius: 5,

                        display: "flex",
                        borderColor: "#D9D9D9",
                        borderWidth: 1,
                        width: "90%",
                    }}
                >
                    <TextInput
                        value={username}
                        onChangeText={(value) => setUsername(value)}
                        editable={true}
                        style={{
                            color: "#161823",
                        }}
                    />
                </View>
                <View
                    style={{
                        paddingHorizontal: 12,
                        paddingVertical: 7,
                        display: "flex",
                        width: "90%",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 14,
                            color: "#666",
                            marginTop: 5,
                            borderColor: "none",
                        }}
                    >
                        www.sufy.com/@{username}
                    </Text>
                </View>

                <View
                    style={{
                        paddingHorizontal: 12,
                        paddingVertical: 7,
                        display: "flex",
                        width: "90%",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 12,
                            color: "#666",
                            marginTop: 5,
                            borderColor: "none",
                            fontWeight: 400,
                        }}
                    >
                        Usernames can only contain letters, numbers, underscores, and
                        periods. Changing your username will also change your profile link.
                    </Text>
                </View>
            </View>
        </SafeAreaView>

    );
}