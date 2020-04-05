import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button, StatusBar, KeyboardAvoidingView, Dimensions, ToastAndroid, Image } from 'react-native';
import { Container } from '../components/Container';


console.disableYellowBox = true
const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;

class Pred extends Component {

	constructor(props) {
    super(props)
    this.state = {
        image: this.props.navigation.getParam('img'),
        pred: this.props.navigation.getParam('pred'),
        crop: this.props.navigation.getParam('pred').split("___")[0],
        diag: this.props.navigation.getParam('pred').split("___")[1].replace("_", " ")
    }
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
			<View style={{ flex: 1, marginLeft: imageWidth/20}}>
         		<StatusBar backgroundColor="#469B40" />
					<Image
		                  source = {{uri: this.state.image}}
		                  style = {{ width: imageHeight/3.8, height: imageHeight/3.8, marginTop: imageHeight/40, borderRadius: 5, alignSelf: 'center', borderRadius: 20}}
		            />

		            <Text style = {{
			                fontWeight: '600',
			                fontSize: imageHeight/40,
			                fontFamily: 'sans-serif-medium',
			                color: '#469B40',
			                textAlign: 'left',
			                paddingTop: imageHeight/15
			            }}> 
		              Crop: {this.state.crop}{"\n"}
		              Diagnosis: {this.state.diag}
		            </Text>
			</View>
			)
	}
}

export default Pred