import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { StatusBar, KeyboardAvoidingView, Dimensions } from 'react-native';
import { Container } from '../components/Container';
import CameraComponent from '../components/Camera/Camera.js'

console.disableYellowBox = true

class Cam extends Component {

	static navigationOptions = {
	    title: 'Crop Diagnosis',
	    headerStyle: {
	      backgroundColor: '#469B40',
	    },
	    headerTintColor: '#fff',
	    headerTitleStyle: {
	      fontWeight: 'bold',
		  // textAlign:"center",
		  paddingLeft: (Dimensions.get('window').width)/6.3,
		  flex:1
	    },
  };



	render() {
		return (
				<CameraComponent navigation={this.props.navigation}/>
			)
	}
}

export default Cam