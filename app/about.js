import { Link } from 'expo-router';
import { ScrollView, Text } from "react-native";

export default function About() {
    return (
        <ScrollView>
            <Link href="/">Home</Link>
            <Text>
                This is a simple crypto currency tracker app. It uses the CoinGecko API to fetch the latest data on crypto currencies.
            </Text>
        </ScrollView>
    );
}