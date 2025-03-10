import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail } from '../../store/slices/authSlice';
import { signInUser } from '../../store/thunks/authThunk';

const LoginPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarType, setSnackbarType] = useState('error');
  const [snackbarMessage, setSnackbarMessage] = useState(
    'Une erreur est survenue'
  );
  const { email, token } = useSelector((state) => state.auth);
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Check if all fields are filled
    if (!email || !password) {
      setSnackbarVisible(true);
      setSnackbarType('error');
      setSnackbarMessage('Tous les champs doivent être remplis');
      return;
    }
    const res = dispatch(signInUser({ password }));
    res.then((res) => {
      if (!res.payload) {
        setSnackbarVisible(true);
        setSnackbarType('error');
        setSnackbarMessage('Une erreur est survenue');
        return;
      }
      if (res.payload.error) {
        setSnackbarVisible(true);
        setSnackbarType('error');
        setSnackbarMessage("L'adresse email ou le mot de passe est incorrect");
        return;
      }
      if (!res.payload.error) {
        setSnackbarVisible(true);
        setSnackbarType('success');
        setSnackbarMessage(res.payload.message);
        return;
      }
    });
  };

  const handleEmail = (text) => {
    dispatch(setEmail(text));
  };
  useEffect(() => {
    if (token) {
      navigation.navigate('DiscoverScreen');
    }
  }, [token]);
  return (
    <View style={styles.container}>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        style={snackbarType === 'error' ? styles.error : styles.success}
        action={{
          label: '⨯',
          onPress: () => {
            setSnackbarVisible(false);
          },
        }}
      >
        {snackbarMessage}
      </Snackbar>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <TextInput
            label="Adresse email"
            placeholder="Adresse email"
            onChangeText={handleEmail}
            value={email}
            mode="outlined"
            onSubmitEditing={handleLogin}
          />
          <TextInput
            label="Mot de passe"
            placeholder="Mot de passe"
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
            mode="outlined"
            onSubmitEditing={handleLogin}
          />
        </View>
        <Button style={styles.button} onPress={handleLogin} mode="contained" icon="login">
          Se connecter
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '50%',
    gap: 24,
  },
  inputContainer: {
    minWidth: 300,
    gap: 10,
  },
  button: {
    minWidth: 300,
    borderRadius: 5
  },
  error: {
    backgroundColor: '#e35d6a',
  },
  success: {
    backgroundColor: '#479f76',
  },
});

export default LoginPage;
