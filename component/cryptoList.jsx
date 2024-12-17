import { useEffect, useState } from 'react';
import { View, ActivityIndicator, FlatList, Pressable, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';

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
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <Text>Wellcome {username} to the Top 50 Cryptos</Text>
      <Link asChild href="/login">
      <Pressable onPress={logout}>
        <Text>
          <Ionicons name="return-up-back" size={24} color="black" />
          Logout
        </Text>
      </Pressable>
      </Link>
      <Link asChild href="/about">
      <Pressable>
        <Entypo name="info-with-circle" size={24} color="black" />
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