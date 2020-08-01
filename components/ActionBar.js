import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Logout from '../assets/logout.svg';

export default class ActionBar extends React.Component {
  render() {
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#03B79D', '#40D3A2', '#68E6A7']}
        style={styles.linearGradient}>
        <View style={styles.actionBar}>
          <Text style={styles.title}>{this.props.title}</Text>
          <TouchableWithoutFeedback onPress={this.props.rightIconAction}>
            <View style={{height: 25, width: 25}}>
              <Logout height={25} width={25} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    width: Dimensions.get('screen').width,
  },
  actionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingVertical: 10,
  },
  title: {fontWeight: 'bold', fontSize: 16, color: '#fff'},
});
