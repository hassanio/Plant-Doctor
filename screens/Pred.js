import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button, StatusBar, KeyboardAvoidingView, Dimensions, ToastAndroid } from 'react-native';
import { Container } from '../components/Container';


console.disableYellowBox = true
const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;

class Pred extends Component {

	constructor(props) {
    super(props)
    this.state = {
        image: this.props.navigation.getParam('img'),
        pred: this.props.navigation.getParam('pred')
    }
  }

  async componentDidMount() {
		console.log(this.state.image)
  }

	static navigationOptions = {
	      	title: 'Crop Diagnosis',
		    headerStyle: {
		      backgroundColor: '#469B40',
		    },
		    headerTintColor: '#fff',
		    headerTitleStyle: {
		      fontWeight: 'bold',
		      paddingLeft: imageWidth/6,
		      flex:1
		    },
		    headerForceInset: { top: 'never', bottom: 'never' }
	}

	render() {

		return (
			<Container>
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<Button
			           title="Diagnose Crop"
			        />
				</View>
			</Container>
			)
	}
}

export default Pred