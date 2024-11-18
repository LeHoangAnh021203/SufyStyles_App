import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions, StatusBar, Pressable } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import * as Icons from '../assets/Icon';
import { LinearGradient } from 'expo-linear-gradient';
import { Video } from 'expo-av'; // Make sure to install expo-av for video playback
import { setStatusBarBackgroundColor, setStatusBarStyle } from 'expo-status-bar';
import Slider from '@react-native-community/slider';
import { api } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height } = Dimensions.get('window');

export default function Reels({ route }) {
    const navigation = useNavigation();
    const videoRef = React.useRef(null);
    const [isPlaying, setIsPlaying] = React.useState(true);
    const [viewableItems, setViewableItems] = React.useState([]);
    const [position, setPosition] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [posts, setPost] = React.useState([]);
    const [loadingPost, setLoadingPost] = React.useState(false);
    const { postId } = route.params || 0;
    const [liked, setLiked] = React.useState({});
    const [likeCounts, setLikeCounts] = React.useState({});
    const [saved, setSaved] = React.useState({});

    const loadPost = async () => {
        setLoadingPost(true);
        try {
            const response = await fetch(`${api}/style/posts/all-video`, {
                method: "GET",
            });
            const data = await response.json();
            const shufflePost = shufflePosts(data, postId);
            setPost(shufflePost);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoadingPost(false);
        }
    }

    const shufflePosts = (posts, postId) => {
        // Tạo một bản sao của mảng bài viết để không thay đổi dữ liệu gốc
        const shuffledPosts = [...posts];
        if (postId != 0) {
            // Lọc bài viết có postId tương tự
            const matchingPosts = shuffledPosts.filter(post => post.postId === postId);
            const otherPosts = shuffledPosts.filter(post => post.postId !== postId);

            // Hoán đổi phần tử tại chỉ số i với phần tử tại chỉ số j
            for (let i = otherPosts.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1)); // Chọn một chỉ số ngẫu nhiên từ 0 đến i
                [otherPosts[i], otherPosts[j]] = [otherPosts[j], otherPosts[i]];
            }
            return [...matchingPosts, ...otherPosts];
        } else {
            for (let i = shuffledPosts.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1)); // Chọn một chỉ số ngẫu nhiên từ 0 đến i
                // Hoán đổi phần tử tại chỉ số i với phần tử tại chỉ số j
                [shuffledPosts[i], shuffledPosts[j]] = [shuffledPosts[j], shuffledPosts[i]];
            }

            return shuffledPosts;
        }
    };

    const checkLikeSave = async () => {
        const currentUserId = await AsyncStorage.getItem("userId") || null;
        if (currentUserId) {
            const savedPostsString = await AsyncStorage.getItem(`savedPosts_${currentUserId}`);
            const savedPosts = savedPostsString ? JSON.parse(savedPostsString) : [];
            posts.forEach((post) => {
              setSaved(preState =>({
                ...preState,
               [post.postId]: savedPosts.some((save) => save.postId === post.postId)
              }))
              setLiked(preState => ({
                ...preState,
                [post.postId]: post.likeList.some((liked) => liked.userId === currentUserId)
              }))
            });
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            navigation.setOptions({
                headerTitle: "For You",
                headerRight: () => (
                    <TouchableOpacity style={{ paddingRight: 16 }}>
                        <Icons.CameraIcon />
                    </TouchableOpacity>
                ),
                headerStyle: {
                    backgroundColor: 'transparent',
                    elevation: 0,
                    shadowColor: 'transparent', // Remove shadow on iOS
                    shadowOffset: {
                        width: 0,
                        height: 0,
                    },
                    shadowOpacity: 0,
                    shadowRadius: 0,
                },
                headerTintColor: '#ffffff',
                tabBarLabelStyle: {
                    color: '#ffffff',
                    fontSize: 13,
                },
            });
            loadPost();
            checkLikeSave();
            setStatusBarStyle('light');
            setStatusBarBackgroundColor('#010101');
            setIsPlaying(true);

            return () => {// Reset khi rời khỏi màn hình
                setIsPlaying(false);
                setStatusBarStyle('dark');
                setStatusBarBackgroundColor('#ffffff'); // Reset màu nền
            };

        }, [navigation])
    );
    // console.log(posts)
    const onViewableItemsChanged = React.useRef(({ viewableItems }) => {
        setViewableItems(viewableItems);
    });

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50, // 50% of the item must be visible
    };

    const onPlaybackStatusUpdate = (status) => {
        if (status.isLoaded) {
            setPosition(status.positionMillis); // Cập nhật vị trí hiện tại
            setDuration(status.durationMillis); // Cập nhật tổng thời gian
        }
    };
    const handleLike = async (adapterPosition) => {
        const token = await AsyncStorage.getItem('token');
        try {
            const response = await fetch(`${api}/style/posts/${adapterPosition}/like-action`, {
                method: "PUT",
                headers:
                {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.status == 401) {
                AsyncStorage.removeItem("userId");
                AsyncStorage.removeItem("token");
                navigation.navigate('LoginNav');
                return;
            }
            if (response.ok) {
                const likeNumber = posts.find((post) => post.postId == adapterPosition).likeList || null;
                setLiked(prevState => ({
                    ...prevState,
                    [adapterPosition]: !prevState[adapterPosition] // Đảo ngược trạng thái liked
                }));
                // Cập nhật số lượng like
                setLikeCounts(prevState => {
                    const currentCount = prevState[adapterPosition] || (likeNumber ? likeNumber.length : 0);
                    return {
                        ...prevState,
                        [adapterPosition]: liked[adapterPosition] ? currentCount - 1 : currentCount + 1 // Tăng hoặc giảm số lượng like
                    };
                });
            }
            if (response.status == 500) {
                // console.log(token)
            }

        } catch (error) {
            console.error("Error Action:", error);
        }
    }

    const handleSave = async (adapterPosition) => {
        try {
            // Lấy userId hiện tại từ AsyncStorage
            const currentUserId = await AsyncStorage.getItem('userId');

            if (!currentUserId) {
                AsyncStorage.removeItem("userId");
                AsyncStorage.removeItem("token");
                navigation.navigate('LoginNav');
                return; // Nếu không có userId, dừng lại
            }

            // Tìm bài viết theo adapterPosition
            const postToSave = posts.find(post => post.postId === adapterPosition);

            if (!postToSave) {
                console.log("Bài viết không tồn tại");
                return; // Nếu không tìm thấy bài viết, dừng lại
            }
            if (saved[adapterPosition]) {
                const savedPostsString = await AsyncStorage.getItem(`savedPosts_${currentUserId}`);
                const savedPosts = savedPostsString ? JSON.parse(savedPostsString) : [];
                const savedHasRemove = savedPosts.filter((post) => post.postId !== adapterPosition);
                await AsyncStorage.setItem(`savedPosts_${currentUserId}`, JSON.stringify(savedHasRemove));
                console.log('Xoá thành công');
            } else {
                // Lấy các thông tin cần thiết từ bài viết
                const { urlVideo, title, content, viewNumber, likeList, user, username } = postToSave;

                const savedPost = {
                    postId: adapterPosition,
                    urlVideo,
                    title,
                    content,
                    viewNumber,
                    likeCount: likeList.length,
                    username,
                    userId: user.userId,
                    userImage: user.urlImage,
                };

                // Lấy danh sách saved hiện tại từ AsyncStorage
                const savedPostsString = await AsyncStorage.getItem(`savedPosts_${currentUserId}`);
                const savedPosts = savedPostsString ? JSON.parse(savedPostsString) : [];

                // Thêm bài viết mới vào danh sách saved
                !savedPosts.some((post) => post.postId == savedPost.postId) && savedPosts.push(savedPost);

                // Lưu lại danh sách đã lưu vào AsyncStorage
                await AsyncStorage.setItem(`savedPosts_${currentUserId}`, JSON.stringify(savedPosts));

                console.log("Bài viết đã được lưu thành công");
            }
            setSaved(prevState => ({
                ...prevState,
                [adapterPosition]: !prevState[adapterPosition] // Đảo ngược trạng thái saved
            }))
        } catch (error) {
            console.error("Có lỗi xảy ra khi lưu bài viết:", error);
        }
    }

    const [expandedPostIds, setExpandedPostIds] = React.useState({}); // Quản lý trạng thái mở rộng cho từng bài viết
    

    const toggleDescription = (postId) => {
        setExpandedPostIds(prevState => ({
            ...prevState,
            [postId]: !prevState[postId] // Đảo ngược trạng thái mở rộng cho bài viết cụ thể
        }));
    };

    const renderItem = ({ item, index }) => {
        const isDescriptionExpanded = expandedPostIds[item.postId];
        const isVisible = viewableItems.some(viewable => viewable.item.postId === item.postId);
        return (
            <View style={styles.MainContainer}>
                <Video
                    source={{ uri: item.urlVideo }}
                    style={[styles.ImageContainer, {}]}
                    resizeMode='cover'
                    shouldPlay={isVisible && isPlaying}
                    isLooping
                    ref={videoRef}
                    onPlaybackStatusUpdate={onPlaybackStatusUpdate}

                />
                <LinearGradient
                    colors={['rgba(0, 0, 0, 0.50)', 'rgba(0, 0, 0, 0.00)']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    style={styles.filterImage}
                />
                <Pressable style={styles.PlayPauseContainer} onPress={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <></> :
                        <TouchableOpacity onPress={() => setIsPlaying(!isPlaying)} style={styles.PlayPauseBtn}>
                            <Text style={styles.PlayPauseText}><Icons.PlayIcon fill={'#ffffffa4'} width={96} height={96} /></Text>
                        </TouchableOpacity>
                    }
                </Pressable>
                {isPlaying ? <></> :
                    <Slider
                        style={styles.Slider}
                        minimumValue={0}
                        maximumValue={duration > 0 ? duration : 1} // Sử dụng duration để thiết lập maximumValue
                        value={position} // Giá trị hiện tại
                        onValueChange={(value) => {
                            // Tua video đến vị trí mới
                            videoRef.current.setPositionAsync(value); // Tua video đến vị trí được chọn
                        }}
                    />
                }
                <View style={styles.DataContainer}>
                    <View style={styles.PostUserData}>
                        <TouchableOpacity style={styles.PostUserDataContent} onPress={() => {navigation.navigate('profile',{postUserId: item.user.userId})}}>
                            <View style={styles.PostUserImage}>
                                <Image source={{uri: item.user.urlImage}} style={styles.PostUserImageImg} />
                            </View>
                            <Text style={styles.PostUserNameText}>{item.username}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.PostUserBtn}>
                            <Text style={styles.FollowText}>Follow</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.PostData}>
                        <Text style={styles.PostDataTitle} numberOfLines={1}>{item.title}</Text>
                        <View style={{ flexWrap: 'nowrap', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                            <Text style={styles.PostDataDescription} numberOfLines={isDescriptionExpanded ? undefined : 1}>{item.content}</Text>
                            {!isDescriptionExpanded && item.content.length > 0 && (
                                <Pressable onPress={() => toggleDescription(item.postId)}>
                                    <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: '500' }}>See more</Text>
                                </Pressable>
                            )}
                        </View>
                    </View>
                </View>
                <View style={styles.ActionContainer}>
                    <View style={styles.ActionContainerItem}>
                        <TouchableOpacity style={styles.likeActionBtn} onPress={() => {
                            handleLike(item.postId)
                        }}>
                            <Icons.LikeIcon width={28} height={28} strokeWidth={2} stroke={liked[item.postId] ? '#ff0000' : '#fff'} fill={liked[item.postId] ? '#ff0000' : 'transparent'} />
                        </TouchableOpacity>
                        <Text style={styles.ActionText}>
                            {likeCounts[item.postId] !== undefined ? likeCounts[item.postId] : (item.likeList ? item.likeList.length : 0)}
                        </Text>
                    </View>
                    <View style={styles.ActionContainerItem}>
                        <TouchableOpacity style={styles.commentActionBtn}>
                            <Icons.CommentIcon width={28} height={28} strokeWidth={2} stroke={'#fff'} />
                        </TouchableOpacity>
                        <Text style={styles.ActionText}>{item.commentList ? item.commentList.length : 0}</Text>
                    </View>
                    <View style={styles.ActionContainerItem}>
                        <TouchableOpacity style={styles.savedActionBtn} onPress={() => {
                            handleSave(item.postId);
                        }}>
                            <Icons.SaveIcon width={28} height={28} strokeWidth={2} stroke={saved[item.postId] ? '#D8CD8C' : '#fff'} fill={saved[item.postId] ? '#EFD01D' : 'transparent'} />
                        </TouchableOpacity>
                        <Text style={styles.ActionText}>{item.saveNumber}</Text>
                    </View>
                    <View style={styles.ActionContainerItem}>
                        <TouchableOpacity style={styles.shareActionBtn}>
                            <Icons.ShareIcon width={28} height={28} fill={'#fff'} />
                        </TouchableOpacity>
                        <Text style={styles.ActionText}>0</Text>
                    </View>
                </View>
            </View>
        )
    };

    return (
        <>
            {
                loadingPost ?
                    (
                        <Text style={{ color: '#010101' }}>Post are loading</Text>
                    )
                    :
                    (
                        <FlatList
                            data={posts}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.postId.toString()}
                            showsVerticalScrollIndicator={false}
                            style={{
                                position: 'absolute', top: -56, bottom: 0, left: 0, right: 0
                            }}

                            snapToInterval={height - 52} // Snap to the height of the screen
                            pagingEnabled // Enable paging
                            decelerationRate="fast" // Smooth scrolling

                            onViewableItemsChanged={onViewableItemsChanged.current}
                            viewabilityConfig={viewabilityConfig}
                        />
                    )
            }
        </>
    )
}
const styles = StyleSheet.create({
    MainContainer: {
        width: '100%',
        height: height - 52,
    },
    ImageContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -3
    },
    filterImage: {
        position: 'absolute',
        top: -55,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -2
    },
    PlayPauseContainer: {
        position: 'absolute',
        top: -55,
        left: 0,
        right: 0,
        bottom: 0,
        // zIndex: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ImageContainerImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    DataContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        paddingBottom: 16,
        paddingLeft: 16,
        flexDirection: 'column',
        gap: 8
    },
    Slider: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1
    },
    FollowText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '500'
    },
    PostUserData: {
        flexDirection: 'row',
        gap: 12
    },
    PostUserDataContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12
    },
    PostUserImage: {
        width: 32,
        height: 32,
        borderRadius: 90,
        overflow: 'hidden'
    },
    PostUserImageImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    PostUserNameText: {
        color: '#ffffff',
        fontSize: 16,
        lineHeight: 22,
    },
    PostUserBtn: {
        borderRadius: 10,
        backgroundColor: '#ff385c',
        paddingVertical: 6,
        paddingHorizontal: 16,
    },
    PostData: {
        marginBottom: 4
    },
    PostDataTitle: {
        color: '#ffffff',
        fontSize: 20,
        lineHeight: 24,
        fontWeight: "500",
        maxWidth: 325
    },
    PostDataDescription: {
        color: '#ffffff',
        fontSize: 15,
        lineHeight: 24,
        maxWidth: 325
    },
    ActionContainer: {
        flexDirection: 'column',
        position: 'absolute',
        bottom: 0,
        right: 0,
        gap: 20,
        paddingBottom: 24,
        paddingRight: 16
    },
    ActionText: {
        color: '#fff'
    },
    ActionContainerItem: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4
    },
    filterImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0 // Đặt zIndex cao hơn để nó nằm trên ảnh
    },
})