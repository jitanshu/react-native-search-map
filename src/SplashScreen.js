import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Button,
  Text,
  StatusBar,
} from 'react-native';
import SplashIcon from '../assets/location.svg';
import LinearGradient from 'react-native-linear-gradient';

export default class SplashScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isVisible: true,
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount() {
    
    setTimeout(() => {
      this.props.navigation.replace('LoginScreen');
    }, 2000);
  }

  render() {
    return (
      <LinearGradient
        colors={['#03B79D', '#40D3A2', '#68E6A7']}
        style={styles.linearGradient}>
        <SplashIcon height={100} width={100} />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
