import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./HomeScreen";
import LocalManter from "./LocalManter";
import LocalListar from "./LocalListar";
import Explorar from "./Explorar";
// import Rotas from "./Rotas";

const Drawer = createDrawerNavigator();

export default function Menu () {
    return(
        <Drawer.Navigator initialRouteName="Página Inicial">
            <Drawer.Screen name="Página Inicial" component={Home}/>
            <Drawer.Screen name="Editar Localidades" component={LocalManter}/>
            <Drawer.Screen name="Lista Localidades" component={LocalListar}/>
            <Drawer.Screen name="Explorar livremente" component={Explorar}/>
            {/* <Drawer.Screen name="Rotas" component={Rotas}/> */}
        </Drawer.Navigator>
    )
}  