import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react';
import { auth, firestore, storage } from '../firebase';
import { KeyboardAvoidingView, StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import estilo from "../estilo";
import  Menu  from '../screens/Menu';

Menu

const HomeScreen = () => {
    const navigation = useNavigation();

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Login");    
            })
    }

    return(
        <View style={estilo.container}>
            <Text>Usuário logado: {auth.currentUser?.email} </Text>

            <TouchableOpacity 
                style={estilo.button}
                onPress={handleSignOut}
            >
                <Text style={estilo.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

export default HomeScreen;