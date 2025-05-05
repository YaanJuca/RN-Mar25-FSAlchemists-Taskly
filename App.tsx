import React from "react"; 

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SingIn from "./src/pages/singin";
import SingUp from "./src/pages/singUp";
import SelectionScreen from "./src/pages/selectionScreen";
import avatarSelect from "./src/pages/avatarSelect";
import SplashScreen from "./src/pages/splashscreen";
import menuProfile from "./src/pages/menuProfile";
import HomePage from "./src/pages/homePage/index.tsx";


const Stack = createNativeStackNavigator();

export default function app(){
  return(
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="SelectionScreen" component={SelectionScreen}/>
        <Stack.Screen name="SingIn" component={SingIn}/>
        <Stack.Screen name="SingUp" component={SingUp}/>
        <Stack.Screen name="avatarSelect" component={avatarSelect}/>
        <Stack.Screen name="SplashScreen" component={SplashScreen}/>
        <Stack.Screen name="menuProfile" component={menuProfile}/>
        <Stack.Screen name="HomePage" component={HomePage} options={{headerShown: false,}}/>

        
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}