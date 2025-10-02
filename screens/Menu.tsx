import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "./Home";
import Reserva from "./Resvaga";
import ListaReservas from "./ReservaListar";

const Drawer = createDrawerNavigator();

export default function Menu() {

    return(
        <Drawer.Navigator initialRouteName="Página Inicial">
            <Drawer.Screen name='Página Inicial' component={Home} />
            <Drawer.Screen name='Reserva de Vagas' component={Reserva} />
            <Drawer.Screen name='Lista de Reservas' component={ListaReservas} />

        </Drawer.Navigator>
    )
}