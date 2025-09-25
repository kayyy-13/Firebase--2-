import { Button, ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import styles from '../estilo';

export default function Home() {

  const navigation = useNavigation()

  const logout = () =>{
    auth
    .signOut()
    .then( () => {
      navigation.replace('Login')
    })
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <ImageBackground source={require('../assets/tela.png')} resizeMode='stretch' style={styles.container}>
        <Text style={styles.titulo}>Bem vindo!</Text>

        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} onPress={logout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>

      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

