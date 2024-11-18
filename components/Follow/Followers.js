import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SearchIcon } from '../../assets/Icon'; // Đảm bảo rằng bạn đã import đúng icon
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

export default function Followers({ followers }) {
  const [searchText, setSearchText] = React.useState('');
  const [followerData, setFollowerData] = React.useState([]);
  const navigation = useNavigation();


  const filteredData = followerData.filter(item =>
    item.profileName.toLowerCase().includes(searchText.toLowerCase())
  );


  useFocusEffect(
    React.useCallback(() => {
      setFollowerData(followers)
    }, [])
  )

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <View style={{ width: 24, height: 24, padding: 2 }}>
            <SearchIcon width={'100%'} height={'100%'} strokeWidth={2} stroke={'#4A5568'} />
          </View>
          <TextInput placeholder='Search' style={styles.searchInput} value={searchText} onChangeText={setSearchText} />
        </View>
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.userId.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity style={styles.profileData} onPress={() => { navigation.navigate('profile', { postUserId: item.userId }) }}>
              <Image source={{ uri: item.urlImage }} style={styles.profileImage} />
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{item.profileName}</Text>
                <Text style={styles.username}>@{item.username}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    padding: 17,
    paddingBottom: 8
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 5,
    padding: 7,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 17,
    paddingVertical: 16
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 99,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(34, 34, 34, 0.10)',
  },
  profileData: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 3,
  },
  profileInfo: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  profileName: {
    fontSize: 16,
    color: '#010101',
    fontWeight: '400',
    lineHeight: 22
  },
  username: {
    color: '#6A6A6A',
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '400'
  },
  followed: {
    backgroundColor: '#E5E5E5',
    flex: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    Text: {
      color: '#010101',
      fontWeight: '500',
      fontSize: 14,
      textAlign: 'center'
    }
  },
  notFollowed: {
    backgroundColor: '#010101',
    flex: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    Text: {
      color: '#ffffff',
      fontWeight: '500',
      fontSize: 14,
      textAlign: 'center'
    }
  },
  item: {
    padding: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});