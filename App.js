import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { CryptoList } from './component/cryptoList'

export default function App() {

  return (
    <SafeAreaProvider>
    <View style={styles.container}>
      <StatusBar style="light" />
      <CryptoList />
    </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12
  },
});