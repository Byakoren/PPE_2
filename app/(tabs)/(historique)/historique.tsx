import { View, Text,StyleSheet,Image, FlatList, ActivityIndicator } from "react-native";
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
  //Déclaration d'un hook useState pour stocké l'état de chargement de la flatlist pour le pull-refresh
  const [loading, setLoading] = useState(false);
  //Déclaration d'un hook useState pour stocké l'état de chargement lors du montage du composant
  const [initialLoading, setInitialLoading] = useState(true); 

  //Déclaration d'une fonction asynchrone afin de consommer l'api coté serveur.
  //Cette fonction est utilisé lors du raffraichissement de la flat list via le mécaniseme de pull-to-refresh.
    async function afficherParticipation(){
      //Lorsque appelé, loading est mis a true,cela permet d'afficher un spinner dans la flatlist.
      setLoading(true);
      //try catch pour intercepter les erreurs et le fetch pour consommer l'API
      try {
        //await new Promise(r => setTimeout(r, 1500));
        const response = await fetch(`${API_BASE_URL}/api/users/${userId}/participations`, {
          headers: { "Accept": "application/json" },
        });
        const data = await response.json();
        data.reverse();
        setParticipations(data);
      } catch (e) {
        console.error(e); //affiche l'érreur dans la console
      } finally {
        setLoading(false);
      }
      
    }

  //Utilisation d'un hook useEffect pour s'assurer que le fetch n'est 
  //éxecuter qu'au moment du premier rendu.
  useEffect(()=> {
    async function fetchData() {
    //try catch pour intercepter les erreurs et le fetch pour consommer l'API
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${userId}/participations`, {
        headers: { "Accept": "application/json" },
      });
      const data = await response.json();
      data.reverse();
      setParticipations(data);
    } catch (e) {
      console.error(e); //affiche l'érreur dans la console
    }
    setInitialLoading(false); //Met InitialLoading à false pour arreter le chargement au premier rendu.
  }
  fetchData();
}, [userId]);

if (initialLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#273273" }}>
        <Image source={require("../../../assets/images/gefor_vect3lueur.png")} style={styles.logo} resizeMode="contain"/>
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 32 }} />
        <Text style={{ color: "#fff", marginTop: 16 }}>Chargement...</Text>
      </View>
    );
  }

  

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
    
  });*/ }
  
  
  


  return (
  <View style={styles.container}>
    <LinearGradient colors={["#273273", "#020024"]} style={styles.background} />
      {/* Spinner custom visible pendant le refresh 
      Le spinner d'orignine est non visible,ducoup ajout d'un spinner tant que loading est vrai*/}
    {loading && (
      <View style={{
        position: 'absolute',
        top: 60,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 10,
      }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    )}
    <FlatList
    
      data={participations} //Information passé dans les propriétés de la flatlist
      onRefresh={afficherParticipation} //Ici on utilise la propes OnRefresh pour éxecuter "afficherParticipation" lors du pull-for-refresh
      refreshing={loading} //Indique lorsque le raffraichissement (fetch a l'api) est en cours au composant

      ListHeaderComponent={
        <View>
        <Image source={require("../../../assets/images/gefor_vect3lueur.png")} style={styles.logo} resizeMode="contain"/>
        <Text
          style={[
            styles.textcard,
            {
              color: "#90EE90",
              fontStyle: "italic",
              fontSize: 14,
              textAlign: "center",
              marginTop: 8,
              marginBottom: 8,
              backgroundColor: "rgba(255,255,255,0.08)",
              borderRadius: 8,
              paddingVertical: 6,
              paddingHorizontal: 12,
              alignSelf: "center",
            },
          ]}
        >
          ⬆️ Scroller vers le haut pour rafraîchir la liste
        </Text>
        </View>
      }
      renderItem={({item})=>{
        
        let coursAvenir = false;
        let coursEnCours = false;

        {/*Construction de date avec les informations venu du backend*/}

        const dateEtHeureDeb = `${item.crenaux} ${item.heureDebut}`;{/*Construction de la chaine correspondant à la date et heure de début du cours*/}  
        
        const dateEtHeureFin = `${item.crenaux} ${item.heureFin}`;{/*Construction de la chaine correspondant date et heure de fin du cours*/}  

        {/*Récupération de la date d'aujourd'hui*/}
        const dateAujourdui = new Date();{/*Date d'aujourd'hui*/}  

        const dateCours = new Date(item.crenaux);{/*Objet Date avec date cours*/} 
        const dateCoursDebut = new Date(dateEtHeureDeb);{/*Objet Date avec date et heure début*/} 
        const dateCoursFin = new Date(dateEtHeureFin);{/*Objet Date avec date et heure fin*/} 

        {/*Débugage heure et date. 
        console.log(`Date d'aujourdui: ${dateAujourdui}`);
        console.log(`Date du cours: ${dateCours}`)
        console.log(`Date + heure deb: ${dateCoursDebut}`);
        console.log(`Date + heure fin: ${dateCoursFin}`);*/}

        {/*Condition pour afficher une étiquette correspondante au crénau*/} 

        {/*Cour en cours, cours a venir ou cours déja passé*/} 
        if (dateCoursDebut < dateAujourdui && dateCoursFin > dateAujourdui){
          console.log("Cours en cours!");
          coursEnCours = true;

        }else if(dateCoursDebut > dateAujourdui){
          coursAvenir = true;
          console.log("Cours à venir!");
          
        }else{
          console.log("Cours déja passé!");
        }
        
        
        return(
        //Render des informations dans la liste pour chaque cours.
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
                ) : coursAvenir === true ? (<Text style={[styles.textcard, { fontWeight: "bold", fontSize: 18 }]}>⌛Cours a venir</Text>
                
                ) : (<Text style={[styles.textcard, { color: "#FFAEAE", fontWeight: "bold", fontSize: 18 }]}>❌absent</Text>
                )}
                {coursEnCours === true ? (<Text style={[styles.textcard, { color: "#90EE90", fontWeight: "bold", fontSize: 18 }]}>🟢en cours</Text>) : ""}
                
              {item.retard !== 0 && (
                <Text style={[styles.textcard, { color: "#F57C00" }]}>
                  Retard {item.retard} min
                </Text>
              )}
          </View>
        </View>
    )}
  }

      keyExtractor={(item) => `${item.id}`}
      contentContainerStyle={{ paddingTop: 16, paddingBottom: 100 }}
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
    //borderWidth: 2, // Ajoute une bordure rouge pour le debug
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
    marginTop: 32
  },
});
