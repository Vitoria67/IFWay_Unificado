import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from 'react';
import { auth, firestore, storage } from '../firebase';
import { FlatList, View, TextInput, TouchableOpacity, Text, ActivityIndicator, Image } from "react-native";
import estilo from '../estilo';
import { Local } from '../model/Local';
import { SafeAreaView } from "react-native-safe-area-context";

const LocalListar = () => {
    const [loading, setLoading] = useState(true);
    const [atualizar, setAtualizar] = useState(true);
    const [local, setLocal] = useState<Local[]>([]); // Array em branco

    const refLocal = firestore.collection("Usuario")
        .doc(auth.currentUser?.uid)
        .collection("Local")

    //FLATLIST
    useEffect(() => {
        if (loading){
            listarTodos();
        }
    }, [local]);

    const listarTodos = () => {
        const subscriber = refLocal.onSnapshot((querySnapshot) => {
            const listaLocais = [];
            querySnapshot.forEach((documentSnapshot) => {
                listaLocais.push({
                    ...documentSnapshot.data(),
                    id: documentSnapshot.id //  Usando id em vez de key
                });
            });
            setLocal(listaLocais); // ou setLocais, se quiser renomear o estado
            setLoading(false);
            setAtualizar(false);
        });
        return () => subscriber();
    };
    
    if (loading) {
        return (
            <ActivityIndicator 
                size="60" 
                color="#0782F9"
                style={estilo.tela}
            />
        );
    }
    
    const renderItem = ({ item }) => <Item item={item} />
    
    const Item = ({ item }) => (
        <View style={estilo.item}>
            <Text style={estilo.titulo}>Id: {item.id}</Text>
            <Text style={estilo.titulo}>Nome: {item.nome}</Text>
            {/* Se "pontos" for objeto */}
            <Text style={estilo.titulo}>Coordenadas: {item.latitude} , {item.longitude}</Text>
            {/* ou se tiver campos específicos: */}
            {/* <Text>Ponto X: {item.pontos?.x}</Text> */}
        </View>
    );
    
    return (
        <View style={estilo.container}>
            <FlatList 
                data={local}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                refreshing={atualizar}
                onRefresh={ () => listarTodos() }
            />
        </View>
    )



}
export default LocalListar;