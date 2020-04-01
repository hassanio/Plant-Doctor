import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { StatusBar, KeyboardAvoidingView } from 'react-native';
import { Container } from '../components/Container';
import CameraComponent from '../components/Camera/Camera.js'

console.disableYellowBox = true

class Cam extends Component {
	render() {
		return (
				<CameraComponent/>
			)
	}
}

export default Cam