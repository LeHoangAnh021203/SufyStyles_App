import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const TermScreen = () => {
  const navigation = useNavigation(); // Get the navigation object

  const handleAgree = () => {
    navigation.navigate('SignUp'); // Navigate to the SignUp screen
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Terms of Use</Text>
        
        <Text style={styles.paragraph}>
          1. You must be 18 years or older to use this service.
        </Text>
        <Text style={styles.paragraph}>
          2. You agree to provide accurate and complete information when registering for an account.
        </Text>
        <Text style={styles.paragraph}>
          3. You are responsible for all activities that occur under your account.
        </Text>
        <Text style={styles.paragraph}>
          4. We reserve the right to modify or discontinue the service at any time without prior notice.
        </Text>
        <Text style={styles.paragraph}>
          5. We are committed to protecting your personal information in accordance with our privacy policy.
        </Text>
        <Text style={styles.paragraph}>
          6. You agree not to use the service for any illegal purposes.
        </Text>
        <Text style={styles.paragraph}>
          7. If you do not agree with these terms, you are not permitted to use the service.
        </Text>
      </ScrollView>

      <TouchableOpacity style={styles.agreeButton} onPress={handleAgree}>
        <Text style={styles.agreeButtonText}>Got it!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TermScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 24,
  },
  agreeButton: {
    backgroundColor: '#FF385C',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    margin: 20,
  },
  agreeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});