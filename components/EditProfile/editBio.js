import { Text, View, TouchableOpacity, ToastAndroid, TextInput, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState,useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../config";

export default function EditBio({ route }) {
    const navigation = useNavigation();
    const ToastMessage = () => {
        ToastAndroid.show("Save Successfully !", ToastAndroid.SHORT);
    };
    const { currentBio } = route.params;
    const [bio, setBio] = useState("instagram: @leanh_0212");

    useEffect(() => {
        setBio(currentBio);
    }, [])

    const updateProfile = async (username) => {
        const userId = await AsyncStorage.getItem("userId");
        const token = await AsyncStorage.getItem("token");
        try {

            const response = await fetch(`${api}/user/profile/edit/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ bio: username }),
            });

            const data = await response.json();
            ToastMessage();
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "white",
            }}
        >
            <View style={{ padding: 20, flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                    <Ionicons name="close-outline" size={24} color="black" />
                </TouchableOpacity>
                <Text style={{ fontWeight: 500, fontSize: 17 }}>
                    Bio
                </Text>
                <TouchableOpacity onPress={() => updateProfile(bio)}>
                    <AntDesign name="check" size={24} color="#4EB77B" />
                </TouchableOpacity>
            </View>
            <View
                style={{
                    width: "100%",
                    display: "flex",
                    paddingHorizontal: 17,
                    paddingTop: 42,
                    paddingBottom: 86,
                    alignItems: "center",
                    alignSelf: "stretch",
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
                        value={bio}
                        onChangeText={(value) => setBio(value)}
                        editable={true}
                        style={{
                            color: "#161823",
                        }}
                    ></TextInput>
                </View>
                <View
                    style={{
                        paddingHorizontal: 12,
                        paddingVertical: 7,
                        display: "flex",
                        width: "90%",
                    }}
                ></View>

                <Text
                    style={{
                        fontSize: 12,
                        color: "#666",
                        marginTop: 5,
                        borderColor: "none",
                        fontWeight: 400,
                    }}
                >
                    Something about you that can make friends easier!!!
                </Text>
            </View>
        </SafeAreaView>
    );
}