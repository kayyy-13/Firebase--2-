import { useState } from 'react';
import { Text, View, KeyboardAvoidingView, TouchableOpacity, ImageBackground,FlatList, Button} from 'react-native';
import { TextInput } from 'react-native-paper';
import { auth, firestore } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import styles from '../estilo';

import { Picker } from '@react-native-picker/picker';
import { Resvaga } from '../model/Resvaga';


export default function ListaReservas() {
    const [reserva, setReserva] = useState<Resvaga[]>([]); //arry de vagas

    const refResvaga = firestore
        .collection("Usuario")
        .doc(auth.currentUser?.uid)
        .collection("Resvaga");

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
            console.log(reserva);
        });
        return () => subscriber(); 
    }

    return (
          <View style={styles.container}>
            <Button title='Listar Reservas' onPress={listar} />
            <FlatList
                data={reserva}
                renderItem={ ({item}) => (
                    <View>
                        <Text>Data: {item.data}</Text>
                        <Text>Tipo: {item.tipo}</Text>
                        <Text>Vaga: {item.vaga}</Text>
                    </View>
                )}
            />

          </View>
             
    )





}