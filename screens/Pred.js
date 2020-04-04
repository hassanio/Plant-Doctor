import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button, StatusBar, KeyboardAvoidingView, Dimensions, ToastAndroid } from 'react-native';
import { Container } from '../components/Container';
const axios = require('axios')


console.disableYellowBox = true
const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;

class Pred extends Component {

	constructor(props) {
    super(props)
    this.state = {
        image: this.props.navigation.getParam('img'),
    }
  }

  async componentDidMount() {

		console.log(this.state.image)

		img_type = ((this.state.image).split(".").pop())
        img_type = "jpg"
        const type_ = "image/" + img_type;
        const name_ = "photo." + img_type;


        const formData = new FormData();
        const photo = {
          uri: this.state.image,
          type: type_,
          name: name_
        }

        formData.append('file', photo)
        ToastAndroid.show("SENT", ToastAndroid.LONG)

        // console.log(formData)
        const res = await axios.post('https://soil-sproj.herokuapp.com/analyze', formData, {
            headers: {
              'content-type': 'multipart/form-data',
            }
        }).then((response) => {
            ToastAndroid.show(String(response.data['result']), ToastAndroid.LONG)
            // console.log(response);


        }).catch(function (err) {
          console.log(err)
        });

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