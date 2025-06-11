// app/new-password.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { API_BASE_URL } from './config';

export default function NewPassword() {
  const { email } = useLocalSearchParams(); // récupère l'e-mail transmis depuis reset-password
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const router = useRouter();

  const handleChangePassword = async () => {
    if (!password || !confirm) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    if (password !== confirm) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/reset/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        Alert.alert("Erreur", result.message || "Échec.");
      } else {
        Alert.alert("Succès", "Mot de passe modifié !");
        router.replace('/login');
      }
    } catch (e) {
      console.error(e);
      Alert.alert("Erreur", "Erreur réseau.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        Nouveau mot de passe pour :
      </Text>
      <Text style={{ fontWeight: 'bold', marginBottom: 20 }}>{email}</Text>

      <TextInput
        placeholder="Nouveau mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, padding: 10, marginBottom: 15 }}
      />
      <TextInput
        placeholder="Confirmer le mot de passe"
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
      />

      <TouchableOpacity onPress={handleChangePassword} style={{ backgroundColor: '#007bff', padding: 15 }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Changer le mot de passe</Text>
      </TouchableOpacity>
    </View>
  );
}
