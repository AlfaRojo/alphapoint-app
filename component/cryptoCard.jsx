import { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated, useColorScheme } from 'react-native';
import { Link } from 'expo-router';

export function CryptoCard({ crypto }) {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    return (
      <Link href={`${crypto.id}`}>
          <View key={crypto.id} style={[styles.card, isDarkMode && styles.cardDark]}>
            <Text style={[styles.symbol, isDarkMode && styles.symbolDark]}>#{crypto.rank} {crypto.name} ({crypto.symbol})</Text>
            <Text style={[styles.price_usd, isDarkMode && styles.price_usdDark]}>$ {parseFloat(crypto.price_usd).toLocaleString()}</Text>
            <Text
            style={[
                styles.percent_change_24h,
                crypto.percent_change_24h > 0
                ? styles.percent_change_24h_green
                : styles.percent_change_24h_red
            ]}
            >
            {crypto.percent_change_24h}%
            </Text>
          </View>
      </Link>
    )
}

export function AnimatedCryptoCard({ crypto, index }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        delay: index * 200,
        useNativeDriver: true,
      }).start();
  }, [opacity, index]);

  return (
      <Animated.View style={{ opacity }}>
          <CryptoCard crypto={ crypto } />
      </Animated.View>
  )
}

const styles = StyleSheet.create({
    card: {
      width: "80%",
      marginBottom: 36,
      padding: 16,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    cardDark: {
      backgroundColor: "#333",
      shadowColor: "#fff",
    },
    symbol: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 10
    },
    symbolDark: {
      color: "#fff",
    },
    price_usd: {
      color: "#fff",
      fontSize: 16,
    },
    price_usdDark: {
      color: "#fff",
    },
    percent_change_24h: {
      color: "gray",
      fontSize: 16,
    },
    percent_change_24h_green: {
      color: "green",
      fontSize: 16,
    },
    percent_change_24h_red: {
      color: "red",
      fontSize: 16,
      marginBottom: 10
    }
});