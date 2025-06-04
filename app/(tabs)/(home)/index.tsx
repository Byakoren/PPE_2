import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config";

// Écran d'accueil principal
export default function Welcome() {
  const router = useRouter();
  // Récupération des paramètres de navigation (id, prénom, rôle)
  const { id, prenom, role } = useLocalSearchParams();
  const userId = parseInt(id as string, 10);

  // État pour stocker le cours du jour (s'il existe)
  const [coursActuel, setCoursActuel] = useState<any>(null);

  // Effet pour charger le cours du jour à l'ouverture de l'écran
  useEffect(() => {
    if (!userId) return;

    fetch(`${API_BASE_URL}/api/cours/du-jour/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (!data.message) setCoursActuel(data);
      })
      .catch(err => console.error("Erreur fetch cours du jour", err));
  }, [userId]);

  return (
    <View style={styles.container}>
      {/* Fond en dégradé */}
      <LinearGradient colors={["#273273", "#020024"]} style={styles.background} />

      <View style={styles.fullCard}>
        {/* Logo de l'application */}
        <Image
          source={require("../../../assets/images/gefor_vect3lueur.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        {/* Message de bienvenue personnalisé */}
        <Text style={styles.greeting}>Bonjour {prenom ?? "Utilisateur"} 👋</Text>

        {/* Bouton pour accéder à l'émargement (intervenant ou apprenant) */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            const target =
              role === "ROLE_INTERVENANT"
                ? "/(tabs)/(emargement)/emargement_intervenant"
                : "/(tabs)/(emargement)/emargement_apprenant";

            router.push({
              pathname: target,
              params: { id, prenom, role },
            });
          }}
        >
          <Text style={styles.buttonText}>Émarger</Text>
        </TouchableOpacity>

         
         <TouchableOpacity
          style={styles.button_voir}
          disabled={ role === "ROLE_APPRENANT" ? true : false}
          onPress={()=>{router.push("/voiremarg")}}
                 

           
          >
          
         
          <Text style={styles.buttonText}>Voir Émargement</Text>
        </TouchableOpacity>


        {/* Bouton pour accéder à l'historique */}
        <TouchableOpacity style={styles.button} onPress={() => router.push("/historique")}>
          <Text style={styles.buttonText}>Historique</Text>
        </TouchableOpacity>

        {/* Bouton pour accéder au profil */}
        <TouchableOpacity style={styles.button} onPress={() => router.push("/profil")}>
          <Text style={styles.buttonText}>Profil</Text>
        </TouchableOpacity>

        {/* Affichage du cours actuel si disponible */}
        {coursActuel && (
          <View style={{ marginTop: 20 }}>
            <Text style={{ color: "#fff", textAlign: "center" }}>
              📘 Cours actuel : {coursActuel.intitule} ({coursActuel.horaire})
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

// Styles de l'écran d'accueil
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  background: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  logo: {
    width: 240,
    height: 100,
  },
  greeting: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#F24C27",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#F24C27",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginBottom: 15,
    width: "100%",
    alignItems: "center",
  },
  button_voir: {
    
    backgroundColor:  "#F24C27",
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
  fullCard: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-evenly', 
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 80,
  },
});
