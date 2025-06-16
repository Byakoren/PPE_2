import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { API_BASE_URL } from '../../config';
import { useLocalSearchParams } from 'expo-router';

// Composant principal de l'écran de profil
export default function ProfilScreen() {
  // Récupère l'id de l'utilisateur depuis les paramètres locaux de navigation
  const { id } = useLocalSearchParams();
  const userId = parseInt(id as string, 10);

  // États pour stocker les infos utilisateur, l'URI de l'image et si l'image a changé
  const [user, setUser] = useState<any>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageChanged, setImageChanged] = useState(false); 

  // Chargement des infos utilisateur au montage du composant
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUser(data);
          // Si l'utilisateur a un avatar, on le charge
          if (data.avatar) {
            setImageUri(`${API_BASE_URL}/uploads/avatars/${data.avatar}`);
          }
        } else {
          Alert.alert("Erreur", "Impossible de charger le profil");
        }
      })
      .catch(err => console.error("Erreur de chargement du profil :", err));
  }, [userId]);

  // Fonction pour choisir une image depuis la galerie
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission refusée", "L'accès à la galerie est requis.");
      return;
    }

    // Ouvre la galerie pour sélectionner une image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      allowsEditing: true,
      base64: false,
    });

    // Si une image est sélectionnée, on met à jour l'état
    if (!result.canceled && result.assets?.length > 0) {
      const pickedUri = result.assets[0].uri;
      setImageUri(pickedUri);
      setImageChanged(true); // Indique que l’image a changé
    }
  };

  // Fonction pour envoyer l'image sélectionnée au serveur
  const uploadImageToServer = async () => {
    if (!imageUri) return;

    const formData = new FormData();
    formData.append('avatar', {
      uri: imageUri,
      name: 'avatar.jpg',
      type: 'image/jpeg',
    } as any);

    try {
      const response = await fetch(`${API_BASE_URL}/api/user/${userId}/upload-avatar`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = await response.json();

      if (result.success) {
        Alert.alert('Succès', 'Avatar mis à jour');
        setImageChanged(false); // Désactive le bouton après envoi
      } else {
        Alert.alert('Erreur', result.message || 'Échec de l\'upload');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors de l\'envoi de l\'image');
      console.error("Erreur upload:", error);
    }
  };

  // Affiche un écran de chargement si les infos utilisateur ne sont pas encore chargées
  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Chargement du profil...</Text>
      </View>
    );
  }

  // Rendu principal de l'écran de profil
  return (
    <View style={{ flex: 1 }}>
      {/* Fond en dégradé */}
      <LinearGradient colors={['#273273', '#020024']} style={styles.background} />
      <View style={styles.container}>
        {/* Avatar et bouton pour changer la photo */}
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={
              imageUri
                ? { uri: imageUri }
                : require("../../../assets/images/photo_profil.png")
            }
            style={styles.avatar}
          />
          <Text style={styles.changePhoto}>Changer la photo</Text>
        </TouchableOpacity>

        {/* Bouton "Valider" visible seulement si l'image a changé */}
        {imageChanged && (
          <TouchableOpacity style={styles.validateButton} onPress={uploadImageToServer}>
            <Text style={styles.validateText}>Valider l'avatar</Text>
          </TouchableOpacity>
        )}

        {/* Affichage des informations utilisateur */}
        <Text style={styles.label}>👤 Prénom : <Text style={styles.value}>{user.prenom}</Text></Text>
        <Text style={styles.label}>👤 Nom : <Text style={styles.value}>{user.nom}</Text></Text>
        <Text style={styles.label}>📧 Email : <Text style={styles.value}>{user.email}</Text></Text>
      </View>
    </View>
  );
}

// Styles pour le composant
const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: -1,
  },
  container: {
    padding: 20,
    marginTop: 80,
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#fff",
    marginBottom: 10,
  },
  changePhoto: {
    color: "#1E90FF",
    marginBottom: 30,
    textDecorationLine: 'underline',
  },
  label: {
    fontSize: 18,
    color: "#F24C27",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  value: {
    color: "#fff",
    fontWeight: "normal",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#020024",
  },
  loadingText: {
    color: "#fff",
    fontSize: 18,
  },
  validateButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  validateText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
