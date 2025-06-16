import React, { useState } from 'react';
import {View, Text, TextInput,TouchableOpacity, Alert} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { useRouter } from "expo-router";
import { API_BASE_URL } from './config';

export default function ResetPassword() {

    const [email, setEmail] = useState('');
    const router = useRouter();

    const handleReset = async () => {
        if (!email) {
          Alert.alert("Erreur", "Veuillez entrer une adresse e-mail.");
          return;
        }
      
        try {
          const response = await fetch(`${API_BASE_URL}/api/reset/check-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
          });
      
          const result = await response.json();
      
          if (!response.ok) {
            Alert.alert("Erreur", result.message || "Adresse inconnue.");
          } else {
            router.push({ pathname: '/new-password', params: { email } });
          }
        } catch (error) {
          console.error(error);
          Alert.alert("Erreur", "Une erreur réseau est survenue.");
        }
      };

    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
        <Text>Réinitialiser le mot de passe</Text>
  
        <TextInput
          style={{
            height: 50,
            borderColor: '#ccc',
            borderWidth: 1,
            paddingHorizontal: 10,
            borderRadius: 5,
          }}
          value={email}
          onChangeText={setEmail}
        />
  
        <TouchableOpacity onPress={handleReset}>
          <Text>Envoyer la demande</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }