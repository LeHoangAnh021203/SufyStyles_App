import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Followers from '../components/Follow/Followers';
import Following from '../components/Follow/Following';

const TopTab = createMaterialTopTabNavigator();
export default function FollowScreen({route}) {
  const {name} = route.params || "followers"
  const {followData} = route.params || [];
  const followers = followData[0] || {};
  const following = followData[1] || {};
    return (
        <View style={{ flex: 1 }}>
            <TopTab.Navigator
                screenOptions={{
                    tabBarStyle: styles.containerStyle,
                    tabBarIndicatorStyle: styles.indicator,
                    tabBarItemStyle: styles.item,
                    tabBarLabelStyle: styles.tabLabel,
                    tabBarActiveTintColor: '#161823',
                }}
                initialRouteName={name}
            >
                <TopTab.Screen name="followers" children={(props) => <Followers {...props} followers={followers} />} />
                <TopTab.Screen name="following" children={(props) => <Following {...props} following={following} />} />
            </TopTab.Navigator>
        </View>
    )
}
const styles = StyleSheet.create({
    containerStyle: {
      backgroundColor: '#ffffff',
      elevation: 2, // Add shadow on Android
      shadowOpacity: 1, // Add shadow on iOS
      shadowColor: '#a6a6a6',
    },
    indicator: {
      backgroundColor: '#FF385C',
      height: 3,
      borderRadius: 3,
    },
    item: {
      padding: 10,
      flexDirection: 'row',
    },
    tabLabel: {
      fontSize: 14,
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
  })
