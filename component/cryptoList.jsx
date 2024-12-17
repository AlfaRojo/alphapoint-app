import { useEffect, useState } from 'react';
import { View, ActivityIndicator, FlatList, Pressable, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

import { getTopCryptos } from '../lib/coinlore'
import { AnimatedCryptoCard } from './cryptoCard'

export function CryptoList() {

  const [cryptos, setCryptos] = useState([]);
  const insets = useSafeAreaInsets();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const currentUser = AsyncStorage.getItem("username");
    if (!currentUser) {
      router.push('/login');
    }
    currentUser.then((user) => {
      setUsername(user);
    });

  }, []);

  useEffect(() => {
    getTopCryptos().then((crypto) => {
      setCryptos(crypto)
    });
  }, [])

  const logout = () => {
    AsyncStorage.removeItem("username").then(() => {
      setUsername("");
    });
  }

  return (
    <View style={[{ paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <Text style={styles.wellcome}>Wellcome {username} to the Top 50 Cryptos</Text>
      <Link asChild href="/login">
      <Pressable onPress={logout}>
        <Text style={styles.logout}>
          <SimpleLineIcons name="logout" size={24} color="white" />
          Logout
        </Text>
      </Pressable>
      </Link>
        {
            cryptos.length === 0 ? (
                <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
                    <ActivityIndicator size={"large"}/>
                </View>
            ) :(
              <FlatList
                  data={cryptos}
                  keyExtractor={(crypto) => crypto.id}
                  renderItem={({item, index}) => (
                      <AnimatedCryptoCard crypto={ item } index={ index }/>
                  )}
              />
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wellcome: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20
  },
  logout: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  }
});