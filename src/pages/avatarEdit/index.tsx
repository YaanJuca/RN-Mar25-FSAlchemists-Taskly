import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useTheme } from '../../pages/preferencesMenu/themeContext';
import getStyles from './style';
import ConfirmEditModal from '../../components/common/ConfirmEditModal';

import ChevronLeftIcon from '../../assets/icons/ChevronLeft.png';

interface Avatar {
  id: number;
  imageUrl: string; // Agora é string
  borderColor: string;
}

const AvatarSelectionScreen: React.FC = () => {
  const [selectedAvatarId, setSelectedAvatarId] = useState<number | null>(null);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  // Substitua essas URLs pelas URLs reais do seu bucket S3
  const avatars: Avatar[] = [
    { id: 1, imageUrl: 'https://avatares-taskly.s3.sa-east-1.amazonaws.com/Ellipse+1.png', borderColor: theme.primary },
    { id: 2, imageUrl: 'https://avatares-taskly.s3.sa-east-1.amazonaws.com/Ellipse+2.png', borderColor: theme.primaryLight },
    { id: 3, imageUrl: 'https://avatares-taskly.s3.sa-east-1.amazonaws.com/Ellipse+3.png', borderColor: theme.secondaryAccent },
    { id: 4, imageUrl: 'https://avatares-taskly.s3.sa-east-1.amazonaws.com/Ellipse+4.png', borderColor: theme.error },
    { id: 5, imageUrl: 'https://avatares-taskly.s3.sa-east-1.amazonaws.com/Ellipse+5.png', borderColor: '#B58B46' },
  ];

  const handleBackButton = () => {
    navigation.goBack();
  };

  const handleAvatarPress = (id: number) => {
    setSelectedAvatarId(id);
  };

  const handleConfirmSelection = () => {
    if (selectedAvatarId) {
      console.log('Avatar selecionado: ', selectedAvatarId);
      setIsConfirmationModalVisible(true);
    } else {
      console.warn('Nenhum avatar selecionado.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackButton} style={styles.backButton}>
          <Image source={ChevronLeftIcon} style={styles.backButtonIcon} />
          <Text style={styles.backButtonText}>VOLTAR</Text>
        </TouchableOpacity>
        <Text style={styles.titleHead}>EDIÇÃO DE PERFIL</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>SELECIONE SEU AVATAR</Text>
        <Text style={styles.subtitle}>(Escolha somente um.)</Text>
      </View>

      <View style={styles.avatarContainer}>
        {avatars.map((avatar) => (
          <TouchableOpacity
            key={avatar.id}
            style={[
              styles.avatarButton,
              { borderColor: avatar.borderColor },
            ]}
            onPress={() => handleAvatarPress(avatar.id)}
          >
            <Image
              source={{ uri: avatar.imageUrl }}
              style={[
                styles.avatarImage,
                selectedAvatarId !== avatar.id && styles.deselectedAvatarImage,
              ]}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirmSelection}
      >
        <Text style={styles.confirmButtonText}>CONFIRMAR EDIÇÃO</Text>
      </TouchableOpacity>
      <ConfirmEditModal
        visible={isConfirmationModalVisible}
        onRequestClose={() => {
          setIsConfirmationModalVisible(false);
          navigation.pop(2);
        }}
      />
    </View>
  );
};

export default AvatarSelectionScreen;
