import * as React from 'react';
import {TextInput, Snackbar} from 'react-native-paper';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Image,
  Keyboard,
  ImageBackground,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import SplashIcon from '../assets/location.svg';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

const Login = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const LoginApiCall = (email, password) => {
    if (email === '') {
      onToggleSnackBar();
      setMessage('Enter Email');
    } else if (password === '') {
      onToggleSnackBar();
      setMessage('Enter Password');
    } else {
      Keyboard.dismiss();
      if (email.trim() === 'user@gmail.com' && password === 'password') {
        axios.get('http://yesno.wtf/api/?force=yes').then((response) => {
          setEmail('');
          setPassword('');
          navigation.navigate('HomeScreen');
        });
      } else {
        axios.get('http://yesno.wtf/api/?force=no').then((response) => {
          onToggleSnackBar();
          setMessage('Invalid Credentials');
        });
      }
    }
  };

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const validateEmail = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email.trim()) === false) {
      setError(true);
      onToggleSnackBar();
      setMessage('Invalid Email');
    } else {
      setError(false);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.container}
      blurRadius={4}>
      <SplashIcon height={100} width={100} />
      <Text style={{color: '#fff', fontSize: 32, fontFamily: 'Raleway-Bold'}}>
        Welcome
      </Text>
      <View>
        <TextInput
          mode="outlined"
          style={styles.inputField}
          autoCapitalize="none"
          placeholder="Email"
          theme={{colors: {primary: '#000', background: 'transparent'}}}
          value={email}
          error={error}
          onBlur={validateEmail}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          mode="outlined"
          style={styles.inputField}
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}
          theme={{colors: {primary: '#000', background: 'transparent'}}}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <ActivityIndicator animating={false} size="large" />
      <TouchableWithoutFeedback onPress={() => LoginApiCall(email, password)}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#03B79D', '#40D3A2', '#68E6A7']}
          style={{
            width: responsiveWidth(90),
            padding: 10,
            borderWidth: 1,
            borderColor: '#fff',
            borderRadius: 30,
            alignItems: 'center',
          }}>
          <Text style={styles.title}>Login</Text>
        </LinearGradient>
      </TouchableWithoutFeedback>
      <Snackbar visible={visible} onDismiss={onDismissSnackBar} duration={1000}>
        {message}
      </Snackbar>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ECFFF3',
  },
  title: {fontFamily: 'Raleway-Bold', fontSize: 16, color: '#fff'},
  inputField: {width: responsiveWidth(90), marginTop: 10},
});

export default Login;
