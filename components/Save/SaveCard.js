import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

export default function SaveCard({ item }) {
    const navigation = useNavigation();
    return (
        <View style={styles.PostContainer}>
            <View style={styles.PostImage}>
                <Pressable style={styles.ImageContainer} onPress={() => navigation.navigate('reels', {postId: item.postId})}>
                    {/* <Image source={require('../../assets/Screenshot 2024-02-19 221257.png')} style={{ width: '100%',  borderRadius: 10, height: '100%' }} /> */}
                    <Video source={{ uri: item.urlVideo }} resizeMode='cover' style={{ width: '100%', borderRadius: 10, height: '100%' }} />
                    <View style={styles.VideoIndicator}>
                        <AntDesign name="playcircleo" size={13} color="white" />
                    </View>
                    <View style={styles.ViewCount}>
                        <AntDesign name="eyeo" size={15} color="white" />
                        <Text style={{ color: 'white', fontSize: 12 }}>{item.viewNumber}</Text>
                    </View>
                </Pressable>
            </View>
            <View style={styles.PostDetail}>
                <View style={styles.PostInterationContainer}>
                    <View style={styles.PostUser}>
                        <View style={styles.profilePictureContainer}>
                            <Image source={{ uri: item.userImage }} style={{ width: 26, height: 26, }} />
                        </View>
                        <Text>{item.username}</Text>
                    </View>
                    <View style={styles.PostLikeContainer}>
                        <View><AntDesign name="hearto" size={16} color="black" /></View>
                        <Text style={{ fontSize: 13 }} >{item.likeCount}</Text>
                    </View>
                </View>
                <Text numberOfLines={2} style={styles.Description}>
                    {item.title} {item.content}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    PostContainer: {
        width: '100%',
        paddingBottom: 24,
        alignSelf: 'stretch',
    },
    PostImage: {
        width: '100%',
        aspectRatio: 19 / 26,
        position: 'relative',
        borderRadius: 10,
        overflow: 'hidden',
    },
    VideoIndicator: {
        position: 'absolute',
        right: 10,
        top: 8,
    },
    ViewCount: {
        flexDirection: 'row',
        position: 'absolute',
        left: 0,
        bottom: 0,
        padding: 8,
        gap: 3,
        alignItems: 'center',
    },
    profilePictureContainer: {
        width: 26,
        height: 26,
        borderRadius: 100,
        overflow: 'hidden'
    },
    PostDetail: {
        width: '100%',
        paddingTop: 8,
        paddingHorizontal: 4,
    },
    PostInterationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
    },
    PostUser: {
        flexDirection: 'row',
        paddingLeft: 6,
        gap: 4,
    },
    PostLikeContainer: {
        flexDirection: 'row',
        gap: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ImageContainer: {
        width:'100%',
        height:'100%',
        borderWidth:1,
        borderColor:"#010101",
        borderStyle:'solid'
    },
    Description: {
        alignSelf: 'stretch',
        fontSize: 14,
        color: '#333'
    },
});
