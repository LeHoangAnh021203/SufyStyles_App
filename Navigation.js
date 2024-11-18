import { NavigationContainer, useFocusEffect, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, Image, Pressable } from "react-native";
import Reels from "./screens/Reels";
import AntDesign from '@expo/vector-icons/AntDesign';
import LoginNav from "./Navigations/LoginNav";
import * as Icons from "./assets/Icon";
import Home from "./screens/Home";
import Shop from "./screens/Shop";
import Saved from "./screens/Saved";
import { StatusBar } from "expo-status-bar";
import ProfileStack from "./Navigations/ProfileStack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from "react";

const Tab = createBottomTabNavigator();

export default function Navigation() {


    const TabGroup = () => {
        const navigation = useNavigation();
        
        const tabBarIcon = (Icon, focused, mainColor) => (
            <View style={{ width: 26, height: 26 }}>
                <Icon
                    focused={focused}
                    width={26}
                    height={24}
                    stroke={focused ? mainColor : '#908C95'}
                    strokeWidth={2}
                />
            </View>
        );

        const tabBarLabel = (label, focused, mainColor) => (
            <Text style={{ color: focused ? mainColor : '#908C95' }}>{label}</Text>
        );

        return (
            <Tab.Navigator
                initialRouteName="home"
                screenOptions={({ route }) => ({
                    headerTitleAlign: 'center',
                    tabBarStyle: {
                        height: 52,
                        paddingTop: 4,
                        paddingBottom: 0,
                        backgroundColor: route.name === 'reels' ? '#010101' : '#ffffff'
                    },
                    tabBarLabelStyle: {
                        fontSize: 13
                    }
                })}
            >
                <Tab.Screen
                    name="home"
                    component={Home}
                    options={{
                        tabBarIcon: ({ focused }) => tabBarIcon(Icons.HomeIcon, focused, '#010101'),
                        tabBarLabel: ({ focused }) => tabBarLabel('Home', focused, '#010101'),
                    }}
                />
                <Tab.Screen
                    name="reels"
                    component={Reels}
                    options={{
                        tabBarIcon: ({ focused }) => tabBarIcon(Icons.ReelIcon, focused, "#ffffff"),
                        tabBarLabel: ({ focused }) => tabBarLabel('Reels', focused, '#ffffff'),
                    }}
                />
                <Tab.Screen
                    name="shop"
                    component={Shop}
                    options={{
                        tabBarIcon: ({ focused }) => tabBarIcon(Icons.ShopIcon, focused, '#010101'),
                        tabBarLabel: ({ focused }) => tabBarLabel('Shop', focused, '#010101'),
                    }}
                />
                <Tab.Screen
                    name="Saved posts"
                    component={Saved}
                    options={{
                        tabBarIcon: ({ focused }) => tabBarIcon(Icons.SaveIcon, focused, '#010101'),
                        tabBarLabel: ({ focused }) => tabBarLabel('Saved', focused, '#010101'),
                        headerTitleAlign: 'left',
                        headerLeft: () => (
                            <Pressable onPress={() => navigation.navigate('reels')} style={{ paddingLeft: 17 }}>
                                <AntDesign name="left" size={24} color="black" />
                            </Pressable>
                        ),
                    }}
                />
                <Tab.Screen
                    name="ProfileStack"
                    component={ProfileStack}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={{ width: 26, height: 26, borderColor: focused ? '#010101' : '#908C95', borderWidth: 1, borderRadius: 15, padding: 1 }}>
                                <Image source={require('./assets/Profile.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                            </View>
                        ),
                        tabBarLabel: ({ focused }) => tabBarLabel('Profile', focused, '#010101'),
                    }}
                />
                <Tab.Screen
                    name="LoginNav"
                    component={LoginNav}
                    options={{
                        headerShown: false,
                        tabBarButton: () => null
                    }}
                />

            </Tab.Navigator>
        );
    };

    return (
        <>
            <StatusBar style="dark" />
            <NavigationContainer>
                <TabGroup />
            </NavigationContainer>
        </>
    );
}