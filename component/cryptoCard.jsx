import { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, Animated } from 'react-native';

export function CryptoCard({ crypto }) {
    return (
        <View key={crypto.id} style={styles.card}>
            <Text style={styles.symbol}>{crypto.symbol}</Text>
            <Text style={styles.name}>{crypto.name}</Text>
            <Text style={styles.rank}>{crypto.rank}</Text>
            <Text style={styles.price_usd}>{crypto.price_usd}</Text>
            {/* <Image
            source={{ uri: crypto.graph }}
            resizeMode="contain"
            style={{
                width: 107,
                height: 147
            }}
            /> */}
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
      borderColor: "#fff"
    },
    symbol: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 10
    },
    name: {
      color: "#fff",
      fontSize: 16,
      marginTop: 10
    },
    rank: {
      color: "#fff",
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