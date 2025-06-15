//Thomas GOUEZ,Matthieu MOURAO, Mehdi NAOUI
//BTS SIO SLAM 2024/2025
//PPE2; Projet Mobile; GeMargement

//Page de login

//import
//_________________________________
import { useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import  { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { API_BASE_URL } from './config';

//_________________________________



export default function Login() {
  //Utilisations de hook usestate pour enregistrer les mot de passe et identifiants
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();
   
    const[msgError,setMsgError] = useState(false);
    
    //Loging.Méthode FETCH en asynchrone avec await.
    //API de test.
    async function loging(username:string,password:string){
     
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
          email: username,
          password: password,
          expiresInMins:30,
        }),
        credentials: 'include'
      
      })

      const data = await response.json(); 

      if (response.ok) {
        // Récupération du prénom et du rôle principal
        const prenom = data.prenom ?? "Utilisateur";
        const roles = data.roles ?? [];
        const mainRole = roles[0] ?? "ROLE_USER";
        const id = data.id;

        // Redirection vers la racine des tabs avec params
        router.push({
          pathname: "/(tabs)/(home)", // ou juste "/(tabs)" si tu veux la racine
          params: { id: data.id, prenom, role: mainRole },
        });

      } else {
        setMsgError(true);
      }
    }
      
    return (
      <View style={styles.container} >
        <LinearGradient
          colors={['#273273','#020024']}
          style={styles.background}
        >
          {/*Logo Gefor*/}
          <Image source={require("../assets/images/gefor_vect3lueur.png")} style={styles.logo}/>
          <View
            style={styles.container2}>
        
          {/*Formulaire*/}
          <Text style={styles.label} >Identifiant:</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={newText => setUsername(newText)}
            defaultValue={username}
          />
          <Text style={styles.label}>Mot de passe:</Text>
          <TextInput
            
            style={styles.input}
            placeholder="Password"
            onChangeText={newText => setPassword(newText)}
            secureTextEntry
            defaultValue={password}
          />
           {/*Bouton*/}
          <TouchableOpacity
            style={styles.button}
            onPress={()=> loging(username,password)}
            >
              <Text style={styles.buttonText}>Connexion</Text>
            </TouchableOpacity>
             {/*Méssage qui s'affiche si l'auth a échoué.*/}
            {msgError ? <Text style={styles.message_error}>Identifiants incorrect</Text> :<Text style={styles.message_error}></Text> }
            
 
        </View>
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
    //borderColor: "red",
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