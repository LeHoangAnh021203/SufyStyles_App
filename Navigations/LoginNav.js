import { View, TouchableOpacity } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../components/Login"
import SignUpScreen from "../components/SignUp";
import FindEmailScreen from "../components/FindEmail";
import TermScreen from "../components/Term"
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from '@react-navigation/native';
import ForgotPasswordScreen from "../components/ForgotPass";


const Stack = createNativeStackNavigator();

export default function LoginNav() {
    const navigation = useNavigation();
    return (

        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{
                    headerTitle: "",
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ paddingLeft: 12 }}
                            onPress={() => navigation.navigate("Login")}
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
                name="Login"
                component={Login}
                options={{
                    headerTitle: "",
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ paddingLeft: 12 }}
                            onPress={() => navigation.navigate("home")}
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
                name="FindEmailScreen"
                component={FindEmailScreen}
                options={{
                    headerTitle: "Find Email",
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ paddingLeft: 12 }}
                            onPress={() => navigation.navigate("Login")}
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
                name="ForgotPasswordScreen"
                component={ForgotPasswordScreen}
                options={{
                    headerTitle: "Forgot Password",
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ paddingLeft: 12 }}
                            onPress={() => navigation.navigate("Login")}
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
                name="TermScreen"
                component={TermScreen}
                options={{
                    headerTitle: "",
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ paddingLeft: 12 }}
                            onPress={() => navigation.navigate("SignUp")}
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
        </Stack.Navigator>

    );
}