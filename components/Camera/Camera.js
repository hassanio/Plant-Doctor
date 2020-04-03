import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import React, { Component } from 'react';
import { Button, TextStyle, ActivityIndicator, Icon, Item, Dimensions, Platform, View, TextInput, TouchableOpacity, TouchableHighlight, Text, KeyboardAvoidingView, Image, ToastAndroid, Alert } from 'react-native';
const axios = require('axios')
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { connectActionSheet, ActionSheetOptions, ActionSheetProps } from '@expo/react-native-action-sheet'
import { SimpleLineIcons, Entypo } from '@expo/vector-icons';

const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;
const DESIRED_RATIO = "16:9";

const icon = (name: string) => <SimpleLineIcons name={name} size={24} color="#469B40"/>;

class CameraComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
        loading: false,
        image: null,
        text: "",
    }
  }


  async componentWilllMount() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (status !== 'granted') {
          ToastAndroid.show("Permission Denied!")
      }
    }
  }

  _OpenActionSheet = () => {
  // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
    const options = ['Open Camera', 'Open Gallery'];
    const cancelButtonIndex = 2;
    const textStyle = {
          fontWeight: '500',
          color: '#469B40',
        }
    const containerStyle = {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }
    icons = [icon('camera'), icon('picture')]

   
    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        textStyle,
        containerStyle,
        icons
      },
      buttonIndex => {
          this._pickImage(buttonIndex)
        // Do something here depending on the button index selected
      },
  );
};


    _pickImage = async (index) => {

      if (index === 0) {
        let result = await ImagePicker.launchCameraAsync({quality: 0.5})

        if (!result.cancelled) {
        const resizedPhoto = await ImageManipulator.manipulateAsync(result.uri, [
          { resize: { width: 800 }}
        ])
        this.setState({ image: resizedPhoto.uri })}

      } else {
        let result = await ImagePicker.launchImageLibraryAsync({quality: 0.5})
        if (!result.cancelled) {
        const resizedPhoto = await ImageManipulator.manipulateAsync(result.uri, [
          { resize: { width: 800 }}
        ])
        this.setState({ image: resizedPhoto.uri })}
      }

        

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

        this.setState({ text: "Predicting your crop's disease..."})
        // console.log(formData)
        const res = await axios.post('https://plantdocc.onrender.com/analyze', formData, {
            headers: {
              'content-type': 'multipart/form-data',
            }
        }).then((response) => {
            ToastAndroid.show(String(response.data['result']), ToastAndroid.LONG)
            // console.log(response);


        }).catch(function (err) {
          ToastAndroid.show(String(err, ToastAndroid.LONG))
        });

        this.setState({ loading: false })
        this.setState({ image: null })

        // this._pickImage()
        
    }




  render() {

    const { hasCameraPermission } = this.state

    if (0) {
      return <View />
    }
    else if (0) {
      return <Text>No access to camera</Text>
    }
    else {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {!this.state.image && <Button
            title="Tap to Launch Camera"
            onPress={this._OpenActionSheet}
          />}
          {this.state.image &&
                              <View style = {{height: imageHeight, width: imageWidth}}>
                                <Image
                                  style={{width: imageWidth, height: imageHeight}}
                                  source={{uri: this.state.image}}
                                />
                                <View style = {{
                                  height: imageHeight,
                                  width: imageWidth,
                                  position: 'absolute',
                                  paddingLeft: 0,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  opacity: 0.8,
                                  backgroundColor: '#808080',
                                }}>
                                <Text style = {{fontSize: 20, color: 'white', paddingBottom: imageHeight/40, fontWeight: 'bold'}}>{this.state.text}</Text>
            <ActivityIndicator style= {{alignSelf: 'center'}} color='#FFFFFF' size='large'/>
            </View>
          </View>}
        </View>
      );
    }
  }
}

export default  connectActionSheet(CameraComponent)
