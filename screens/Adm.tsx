import { useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, ImageBackground } from 'react-native';
import { TextInput } from 'react-native-paper';
import { auth, firestore } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import styles from '../estilo';
import { Adm } from '../model/Adm';

export default function CadastroAdm() {
  const [formAdm, setFormAdm] = useState<Partial<Adm>>({
    nome: '',
    email: '',
    senha: '',
    fone: ''
  });

  const navigation = useNavigation();

  const registrar = () => {
    const { nome, email, senha, fone } = formAdm;

    // Validação simples dos campos
    if (!nome || !email || !senha || !fone) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    // Criação do usuário no Firebase Auth
    auth
      .createUserWithEmailAndPassword(email, senha)
      .then(userCredentials => {
        console.log('Logado como: ' + userCredentials.user?.email);

        // Salvar os dados do admin no Firestore
        const refAdm = firestore.collection('U');
        const idAdm = refAdm.doc(auth.currentUser?.uid);
        
        idAdm.set({
          id: auth.currentUser?.uid,
          nome: nome,
          email: email,
          senha: senha,
          fone: fone
        })
        .then(() => {
          console.log('Dados do admin registrados no Firestore!');
          navigation.replace('Menu');
        })
        .catch(erro => {
          console.error('Erro ao registrar no Firestore: ', erro.message);
          alert('Erro ao registrar dados no Firestore: ' + erro.message);
        });
      })
      .catch(erro => {
        console.error('Erro ao criar conta: ', erro.message);
        alert('Erro ao criar conta: ' + erro.message);
      });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ImageBackground source={require('../assets/tela.png')} resizeMode="stretch" style={styles.container}>
        <Text style={styles.titulo}>CADASTRO ADMINISTRATIVO</Text>

        <View style={styles.inputView}>
          <TextInput
            label="Nome"
            value={formAdm.nome}
            onChangeText={valor => setFormAdm({ ...formAdm, nome: valor })}
            style={styles.input}
            activeUnderlineColor="#e9ce33ff"
          />
          <TextInput
            label="Email"
            value={formAdm.email}
            onChangeText={valor => setFormAdm({ ...formAdm, email: valor })}
            style={styles.input}
            activeUnderlineColor="#e9ce33ff"
            keyboardType="email-address"
          />
          <TextInput
            label="Senha"
            value={formAdm.senha}
            onChangeText={valor => setFormAdm({ ...formAdm, senha: valor })}
            secureTextEntry={true}
            style={styles.input}
            activeUnderlineColor="#e9ce33ff"
          />
          <TextInput
            label="Fone"
            value={formAdm.fone}
            onChangeText={valor => setFormAdm({ ...formAdm, fone: valor })}
            style={styles.input}
            activeUnderlineColor="#e9ce33ff"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} onPress={registrar}>
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.buttonSec]} onPress={() => navigation.replace('Página Inicial')}>
            <Text style={[styles.buttonText, styles.buttonSecText]}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
