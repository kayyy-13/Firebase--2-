import { useEffect, useState } from 'react';
import { Text, View, KeyboardAvoidingView, TouchableOpacity, ImageBackground,FlatList, Button} from 'react-native';
import { TextInput } from 'react-native-paper';
import { auth, firestore } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import styles from '../estilo';

import { Picker } from '@react-native-picker/picker';
import { Resvaga } from '../model/Resvaga';
import {AccordionItem} from 'react-native-accordion-list-view';

export default function ListaReservas() {
    const [reserva, setReserva] = useState<Resvaga[]>([]); //arry de vagas

    const navigation = useNavigation();

    const refResvaga = firestore
        .collection("Usuario")
        .doc(auth.currentUser?.uid)
        .collection("Resvaga");

   useEffect(() => {
        listar();
     })
    


    const listar = () => {
        const subscriber = refResvaga
        .onSnapshot( (query) => {
            const reserva = [];
            query.forEach( (documento) => { 
                reserva.push ({
                    ...documento.data(),
                    key: documento.id
                });
            });
            setReserva(reserva);
           
        });
        return () => subscriber(); 
    }

    const editar = (item: Resvaga) => {
        navigation.navigate('Reserva de Vagas', {resvaga: item});
    }
 

    const Excluir = async(item) => {
        const resultado = await refResvaga
        .doc(item.id)
        .delete()
        .then(() => {
            alert('Reserva excluída com sucesso!');
            listar();
        });
    }


    return (
        <ImageBackground source={require('../assets/tela.png')} style={styles.container}>
         
            <FlatList
                data={reserva}
                renderItem={ ({item}) => (
                    <TouchableOpacity style={styles.listItem}
                     onPress={() => editar(item)} 
                     onLongPress={() => Excluir(item)}>
                        <Text style={styles.listText}>Data: {item.data}</Text>
                        <Text style={styles.listText}>Tipo: {item.tipo}</Text>
                        <Text style={styles.listText}>Vaga: {item.vaga}</Text>
                    </TouchableOpacity>
                )}
            />

        </ImageBackground>
             
    )
   custo




}