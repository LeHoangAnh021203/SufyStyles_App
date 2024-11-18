import { TextInput, Image, StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from "../config";

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const isLoginButtonDisabled = !email || !password;
  
  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };
  const handleFindEmail = () => {
    navigation.navigate('FindEmailScreen');
  };
  const handleForgotPassword = () => {
    navigation.navigate('ForgotPasswordScreen');
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${api}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });

      const data = await response.json();
      console.log("Response data:", data)
      if (response.ok) {
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('userId', data.userId);
        navigation.navigate('home');

        Alert.alert('Login Successful', 'Welcome back!');
      } else {
        // Xử lý lỗi
        Alert.alert('Login Failed', data.message || 'Please check your credentials.');
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topImageContainer}>
        <Image source={require("../assets/logo.png")} />
        <Text style={styles.titleText}>SUFT YOUR STYLES</Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.emailContainer}>
          <Text style={styles.labelText}>Email Address</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Example) sufy@sufy.styles.com"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.passwordContainer}>
          <Text style={styles.labelText}>Password</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          style={[styles.loginButton, isLoginButtonDisabled && styles.disabledButton]}
          onPress={handleLogin}
          disabled={isLoginButtonDisabled}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.linkContainer}>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.linkText}>Email Sign Up</Text>
          </TouchableOpacity>
          <Text style={styles.separator}>|</Text>
          <TouchableOpacity onPress={handleFindEmail}>
            <Text style={styles.linkText}>Find Your Email</Text>
          </TouchableOpacity>
          <Text style={styles.separator}>|</Text>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.linkText}>Forgot Password</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../assets/google.png')} style={{ width: 24, height: 24 }} />
            <Text style={styles.socialButtonText}>Log in with Google</Text>
            <Text style={{ width: 24, height: 24 }}> </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../assets/facebook.png')} style={{ width: 24, height: 24 }} />
            <Text style={styles.socialButtonText}>Sign in with Facebook</Text>
            <Text style={{ width: 24, height: 24 }}> </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
  topImageContainer: {
    alignItems: "center",
    marginBottom: 80,
  },
  titleText: {
    color: "#FF385C",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
  },
  inputContainer: {
    paddingHorizontal: 20,
  },
  emailContainer: {
    marginBottom: 10,
  },
  passwordContainer: {
    marginBottom: 20,
  },
  labelText: {
    fontSize: 16,
    marginBottom: 5,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  loginButton: {
    backgroundColor: "#010101",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 20,

  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  linkText: {
    color: "#000000",
    marginHorizontal: 10,
  },
  separator: {
    color: "#000",
  },
  disabledButton: {
    backgroundColor: '#D3D3D3',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  socialButtonText: {
    marginLeft: 10,
    fontSize: 16,
  },
});
