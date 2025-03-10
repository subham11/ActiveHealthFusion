import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Simple nav to main app; in real usage, you'd do auth checks
    navigation.navigate('Main' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>{t('login')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('email') ?? ''}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder={t('password') ?? ''}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title={t('login')} onPress={handleLogin} />
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16
  },
  input: {
    borderWidth: 1,
    marginVertical: 8,
    padding: 8,
    borderRadius: 4
  }
});
