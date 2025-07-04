import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Signature from 'react-native-signature-canvas';
import { LinearGradient } from 'expo-linear-gradient';
import { API_BASE_URL } from '../../config';
import { useLocalSearchParams } from 'expo-router';

export default function EmargementScreen() {
  const [cours, setCours] = useState<any>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const signatureRef = useRef<any>(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const { id } = useLocalSearchParams();
  const userId = parseInt(id as string, 10);

  type Apprenant = {
    id: number;
    prenom: string;
    nom: string;
    signature: string | null;
    participationId: number;
    validation: boolean;
    retard: number;
  };

  const [apprenants, setApprenants] = useState<Apprenant[]>([]);

  useEffect(() => {
    if (!userId || isNaN(userId)) return;

    fetch(`${API_BASE_URL}/api/cours/du-jour/${userId}`)
      .then(async (res) => {
        const raw = await res.text();

        try {
          const data = JSON.parse(raw);
          if (!data.message && data.id) {
            setCours(data);
            if (Array.isArray(data.apprenants)) {
              setApprenants(data.apprenants.map((a: any) => ({
                ...a,
                validation: false,
                retard: 0,
              })));
            }
          }
        } catch (e) {
          console.error('⚠️ Erreur JSON.parse() :', e);
        }
      })
      .catch((err) => console.error('Erreur réseau :', err));
  }, [userId]);

  const handleOK = (sig: string) => {
    setSignature(sig);
  };

  const effacerSignature = () => {
    signatureRef.current?.clearSignature();
  };

  const envoyerEmargement = async () => {
    if (!cours || !signature) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/emargement`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idUser: userId,
          idCours: cours.id,
          signature: signature,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        Alert.alert('Erreur', result.message || 'Une erreur est survenue.');
      } else {
        Alert.alert('Succès', result.message);
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible d\'envoyer l\'émargement.');
      console.error('Erreur lors de l\'envoi :', error);
    }
  };

  const validerPresence = async (apprenant: Apprenant) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/presence/valider`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            idUser: apprenant.id,
            idCours: cours.id,
            retard: apprenant.retard || 0
        }),
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert('Validation réussie', `${apprenant.prenom} validé`);
      } else {
        Alert.alert('Erreur', result.message || 'Échec de la validation');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de valider.');
    }
  };

  if (!cours) {
    return (
      <View style={styles.emptyContainer}>
        <LinearGradient colors={['#273273', '#020024']} style={styles.background} />
        <Text style={styles.emptyText}>🚫 Aucun cours en cours</Text>
        <Text style={styles.emptySubtext}>Veuillez revenir plus tard ou contacter l'administration</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} scrollEnabled={scrollEnabled}>
      <LinearGradient colors={['#273273', '#020024']} style={styles.background} />
      <View style={styles.innerContainer}>
        <Image source={require("../../../assets/images/gefor_vect3lueur.png")} style={styles.logo} />

        <Text style={styles.label}>📅 Date: <Text style={styles.value}>{cours.date}</Text></Text>
        <Text style={styles.label}>🕐 Heure: <Text style={styles.value}>{cours.horaire}</Text></Text>
        <Text style={styles.label}>📘 Session: <Text style={styles.value}>{cours.intitule}</Text></Text>

        <Text style={styles.instruction}>👇 Veuillez signer ci-dessous 👇</Text>

        <View style={styles.signatureBox}>
          <Signature
            ref={signatureRef}
            onOK={handleOK}
            onBegin={() => setScrollEnabled(false)}
            onEnd={() => {
              signatureRef.current?.readSignature();
              setScrollEnabled(true);
            }}
            webStyle={styleSignature}
          />
        </View>

        <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={effacerSignature}>
          <Text style={styles.buttonText}>EFFACER</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={envoyerEmargement}>
          <Text style={styles.buttonText}>ENVOYER L'ÉMARGEMENT</Text>
        </TouchableOpacity>

        <Text style={styles.listTitle}>👥 Apprenants du cours</Text>
        {apprenants.map((a, index) => (
          <View key={a.id} style={styles.apprenantRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.apprenantText}>{a.prenom} {a.nom}</Text>
              <TextInput
                placeholder="Retard (minutes)"
                placeholderTextColor="#ccc"
                keyboardType="numeric"
                style={styles.input}
                onChangeText={(text) => {
                  const updated = [...apprenants];
                  updated[index].retard = parseInt(text || '0');
                  setApprenants(updated);
                }}
              />
            </View>
            <TouchableOpacity style={styles.validateButton} onPress={() => validerPresence(a)}>
              <Text style={styles.validateText}>Valider</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  innerContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 150,
  },
  logo: {
    width: 250,
    height: 100,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 40,
  },
  label: {
    color: "#F24C27",
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 5,
    textAlign: "center",
    marginBottom: 10,
  },
  value: {
    color: "#fff",
    fontWeight: "normal",
  },
  instruction: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    marginVertical: 15,
  },
  signatureBox: {
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    height: 200,
  },
  button: {
    backgroundColor: "#1E90FF",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  clearButton: {
    backgroundColor: "#FF6347",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  emptyText: {
    fontSize: 22,
    color: "#F24C27",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    opacity: 0.7,
  },
  background: {
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: -1,
  },
  listTitle: {
    color: "#F24C27",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
    textAlign: "center",
  },
  apprenantRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff22",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  apprenantText: {
    color: "#fff",
    fontSize: 16,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    color: "#000",
    marginTop: 5,
  },
  validateButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 30,
    marginLeft: 10,
  },
  validateText: {
    color: "#fff",
    fontWeight: "bold",
  },
});


const styleSignature = `
  .m-signature-pad--footer { display: none; margin: 0px; }
  .m-signature-pad { box-shadow: none; border: none; }
  body,html {
    background-color: transparent; height: 100%;
  }
`;
