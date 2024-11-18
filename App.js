import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
//   ++++++++++++++++++++++++++++Cái này dùng đề reset lại đăng nhập+++++++++++++++++++++++++++++++
//   Khi cần thì mở ra chạy, đăng nhập được vào thì comment nó lại ko thì nó sẽ xóa đăng nhập vào lần reset sau
//   const clearAsyncStorage = async () => {
//     try {
//       await AsyncStorage.removeItem('userId');
//       await AsyncStorage.removeItem('token');
//     } catch (e) {
//         console.error("Failed to clear AsyncStorage:", e);
//     }
// };

// useEffect(() => {
//     // Clear storage on app start
//     clearAsyncStorage();
// }, []);
  return (
      <Navigation/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
