import { TextInput, StyleSheet, Text, View, TouchableOpacity, Alert,Image } from "react-native";
import React, { useState } from 'react';

const FindEmailScreen = () => {
  const [phone, setPhone] = useState('');

  const handleFindEmail = async () => {
    console.log("Find Email button pressed!");
    Alert.alert('Success', 'Email found!: ' + phone);
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
            placeholder="Enter your phone number"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleFindEmail}>
          <Text style={styles.buttonText}>Find Email</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FindEmailScreen;

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
  phoneContainer: {
    paddingTop: 10,
    paddingBottom: 14,
    gap: 5,
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