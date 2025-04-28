import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from 'react';
import { auth, firestore, storage } from '../firebase';
import { KeyboardAvoidingView, StyleSheet, View, Alert, Text, TextInput, TouchableOpacity, Pressable, Image, FlatList, ActivityIndicator } from "react-native";
import estilo from "../estilo";
import { Local } from "../model/Local";
import * as ImagePicker from "expo-image-picker";
import { uploadBytes } from "firebase/storage";

const LocalManter = () => { 
    const [formLocal, setFormLocal]=
    useState<Partial<Local>>({})
    const [loading, setLoading] = useState(true);
    const [atualizar, setAtualizar] = useState(true);
    const [local, setLocal] = useState<Local[]>([]); // Array em branco


    const refLocal = firestore.collection("Usuario")
        .doc(auth.currentUser?.uid)
        .collection("Local")

    const Salvar = async() => {
        const local = new Local(formLocal);

        if(local.id === undefined) {
            const refIdLocal = refLocal.doc();
            local.id = refIdLocal.id;        
            
            refIdLocal.set(local.toFirestore())
            .then(() => {
                alert("Local adicionado!");
                Limpar();
            })
            .catch( error => alert(error.message))
        } else {
            const refIdLocal = refLocal.doc(local.id);

            refIdLocal.update(local.toFirestore())
            .then(() =>{
                alert("Local atualizado!");
                Limpar();
            })
            .catch( error => alert(error.message))
        }
        setAtualizar(true);
        
    }

    const Limpar = () => {
        setFormLocal({});
    }



    //FLATLIST
    useEffect(() => {
        if (loading){
            listarTodos();
        }
    }, [local]);

    const listarTodos = () => {
        const subscriber = refLocal
        .onSnapshot((querySnapshot) => {
            const local = [];
            querySnapshot.forEach((documentSnapshot) => {
                local.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id
                });
            });
            setLocal(local);
            setLoading(false);
            setAtualizar(false);
        });
        return () => subscriber();
    }



    if (loading){
        return <ActivityIndicator 
                    size="60" 
                    color="#0782F9"
                    style={estilo.tela}
                />
    }


    const renderItem = ({ item }) => <Item item={item} />
    const Item = ({ item }) => (
        <TouchableOpacity 
            style={estilo.item}
            onPress={ () => editar(item) }
            onLongPress={ () => excluir(item) }
        >
            <Text style={estilo.titulo}>Id: {item.id}</Text>
            <Text style={estilo.titulo}>Nome: {item.nome}</Text>
            <Text style={estilo.titulo}>Coordenada: {item.latitude} , {item.longitude}</Text>
        </TouchableOpacity>
    )

    // EXCLUI E EDITA
    const excluir = async(item) => {
        Alert.alert(
            "Excluir " + item.nome + "?",
            "Local não poderá ser recuperado!",
            [
                {
                    text: "Cancelar"
                },
                {
                    text: "Excluir",
                    onPress: async () => {
                        const resultado = await refLocal
                            .doc(item.id)
                            .delete()
                            .then( () => {
                                alert("Local excluído!");
                                setAtualizar(true);
                            })
                    }
                }
            ]

        )
    }

    const editar = async(item) => {
        const resultado = firestore.collection('Usuario')
            .doc(auth.currentUser?.uid)
            .collection('Local')
            .doc(item.id)
            .onSnapshot( documentSnapshot => {
                const local = new Local(documentSnapshot.data())
                setFormLocal(local);
                
             })

    }


    return (
        <KeyboardAvoidingView style={estilo.container}>
            <View style={estilo.inputContainer}>
                

                <TextInput 
                    placeholder="Id" 
                    value={formLocal.id}
                    onChangeText={texto => setFormLocal({
                        ...formLocal,
                        id: texto
                    }) }
                    style={estilo.input} 
                />

                <TextInput 
                    placeholder="Nome" 
                    value={formLocal.nome}
                    onChangeText={texto => setFormLocal({
                        ...formLocal,
                        nome: texto
                    }) }
                    style={estilo.input} 
                />

                <TextInput 
                    placeholder="Latitude" 
                    value={formLocal.latitude}
                    onChangeText={texto => setFormLocal({
                        ...formLocal,
                        latitude: texto
                    }) }
                    style={estilo.input} 
                />

                <TextInput 
                    placeholder="Longitude" 
                    value={formLocal.longitude}
                    onChangeText={texto => setFormLocal({
                        ...formLocal,
                        longitude: texto
                    }) }
                    style={estilo.input} 
                />


            </View> 
            <View style={estilo.buttonContainer}>
                <TouchableOpacity 
                    style={[estilo.button, estilo.buttonOutline]}
                    onPress={Limpar}
                >
                    <Text style={[estilo.buttonText, estilo.buttonOutlineText]}>Limpar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[estilo.button]}
                    onPress={Salvar}
                >
                    <Text style={[estilo.buttonText]}>Salvar</Text>
                </TouchableOpacity>
            </View>

            <FlatList 
                data={local}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                refreshing={atualizar}
                onRefresh={ () => listarTodos() }
            />
        </KeyboardAvoidingView>
    );
}

export default LocalManter;