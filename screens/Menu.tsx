import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "./Home";
import Reserva from "./Resvaga";
import ListaReservas from "./ReservaListar";

import { Usuario } from "../model/Usuario";
import { auth, firestore } from "../firebase";
import { useEffect, useState } from "react";


const Drawer = createDrawerNavigator();
const[usuario, setUsuario] = useState<Usuario[]>([]); 
       useEffect( () => {                // Recebe o objeto pet para editar
        listarUsuario();
    }, [])

    const listarUsuario = () => {
        const refUsuario = firestore.collection("Usuario")
            .doc(auth.currentUser?.uid)
            .get()
            .then(DocumentSnapshot =>{
                setUsuario({
                    id: DocumentSnapshot.id,
                    ...DocumentSnapshot.data()
                })                
            })
        
    }        

export default function Menu() {

    return(
        <Drawer.Navigator initialRouteName="Página Inicial">
            <Drawer.Screen name='Página Inicial' component={Home} />
            <Drawer.Screen name='Reserva de Vagas' component={Reserva} />
            <Drawer.Screen name='Lista de Reservas' component={ListaReservas} />

        </Drawer.Navigator>
    )
}