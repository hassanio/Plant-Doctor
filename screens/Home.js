import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button, StatusBar, KeyboardAvoidingView } from 'react-native';
import { Container } from '../components/Container';


console.disableYellowBox = true

class Home extends Component {

	render() {
		return (
			<Container>
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<Button
			           title="Diagnose Crop"
			           onPress = {() => {this.props.navigation.navigate('cam')}}
			        />
				</View>
			</Container>
			)
	}
}

export default Home