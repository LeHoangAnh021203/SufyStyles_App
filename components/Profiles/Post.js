import React, { useEffect } from 'react'
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import PostCard from './PostCard';
import MasonryList from '@react-native-seoul/masonry-list';
const data = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    description:'this is a description'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    description:'this is a 11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    description:'this is a description jfjfjfjfjfjfjfjfjfjfjfjf'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145871e29d72',
    title: 'Third Item',
    description:'this is a description 11111111111111111111111111111111111111111111111111'
  },
];

const Item = ({ item, user }) => (
  <PostCard item={item} user={user}/>
);

export default function Post({post,user }) {
  const [dataPost, setData] = React.useState([])
  const [ userData, setUserData] = React.useState('');

  useEffect(() => {
    // Here you can also set the dataPost based on the post prop if needed
    if (post) {
      setData(post);
      setUserData(user);  // Assuming post is an array of posts
    }
  }, [post]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
      <MasonryList
        data={dataPost}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <Item item={item} user={user} />}
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
