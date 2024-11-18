import { TextInput, StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { CheckBox } from 'react-native-elements';
import React, { useState } from 'react';
import { Linking } from 'react-native'; 
import { api } from "../config";
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isSelectedTerm, setSelectedTerm] = useState(false);
  const [isSelectedAds, setSelectedAds] = useState(false);
  const navigation = useNavigation(); // Khai báo navigation

  const handleLinkTerm = () => {
    navigation.navigate('TermScreen');
  };

  const handleSignUp = async () => {
    console.log("Sign Up button pressed!");
    if (!isSelectedTerm) {
      Alert.alert('Error', 'You must agree to the terms of use to sign up.');
      return;
    }

    const username = email.split('@')[0]; // Lấy phần trước dấu '@' làm username
    const profileName = username; 

    try {
      const response = await fetch(`${api}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username, 
          profileName: profileName, 
          email: email,
          password: password,
          phone: phone,
          isAcceptMarketing: isSelectedAds,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'User  created successfully!');
      } else {
        Alert.alert('Error', data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={{}}>
          <View style={styles.emailContainer}>
            <Text style={styles.labelText}>Email Address*</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Example) sufy@sufy.styles.com"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.passwordContainer}>
            <Text style={styles.labelText}>Password*</Text>
            <TextInput
              style={styles.textInput}
              placeholder="8-16 letter containing an uppercase and a number"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          
          <View style={styles.passwordContainer}>
            <Text style={styles.labelText}>Phone Number</Text>
            <TextInput
              style={styles.textInput}
              placeholder="10 number is required"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <View>
            <CheckBox
              title={
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                  <Text style={{ color: '#161823', fontSize: 14, fontWeight: "300" }}>
                    [Required] You agree to all
                  </Text>
                  <TouchableOpacity onPress={handleLinkTerm}>
                    <Text style={{ color: '#FF385C', fontSize: 14, fontWeight: "300", textDecorationLine: 'underline' }}>
                      Terms of use
                    </Text>
                  </TouchableOpacity>
                  <Text style={{ color: '#161823', fontSize: 14, fontWeight: "300" }}>
                    ?
                  </Text>
                </View>
              }
              checked={isSelectedTerm}
              onPress={() => setSelectedTerm(!isSelectedTerm)}
              containerStyle={{ backgroundColor: '#fff', borderColor: '#fff', padding: 0, marginLeft: 0 }}
              textStyle={{ color: '#161823', fontSize: 14, width: '100%', fontWeight: "300" }}
              size={30}
            />
          </View>

          <View>
            < CheckBox

              title={
                <Text style={{ color: '#161823', fontSize: 14, fontWeight: "300" }}>
                  [Optional] I agree to receiving advertising information.
                </Text>

              }
              checked={isSelectedAds}
              onPress={() => setSelectedAds(!isSelectedAds)}
              containerStyle={{ backgroundColor: '#fff', borderColor: '#fff', padding: 0, marginLeft: 0, margin: 10 }}
              textStyle={{ color: '#161823', fontSize: 14, width: '100%', fontWeight: "300" }}
              size={30}
            />
          </View>

        </View>

        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Join for your expierience</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default SignUpScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  inputContainer: {
    paddingHorizontal: 20,
    gap: 20
  },
  emailContainer: {
    paddingTop: 10,
    paddingBottom: 14,
    gap: 5
  },
  passwordContainer: {
    paddingTop: 10,
    paddingBottom: 14,
    gap: 5
  },
  phoneContainer: {
    paddingTop: 10,
    paddingBottom: 14,
    gap: 5
  },
  labelText: {
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 18,
    textTransform: "capitalize"
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingVertical: 6,
    paddingRight: 12
  },
  signUpButton: {
    backgroundColor: "#D3D3D3",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 20,
  },
  signUpButtonText: {
    color: "#fff",
    fontWeight: "bold",
    lineHeight: 22,
    fontSize: 16,
  },
});