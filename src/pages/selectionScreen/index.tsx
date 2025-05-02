
import React from "react";
import { View, Button, StyleSheet} from "react-native";

import { useNavigation } from "@react-navigation/native";

export default function SelectionScreen (){
    const navigation = useNavigation();

    return(
            <View style={styles.container}>                
                    <Button title="SingIn" onPress={() => navigation.navigate("SingIn")}></Button>
                    <Button title="SingUp" onPress={() => navigation.navigate("SingUp")}></Button>
                    <Button title="SplashScreen" onPress={() => navigation.navigate("SplashScreen")}></Button>
                    <Button title="HomePage" onPress={() => navigation.navigate("HomePage")}></Button>
            </View>        
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',     
    },
  });