import { TextInput, StyleSheet, Text, View, TouchableOpacity, Alert, Image } from "react-native";
import React, { useState } from 'react';

const ForgotPasswordScreen = () => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    console.log("Forgot Password button pressed!");
    Alert.alert('Success', 'Please check your email: ' + email);
  };

  return (
    <View style={styles.container}>
      

      <View style={styles.topImageContainer}>
        <Image source={require("../assets/logo.png")} />
        <Text style={styles.titleText}>SUFT YOUR STYLES</Text>
      </View>


      <View style={styles.inputContainer}>
        <View style={styles.phoneContainer}>
          <Text style={styles.labelText}>Phone Number*</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Please enter your phone number"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <View style={styles.emailContainer}>
          <Text style={styles.labelText}>Email Address*</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,

  },
  inputContainer: {
    gap: 20,
  },
  phoneContainer: {
    paddingTop: 10,
    paddingBottom: 14,
    gap: 5,
  },
  emailContainer: {
    paddingTop: 10,
    paddingBottom: 14,
    gap: 5,
  },
  titleText: {
    color: "#FF385C",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
  },
  topImageContainer: {
    alignItems: "center",
    marginBottom: 100,
  
  },

  labelText: {
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 18,
    textTransform: "capitalize",
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingVertical: 6,
    paddingRight: 12,
  },
  button: {
    backgroundColor: "#D3D3D3",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    lineHeight: 22,
    fontSize: 16,
  },
});