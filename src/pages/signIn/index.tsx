import React, { useState, useEffect } from 'react';
import {
  Text, View, Image, TextInput,
  KeyboardAvoidingView, TouchableOpacity,
  Alert
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { styles } from './style';

export default function App() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isCSenhaVisible, setIsCSenhaVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigation = useNavigation();

  // Recupera os dados salvos (caso rememberMe tenha sido marcado anteriormente)
  useEffect(() => {
    const loadRememberedCredentials = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('rememberedEmail');
        const savedSenha = await AsyncStorage.getItem('rememberedSenha');

        if (savedEmail && savedSenha) {
          setEmail(savedEmail);
          setSenha(savedSenha);
          setRememberMe(true);
        }
      } catch (error) {
        console.error("Erro ao carregar dados salvos:", error);
      }
    };

    loadRememberedCredentials();
  }, []);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Preencha todos os campos!");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert('Digite um e-mail válido');
      return;
    }

    if (senha.length < 8) {
      Alert.alert('A senha precisa ter no mínimo 8 caracteres');
      return;
    }

    try {
      const response = await fetch('http://18.231.154.135:3000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
      });

      const data = await response.json();

      if (response.ok && data.success && data.user) {
        const { email, nome, numero } = data.user;

        await AsyncStorage.setItem("loggedUserEmail", email);
        await AsyncStorage.setItem("loggedUserNome", nome);
        await AsyncStorage.setItem("loggedUserNumero", numero);

        // Lembrar ou esquecer credenciais
        if (rememberMe) {
          await AsyncStorage.setItem("rememberedEmail", email);
          await AsyncStorage.setItem("rememberedSenha", senha);
        } else {
          await AsyncStorage.removeItem("rememberedEmail");
          await AsyncStorage.removeItem("rememberedSenha");
        }

        navigation.navigate("Tab");
      } else {
        Alert.alert("Email ou senha incorretos!");
      }

    } catch (error) {
      console.error("Erro ao tentar fazer login:", error);
      Alert.alert("Erro ao conectar com o servidor. Tente novamente.");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Image
          source={require('../../assets/imgs/frame1.png')}
          style={styles.logoImage}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry={!isCSenhaVisible}
          maxLength={8}
          autoCorrect={false}
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity onPress={() => setIsCSenhaVisible(!isCSenhaVisible)}>
          <Text>Ver Senha</Text>
        </TouchableOpacity>

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            onPress={() => setRememberMe(!rememberMe)}
            style={styles.checkbox}
          >
            {rememberMe && <Text style={styles.checkboxCheckmark}>✓</Text>}
          </TouchableOpacity>
          <Text style={styles.namecheck}>Lembrar de mim</Text>
        </View>

        <TouchableOpacity style={styles.buttonEntrar} onPress={handleLogin}>
          <Text style={styles.textButtonWhite}>ENTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonCriar}
          onPress={() => navigation.navigate("SingUp")}
        >
          <Text style={styles.textButtonPurple}>CRIAR CONTA</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
