import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import ActionBar from '../components/ActionBar';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

export default class HomeScreen extends React.Component {
  state = {
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    searchModalVisible: false,
    searchData: [],
  };

  getSearchData(text) {
    let api =
      'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' +
      text +
      '&inputtype=textquery&fields=formatted_address,name,geometry&key=AIzaSyCcN3Zu3otdWv4VZx_hE_Jz7xeDSihGyLc';

    axios.get(api).then((response) => {
      console.log(response.data);
      this.setState({
        searchData: response.data.candidates,
      });
    });
  }

  componentDidMount() {
    Geolocation.getCurrentPosition((info) =>
      this.setState({
        region: {
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      }),
    );
    this.getSearchData('India');
  }

  onRegionChange() {}

  render() {
    return (
      <View style={styles.container}>
        <ActionBar
          title="Home Screen"
          rightIconAction={() => this.props.navigation.navigate('LoginScreen')}
        />
        <TouchableOpacity
          onPress={() => this.setState({searchModalVisible: true})}>
          <TextInput
            placeholder="Search"
            editable={false}
            style={{
              width: responsiveWidth(90),
              backgroundColor: '#fff',
              alignSelf: 'center',
              margin: 10,
              borderRadius: 30,
              paddingHorizontal: 20,
              height: 40,
            }}
          />
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType="slide"
          visible={this.state.searchModalVisible}
          presentationStyle="overFullScreen"
          onRequestClose={() => {
            this.setState({
              searchModalVisible: !this.state.searchModalVisible,
            });
          }}>
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={-300}>
            <TouchableWithoutFeedback
              onPress={() =>
                this.setState({
                  searchModalVisible: !this.state.searchModalVisible,
                })
              }>
              <View
                style={{
                  width: responsiveWidth(100),
                  height: responsiveHeight(100),
                  opacity: 0.79,
                  backgroundColor: '#12203c',
                }}
              />
            </TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: '#fff',
                height: responsiveHeight(80),
                width: responsiveWidth(100),
                borderTopRightRadius: 40,
                borderTopLeftRadius: 40,
                padding: 20,
                position: 'absolute',
                bottom: 0,
                flex: 1,
              }}>
              <View
                style={{
                  alignSelf: 'center',
                  width: 47,
                  height: 5,
                  borderRadius: 8,
                  backgroundColor: '#ffc034',
                }}
              />
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextInput
                  ref={(search) => (this.search = search)}
                  placeholder="Search here"
                  style={{
                    width: responsiveWidth(90),
                    height: 45,
                    backgroundColor: '#ffffff',
                  }}
                  textAlignVertical="top"
                  selectionColor="transparent"
                  onChangeText={(text) => {
                    this.getSearchData(text);
                  }}
                />
              </View>
              {/* <ActivityIndicator
              animating={this.state.isLoading}
              size="small"
              color="#8b77fa"
            /> */}
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    width: responsiveWidth(40),
                    fontSize: 13,
                    fontWeight: 'bold',
                    color: '#c8cdd5',
                  }}>
                  Location
                </Text>
              </View>
              <FlatList
                data={this.state.searchData}
                style={{marginBottom: 20}}
                ItemSeparatorComponent={this.ItemSeparatorLine}
                keyboardShouldPersistTaps="always"
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        searchModalVisible: !this.state.searchModalVisible,
                        region: {
                          latitude: item.geometry.location.lat,
                          longitude: item.geometry.location.lng,
                          latitudeDelta: 0.0922,
                          longitudeDelta: 0.0421,
                        },
                        name: item.name,
                        address: item.formatted_address,
                      });
                      console.log(item.name);
                    }}>
                    <View
                      style={{
                        marginTop: 2,
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 5,
                        paddingRight: 0,
                        paddingLeft: 0,
                        marginBottom: 5,
                      }}>
                      <View
                        style={{
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                        }}>
                        <Text
                          numberOfLines={1}
                          style={{
                            color: '#12203c',
                            fontSize: 13,
                            fontWeight: 'bold',
                          }}>
                          {item.formatted_address}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={true}
              />
            </View>
          </KeyboardAvoidingView>
        </Modal>
        <MapView
          provider={PROVIDER_GOOGLE}
          region={this.state.region}
          onRegionChange={() => this.onRegionChange()}
          style={{flex: 1}}>
          <Marker coordinate={this.state.region} title={this.state.name} description={this.state.description}/>
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: responsiveHeight(90),
    width: responsiveWidth(100),
  },
});
