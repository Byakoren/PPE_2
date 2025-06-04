

//import
//_________________________________
import { useState } from "react";
import { Button, Image,FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import  { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { API_BASE_URL } from '../../config';

//_________________________________

type Eleve = {
  id: number;
  nom: string;
  prenom: string;
  present: boolean;
};

const eleves: { eleve: Eleve }[] = [
  { eleve: { id: 1, nom: "Dupont", prenom: "Alice", present: true } },
  { eleve: { id: 2, nom: "Martin", prenom: "Lucas", present: true } },
  { eleve: { id: 3, nom: "Bernard", prenom: "Emma", present: false } },
  { eleve: { id: 4, nom: "Petit", prenom: "Noah", present: true } },
  { eleve: { id: 5, nom: "Robert", prenom: "Léa", present: true } },
  { eleve: { id: 6, nom: "Richard", prenom: "Hugo", present: true } },
  { eleve: { id: 7, nom: "Durand", prenom: "Chloé", present: false } },
  { eleve: { id: 8, nom: "Dubois", prenom: "Nathan", present: true } },
  { eleve: { id: 9, nom: "Moreau", prenom: "Manon", present: true } },
  { eleve: { id: 10, nom: "Laurent", prenom: "Tom", present: true } },
];

export default function Login() {
 
 

    
      
    return (
      <View style={styles.container} >
        <LinearGradient
          colors={['#273273','#020024']}
          style={styles.background}
        >
          
            <Text style={styles.label}>liste apprenant:</Text>
          <FlatList
            data={eleves}
            keyExtractor={(item) => item.eleve.id.toString()}
            renderItem={({ item }) => (
              <View style={{ flexDirection: "row", alignItems: "center", padding: 8 }}>
                <Text style={{ color: "#fff", fontSize: 16 }}>
                  {item.eleve.prenom} {item.eleve.nom}
                </Text>
                <Text style={{ marginLeft: 10, color: item.eleve.present ? "#4CAF50" : "#F24C27" }}>
                  {item.eleve.present ? "Présent" : "Absent"}
                </Text>
              </View>
            )}
            contentContainerStyle={{ paddingHorizontal: "10%" }}
          />    
        </LinearGradient>
      </View>
  );
}

//Feuille de style.
const styles = StyleSheet.create({

  container:{
    flex: 1,
    //backgroundColor: "#1B2A59",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 0,
    borderColor: "red",
    borderWidth: 1,

  },
  container2:{
    paddingTop: 40,
    flex: 1,
    //backgroundColor: "#1B2A59",
    justifyContent: "flex-start",
    gap: 5,
    alignItems: "center",
    paddingHorizontal: 0,
    //borderColor: "red",
    //borderWidth: 1,

  },
  button:{
    
    width: "80%",
    height: 45,
    backgroundColor: "#F24C27",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginTop: 50,
    elevation: 3,
    
  },
  background: {
    position: "absolute",
    height: "100%",
    width: "100%"
    
  },
  buttonText:{
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  logo:{
    marginTop: 50,
    width: 350,
    height: 150,
    marginHorizontal: "auto",
    //borderColor: "red",
    //borderWidth: 1,
    resizeMode: "contain",
    marginBottom: 20,
  },
  label:{
    alignSelf: "flex-start",
    marginLeft: "10%",
    color: "#F24C27",
    fontSize: 16,
    marginBottom: 8,

  },
  input:{
    width: "80%",
    backgroundColor: "#FFFFFF",
    height: 45,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    elevation: 2,
  },
 
  textinput:{
    borderWidth: 1,
    height: 40,
    width: "80%"
    
  },
  message_error:{
    color: '#FF0000'
  }

 
})