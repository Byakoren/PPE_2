import { View, Text,StyleSheet,Image, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { API_BASE_URL } from "../../config";
//Import de useEffect() et useState()
import { useEffect, useState} from "react";
//Créer un type participation pour utiliser l'objet que l'on récupère avec notre fetch.
type Participation = {
  id: number,
  cours: string;
  matiere: string;
  crenaux: string;
  heureDebut: string;
  heureFin: string;
  validation: boolean;
  signé: string;
  retard: number;
};

export default function HistoriqueIntervenant() {
  //Récupération de l'id dans le hook useLocalSearchParams
  const { id } = useLocalSearchParams();
  //conversion en entier base 10
  const userId = parseInt(id as string, 10);
  //Déclaration d'un hook useState pour stocké les data de participation 
  const [participations, setParticipations] = useState<Participation[]>([]);
  
  //Utilisation d'un hook useEffect pour s'assurer que le fetch n'est 
  //éxecuter qu'au moment du premier rendu.
  useEffect(()=> {
    //Déclaration d'une fonction asynchrone afin de consommer l'api coté serveur.
    async function afficherParticipation(){

    //Utilisation de fetch et stockage de la réponse dans 'response
    const response = await fetch(`${API_BASE_URL}/api/users/${userId}/participations`, {
      headers: { "Accept": "application/json"},

      })

    //Parse la réponse http en json.
    const data = await response.json();
    // Trie du plus récent au plus ancien selon heureDebut
    data.reverse();
    //Enregistrement des data dans le hook Participations
    setParticipations(data);
    
    }
    afficherParticipation();
  },[])

  //foreach pour louper dans la console et afficher les valeurs renvoyer en response.
  //debugage
  {/*
  participations.forEach((item, index)=>{
    console.log(`Cours: ${item.cours}`);
    console.log(`Matiere: ${item.matiere}`);
    console.log(`crenaux: ${item.crenaux}`);
    console.log(`Heure: de ${item.heureDebut} à ${item.heureFin}`);
    console.log(`Validation : ${item.validation}`);
    console.log(`Signature : ${item.signé}`);
    console.log(`Retard : ${item.retard}`);
    
  });
  */ }
  
  


  return (
  <View style={styles.container}>
    <LinearGradient colors={["#273273", "#020024"]} style={styles.background} />
    <Image source={require("../../../assets/images/gefor_vect3lueur.png")} style={styles.logo} resizeMode="contain"/>
    <FlatList
      data={participations}
      renderItem={({item})=> (
        <View style={styles.card}>
          <View style={styles.cardInfoMatiereCrenau}>
            {/*<Text style={styles.textcard}>{item.cours}</Text>*/}
            <Text style={[styles.textcard, { fontWeight: "bold", fontSize: 18 }]}>{item.matiere}</Text>
            <Text style={[styles.textcard, { color: "#D2D2D2" }]}>{item.crenaux}</Text>
            <Text style={[styles.textcard, { color: "#D2D2D2" }]}>{item.heureDebut}-{item.heureFin}</Text>
          </View>
          <View style={styles.cardSignatureValidation}>
                {item.signé === "signé" && item.validation === true ? (
                <Text style={[styles.textcard, { fontWeight: "bold", fontSize: 18 }]}>✅validé</Text>
                ) : item.signé === "signé" ? (
                <Text style={[styles.textcard, { fontWeight: "bold", fontSize: 18 }]}>🖋️signé</Text>
                ) : (
                <Text style={[styles.textcard, { color: "#FFAEAE", fontWeight: "bold", fontSize: 18 }]}>❌absent</Text>
                )}
              {item.retard !== 0 && (
                <Text style={[styles.textcard, { color: "#F57C00" }]}>
                  Retard {item.retard} min
                </Text>
              )}
          </View>
        </View>
    )}
      keyExtractor={(item) => `${item.id}`}
    />
    
        
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    //alignItems: "center",
    position: "relative",
    //borderColor: "red",
    borderWidth: 2, // Ajoute une bordure rouge pour le debug
  },
  card: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 10,
    marginVertical: 8,
    padding: 12,
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    // Ajout de l'ombre
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.50,
    shadowRadius: 1.84,
    elevation: 5,
    alignSelf: "center",
  },
  cardInfoMatiereCrenau: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  cardSignatureValidation: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

  },
  subcard:{

  },
  textcard:{
    color: "#FFFFFF",
  },
  background: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  logo: {
    width: 240,
    height: 100,
    alignSelf: "center", 
  },
});
