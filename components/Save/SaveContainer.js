import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FlatList, FlatListComponent, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import SaveCard from "./SaveCard";
import MasonryList from '@react-native-seoul/masonry-list';
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Item = ({ item }) => (
    <SaveCard item={item} />
)

export default function SaveContainer() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const fetchSavePost = async () => {
        setIsLoading(true);
        try {
            const userId = await AsyncStorage.getItem('userId');
            if (userId !== null) {
                // Nếu userId tồn tại, lấy savedPosts của userId
                const savedPostsString = await AsyncStorage.getItem(`savedPosts_${userId}`);
                const savedPosts = savedPostsString ? JSON.parse(savedPostsString) : [];

                // Lưu danh sách bài viết đã lưu vào biến data
                setData(savedPosts);
            } else {
                console.log("User  ID không tồn tại");
                AsyncStorage.removeItem("userId");
                AsyncStorage.removeItem("token");
                navigation.navigate('LoginNav');
                return;

            }
        } catch (error) {
            console.error("Có lỗi xảy ra khi lấy bài viết đã lưu:", error);
        } finally {
            setIsLoading(false);
        }
    }
    useFocusEffect(
        useCallback(() => {
            fetchSavePost();
        }, [])
    )


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
            {
                isLoading ?
                    (
                        <View><Text>Page loading</Text></View>
                    ) :
                    (
                        <MasonryList
                            data={data}
                            keyExtractor={(item) => item.postId}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => <Item item={item} />}
                            // onRefresh={() => refetch({ first: ITEM_CNT })}
                            // onEndReachedThreshold={0.1}
                            // onEndReached={() => loadNext(ITEM_CNT)}
                            contentContainerStyle={{
                                gap: 17
                            }}
                            style={{
                                gap: 12,
                            }}
                        />
                    )
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});