import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, Image, TouchableOpacity } from 'react-native';
import Signature from 'react-native-signature-canvas';
import { LinearGradient } from "expo-linear-gradient";
import { API_BASE_URL } from '../../config';
import { useLocalSearchParams } from "expo-router";


export default function EmargementScreen() {
  const [cours, setCours] = useState<any>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const signatureRef = useRef<any>(null);


  const { id } = useLocalSearchParams();
  const userId = parseInt(id as string, 10);


    useEffect(() => {
    if (!userId || isNaN(userId)) return;


    fetch(`${API_BASE_URL}/api/cours/du-jour/${userId}`)
        .then(async res => {
        const raw = await res.text();

        try {
            const data = JSON.parse(raw);

            if (!data.message && data.id) {
            setCours(data);
            }
        } catch (e) {
            console.error('⚠️ Erreur JSON.parse() :', e);
        }
        })
        .catch(err => console.error('Erreur réseau :', err));
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
            signature: signature
        }),
        });

        const result = await response.json();

        if (!response.ok) {
        // ✋ Message d'erreur API (ex: déjà signé)
        Alert.alert('Erreur', result.message || "Une erreur est survenue.");
        } else {
        Alert.alert('Succès', result.message);
        }
    } catch (error) {
        // 🔥 Erreur réseau ou autre
        Alert.alert("Erreur", "Impossible d'envoyer l'émargement.");
        console.error("Erreur lors de l'envoi :", error);
    }
    };

    if (!cours) {
    return (
        <View style={styles.emptyContainer}>
        <LinearGradient colors={["#273273", "#020024"]} style={styles.background} />
        <Text style={styles.emptyText}>🚫 Aucun cours en cours</Text>
        <Text style={styles.emptySubtext}>Veuillez revenir plus tard ou contacter l'administration</Text>
        </View>
    );
    }


  return (
    <View style={{ flex: 1 }}>
        <LinearGradient colors={["#273273", "#020024"]} style={styles.background} />
        <Image source={require("../../../assets/images/gefor_vect3lueur.png")} style={styles.logo} />

        <Text style={styles.label}>📅 Date: <Text style={styles.value}>{cours.date}</Text></Text>
        <Text style={styles.label}>🕐 Heure: <Text style={styles.value}>{cours.horaire}</Text></Text>
        <Text style={styles.label}>📘 Session: <Text style={styles.value}>{cours.intitule}</Text></Text>

        <Text style={styles.instruction}>👇 Veuillez signer ci-dessous 👇</Text>

        <View style={styles.signatureBox}>
            <Signature
                ref={signatureRef}
                onOK={handleOK}
                onEnd={() => {
                    signatureRef.current?.readSignature(); // ➜ déclenche onOK()
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
    </View>
  );
}

const styles = StyleSheet.create({
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
},
buttonText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "bold",
},
info: {
  color: "#fff",
  textAlign: "center",
  marginTop: 50,
},

background: {
  position: "absolute",
  height: "100%",
  width: "100%",
  zIndex: -1,
},
clearButton: {
  backgroundColor: "#FF6347", // rouge tomate
  marginTop: 10,
  marginBottom: 20,
},


emptyContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
},
emptyImage: {
  width: 200,
  height: 200,
  resizeMode: "contain",
  marginBottom: 20,
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

});

const styleSignature = `
  .m-signature-pad--footer { display: none; margin: 0px; }
  .m-signature-pad { box-shadow: none; border: none; }
  body,html {
    background-color: transparent; height: 100%;
  }
`;
