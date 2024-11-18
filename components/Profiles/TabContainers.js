import { Button, Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Post from "./Post";
import TagProducts from "./TagProducts";



const Tab = createMaterialTopTabNavigator();

const TopTabs = ({ post,user }) =>{

  return (
    <Tab.Navigator
      screenOptions={
        {
          tabBarStyle: styles.containerStyle,
          tabBarIndicatorStyle: styles.indicator,
          tabBarItemStyle: styles.item,
          tabBarLabelStyle: styles.tabLabel,
          tabBarActiveTintColor: '#161823',

        }
      }>
      <Tab.Screen name="Post" children={(props) => <Post {...props} post={post} user={user} />} />
      <Tab.Screen name="Tag Products" component={TagProducts} />
    </Tab.Navigator>
  )
};

export default function TabContainers({ post,user }) {

  return (
    <TopTabs post={post} user={user}/>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#ffffff',
    elevation: 4, // Add shadow on Android
    shadowOpacity: 0.1, // Add shadow on iOS
    shadowColor: '#ffff',
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
