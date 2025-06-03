import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function Welcome() {
  const router = useRouter();
  const { prenom, role } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#273273", "#020024"]} style={styles.background} />

      <View style={styles.fullCard}>
        <Image
          source={require("../../../assets/images/gefor_vect3lueur.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.greeting}>Bonjour {prenom ?? "Utilisateur"} 👋</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (role === "ROLE_INTERVENANT") {
              router.push("/emargement_intervenant");
            } else {
              router.push("/emargement_apprenant");
            }
          }}
        >
          <Text style={styles.buttonText}>Émarger</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push("/historique")}>
          <Text style={styles.buttonText}>Historique</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push("/profil")}>
          <Text style={styles.buttonText}>Profil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


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
