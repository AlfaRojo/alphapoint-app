import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login() {
    const [username, setUsername] = useState('');

    const handleLogin = () => {
        if (username.trim()) {
            AsyncStorage.setItem('username', username)
                .then(() => {
                    navigation.navigate('/');
                })
                .catch(error => {
                    console.error('Error saving data', error);
                });
        } else {
            alert('Please enter a username');
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <TextInput
                placeholder="Enter username"
                value={username}
                onChangeText={setUsername}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};