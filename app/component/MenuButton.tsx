// Composant bouton de menu réutilisable
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';

// Définition des props attendues pour le composant
interface MenuButtonProps {
  title: string; // Texte affiché sur le bouton
  onPress: (event: GestureResponderEvent) => void; // Fonction appelée lors du clic
}

// Composant fonctionnel MenuButton
export default function MenuButton({ title, onPress }: MenuButtonProps) {
  return (
    // Bouton tactile stylisé
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {/* Texte du bouton */}
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

// Styles pour le bouton et son texte
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#F24C27",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginBottom: 15,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
