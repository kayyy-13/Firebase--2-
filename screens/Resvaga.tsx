import { useEffect, useState } from 'react';
import { Text, View, KeyboardAvoidingView, TouchableOpacity, ImageBackground } from 'react-native';
import { TextInput } from 'react-native-paper';
import { auth, firestore } from '../firebase';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../estilo';

import { Picker } from '@react-native-picker/picker';
import { Resvaga } from '../model/Resvaga';

export default function CadastroResvaga() {
  const [formResvaga, setFormResvaga] = useState<Partial<Resvaga>>({});

  const navigation = useNavigation();

  const route = useRoute();

   useEffect(() => {
    if (route.params) {
     setFormResvaga(route.params.resvaga);
    }
  }, [route.params]);

  const salvar = async () => {
    try {
      const refResvaga = firestore
        .collection("Usuario")
        .doc(auth.currentUser?.uid)
        .collection("Resvaga");

    const novoResvaga = new Resvaga(formResvaga);

      if(formResvaga.id) {
        const idResvaga = refResvaga.doc(formResvaga.id);
        idResvaga.update(novoResvaga.toFirestore())
        .then(() => {
          alert('Reserva atualizada com sucesso!');
          
        })
      } else{
        const idResvaga = refResvaga.doc();
          novoResvaga.id = idResvaga.id;
        idResvaga.update(novoResvaga.toFirestore())
      }

      const idResvaga = refResvaga.doc();
      novoResvaga.id = idResvaga.id;
      await idResvaga.set(novoResvaga.toFirestore());

      alert('Reserva feita com sucesso!');
      setFormResvaga({});
    } catch (e) {
      console.error("Erro ao salvar reserva:", e);
      alert("Erro ao salvar reserva!");
    }
  };

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <ImageBackground source={require('../assets/tela.png')} resizeMode='stretch' style={styles.container}>
        <Text style={styles.titulo}>RESERVA DE VAGAS DE ESTACIONAMENTO</Text>

        <View style={styles.inputView}>
          <Text style={{ color: '#e9ce33ff', fontWeight: 'bold', marginTop: 10 }}>Tipo de Vaga</Text>
          <Picker
            selectedValue={formResvaga.tipo}
            onValueChange={valor => setFormResvaga({
              ...formResvaga,
              tipo: valor
            })}
            style={{ backgroundColor: '#fff', marginTop: 5 }}
          >
            <Picker.Item label="Selecione..." value="" />
            <Picker.Item label="Normal" value="normal" />
            <Picker.Item label="Deficiente" value="deficiente" />
            <Picker.Item label="Idoso" value="idoso" />
          </Picker>

          <Text style={{ color: '#e9ce33ff', fontWeight: 'bold', marginTop: 10 }}>Tipo de Vaga</Text>
          <Picker
            selectedValue={formResvaga.tipo}
            onValueChange={valor => setFormResvaga({
              ...formResvaga,
              vaga: valor
            })}
            style={{ backgroundColor: '#fff', marginTop: 5 }}
          >
            <Picker.Item label="Selecione..." value="" />
            <Picker.Item label="Carro" value="carro" />
            <Picker.Item label="Moto" value="moto" />
             <Picker.Item label="Van" value="van" />
          </Picker>

          <TextInput
            label='Data da Reserva'
            placeholder="DD/MM/AAAA"
            onChangeText={valor => setFormResvaga({
              ...formResvaga,
              data: valor
            })}
            value={formResvaga.data}
            style={styles.input}
            activeUnderlineColor='#005362'
          />
        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} onPress={salvar}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonSec]}
            onPress={() => navigation.replace('Página Inicial')}
          >
            <Text style={[styles.buttonText, styles.buttonSecText]}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
