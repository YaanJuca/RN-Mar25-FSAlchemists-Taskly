import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TASKLY</Text>
        <Avatar.Image 
          size={40} 
          source={{ uri: '3067848-icone-expressivo-de-sorriso-triste-de-desenho-animado-no-estilo-plano-gratis-vetor.jpg' }} 
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.emoji}>😞</Text>
        <Text style={styles.message}>No momento você não possui tarefa</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Criar Tarefa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
