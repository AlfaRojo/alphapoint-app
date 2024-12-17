import { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, Animated, Pressable } from 'react-native';
import { Link } from 'expo-router';

export function CryptoCard({ crypto }) {
    return (
      <Link href={`${crypto.id}`} >
        <Pressable asChild>
          <View key={crypto.id} style={styles.card}>
            <Text style={styles.symbol}>#{crypto.rank} {crypto.name} ({crypto.symbol})</Text>
            <Text style={styles.price_usd}>$ {parseFloat(crypto.price_usd).toLocaleString()}</Text>
            <Text
            style={[
                styles.percent_change_24h,
                crypto.percent_change_24h > 0
                ? styles.percent_change_24h_green
                : styles.percent_change_24h_red,
            ]}
            >
            {crypto.percent_change_24h}%
            </Text>
          </View>
        </Pressable>
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
      marginBottom: 36,
      borderColor: "#000"
    },
    symbol: {
      color: "#000",
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 10
    },
    name: {
      color: "#000",
      fontSize: 16,
      marginTop: 10
    },
    rank: {
      color: "#000",
      fontSize: 16,
  
    },
    rice_usd: {
      color: "#eee",
      fontSize: 16,
  
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