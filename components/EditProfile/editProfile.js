import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ImagePicker,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { imagesDataURL } from "../../assets/constants/data";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function EditProfile({ route }) {
  const navigation = useNavigation();

  const [selectedImage, setSelectedImage] = useState(imagesDataURL[0]);
  const [userData, setUser] = useState();
  const {user} = route.params;
  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: (4, 4),
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setSelectedImage(result.constants[0].uri);
    }
  };

  const handleUsernamePress = () => {
    navigation.push("Username", { currentUsername: userData.username });
  };

  const handleNamePress = () => {
    navigation.push("Name", { currentName: userData.profileName });
  };

  const handleBioPress = () => {
    navigation.push("Bio", { currentBio: userData.bio });
  };
  useEffect(() => {
    setUser(user);

  }, [user]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 22,
      }}
    >
      <ScrollView>
        <View
          name="headerProfile"
          style={{
            alignItems: "center",
            marginVertical: 22,
          }}
        >
          <TouchableOpacity name="profileImage" onPress={handleImageSelection}>
            <Image
              source={selectedImage ? { uri: selectedImage }: { uri: user.urlImage }}
              style={{
                height: 96,
                width: 96,
                borderRadius: 85,
              }}
            />

            <View
              name="editIcon"
              style={{
                position: "absolute",
                bottom: 40,
                right: -5,
                zIndex: 9999,
                width: 32,
                height: 32,
                borderRadius: 85,
                borderColor: "#D9D9D9",
                borderWidth: 1,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AntDesign
                name="edit"
                size={13}
                color="black"
                backgroundColor={Colors.white}
              />
            </View>
            <Text
              name="profileTitle"
              style={{
                paddingTop: 16,
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              Profile photo
            </Text>
          </TouchableOpacity>
        </View>

        <View name="bodyProfile">
          <View
            name="username"
            style={{
              marginBottom: 6,
              width: "100%",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 600,
                width: "30%",
              }}
            >
              Username
            </Text>
            <View
              style={{
                flexDirection: "column",
                width: "70%",
              }}
            >
              <TouchableOpacity
                onPress={handleUsernamePress}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 7,
                  borderRadius: 5,
                  alignSelf: "stretch",
                  display: "flex",
                  borderColor: "#D9D9D9",
                  borderWidth: 1,
                }}
              >
                <TextInput
                  value={user.username}
                  onChangeText={(value) => setUsername(value)}
                  editable={false}
                  style={{
                    color: "#161823",
                  }}
                ></TextInput>
              </TouchableOpacity>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#666",
                    marginTop: 5,
                    borderColor: "none",
                  }}
                >
                  www.sufy.com/@{user.username}
                </Text>
              </View>
            </View>
          </View>

          {/* <----------------------------NAME----------------------------> */}

          <View
            name="name"
            style={{
              marginBottom: 6,
              width: "100%",
              flexDirection: "row",
              paddingVertical: 16,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 600,
                width: "30%",
              }}
            >
              Name
            </Text>
            <View
              style={{
                flexDirection: "column",
                width: "70%",
              }}
            >
              <TouchableOpacity
                onPress={handleNamePress}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 7,
                  borderRadius: 5,
                  alignSelf: "stretch",
                  display: "flex",
                  borderColor: "#D9D9D9",
                  borderWidth: 1,
                }}
              >
                <TextInput
                  value={user.profileName}
                  onChangeText={(value) => setName(value)}
                  editable={false}
                  style={{
                    color: "#161823",
                  }}
                ></TextInput>
              </TouchableOpacity>
            </View>
          </View>

          {/* <----------------------------BIO----------------------------> */}

          <View
            name="bio"
            style={{
              marginBottom: 6,
              width: "100%",
              flexDirection: "row",
              paddingVertical: 16,
              height: "auto",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 600,
                width: "30%",
              }}
            >
              Bio
            </Text>
            <View
              style={{
                flexDirection: "column",
                width: "70%",
              }}
            >
              <TouchableOpacity
                onPress={handleBioPress}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 7,
                  borderRadius: 5,
                  alignSelf: "stretch",
                  display: "flex",
                  borderColor: "#D9D9D9",
                  borderWidth: 1,
                }}
              >
                <TextInput
                  value={user.bio}
                  onChangeText={(value) => setBio(value)}
                  editable={false}
                  multiline={true}
                  style={{
                    color: "#161823",
                    minHeight: 80,
                    textAlignVertical: "top",
                  }}
                ></TextInput>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* <----------------------------FOOTER----------------------------> */}

        <View
          name="footerProfile"
          style={{
            marginTop: 50,
            backgroundColor: "white",
            height: "auto",
          }}
        >
          <TouchableOpacity
            onPress={() => {}}
            style={{
              padding: 10,
              borderRadius: 5,

              alignItems: "center",
            }}
          >
            <Text style={{ color: "#297DCB", fontSize: 14, fontWeight: 500 }}>
              Change to account for work
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {}}
            style={{
              backgroundColor: "white",
              padding: 10,
              borderRadius: 5,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#297DCB", fontSize: 14, fontWeight: 500 }}>
              Account settings
            </Text>
          </TouchableOpacity>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}