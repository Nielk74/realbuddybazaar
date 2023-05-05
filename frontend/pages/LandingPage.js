import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import Icon from 'react-native-paper/src/components/Icon';
import { useSelector } from 'react-redux';

const LandingPage = ({ navigation }) => {
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    if (token) {
      navigation.navigate('Home');
    }
  }, [token]);
  return (
    <View style={styles.container}>
      <Icon source="account-group" size={30} />
      <Text style={styles.title}>BuddyBazaar</Text>
      <View style={styles.buttonsContainer}>
        <Button
          onPress={() => navigation.navigate('Register')}
          mode="outlined"
          icon="account-multiple-plus"
        >
          Inscription
        </Button>
        <Button
          onPress={() => navigation.navigate('Login')}
          mode="contained"
          icon="login"
        >
          Connexion
        </Button>
        <Button
          onPress={() => navigation.navigate('Home')}
          mode="outlined"
          icon="map-search"
        >
          Découvrir
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 30,
  },
});

export default LandingPage;
