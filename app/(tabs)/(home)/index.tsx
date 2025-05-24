import { useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import  { LinearGradient } from "expo-linear-gradient";

export default function welcome(){
return(
   <View style={styles.container} >
        <LinearGradient
          colors={['#273273','#020024']}
          style={styles.background}
        >
         <Text style={styles.title} >Welcome!</Text>
        
        </LinearGradient>
      </View>
);    
}

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
  title:{
    fontSize: 20,
    fontWeight: 'bold',
    color: "#F24C27",
  },
  background: {
    position: "absolute",
    height: "100%",
    width: "100%"
    
  },

})