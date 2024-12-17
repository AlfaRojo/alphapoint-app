import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Login() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (username.trim()) {
      try {
        await AsyncStorage.setItem("username", username);
        router.push("/");
      } catch (error) {
        console.error("Error saving data", error);
        Alert.alert("Error", "Failed to save username");
      }
    } else {
      Alert.alert("Validation Error", "Please enter a valid username");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Enter username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <Pressable onPress={handleLogin} style={styles.button}>
        <Text>Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    color: "#fff",
  },
});
