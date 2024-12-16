import { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

import { getTopCryptos } from '../lib/coinlore'
import { AnimatedCryptoCard } from './cryptoCard'

export function CryptoList() {

  const [cryptos, setCryptos] = useState([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getTopCryptos().then((crypto) => {
      setCryptos(crypto)
    });
  }, [])

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <Link href="/about">
        About
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