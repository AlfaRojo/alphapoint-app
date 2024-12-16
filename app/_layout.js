import { Slot } from "expo-router";
import { View, Text  } from "react-native";

export default function Layout({ children }) {
    return (
        <View>
            <Slot />
        </View>
    );
}