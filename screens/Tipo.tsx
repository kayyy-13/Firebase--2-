import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Button, TouchableOpacity, ImageBackground} from 'react-native';
import { TextInput } from 'react-native-paper';
import { auth, firestore } from '../firebase';
import styles from '../estilo';

import { Picker } from '@react-native-picker/picker';

import { Tipo } from '../model/Tipo';
import { useNavigation, useRoute } from '@react-navigation/native';


export default function CadastroTipo() {
  const[formTipo, setFormTipo] = useState<Partial<Tipo>>({})

  const route = useRoute();         // Cria a rota para receber o raca no editar

  useEffect( () => {                // Recebe o objeto raca para editar
    if (route.params) {
      setFormTipo(route.params.tipo); // Preenche o form com raca para edição
    }    
  }, [route.params])

  const salvar = () => {
    const refTipo = firestore.collection("Usuario")
        .doc(auth.currentUser?.uid)
        .collection("Tipo");

    const novoTipo = new Tipo(formTipo);


    if (formTipo.id) {
      const idTipo  = refTipo.doc(formTipo.id);

      idTipo.update(novoTipo.toFirestore())
      .then( () => {
        alert('Cadastro atualizado!');
        limpar();
      })
    } else {
      const idTipo  = refTipo.doc();
      novoTipo.id = idTipo.id;
      idTipo.set(novoTipo.toFirestore())

      alert('Tipo de vaga adicionado com sucesso!')
      limpar();
    }
  }

  const limpar = () => {
    setFormTipo({});
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <ImageBackground source={require('../assets/back2.png')} resizeMode='stretch' style={styles.container}>
        <Text style={styles.titulo}>CADASTRO DE TIPOS DE VAGA</Text>

        <View style={styles.inputView}>
          <TextInput 
            label='Nome do Tipo de Vaga' 
            onChangeText={valor => setFormTipo({
              ...formTipo,
              tipo : valor
            })}            
            style={styles.input}
            activeUnderlineColor='#005362'
            value={formTipo.tipo}
          />

        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} onPress={salvar}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.buttonSec]} onPress={limpar}>
            <Text style={[styles.buttonText, styles.buttonSecText]}>Limpar</Text>
          </TouchableOpacity>
        </View>

      </ImageBackground>
    </KeyboardAvoidingView>
  );
}