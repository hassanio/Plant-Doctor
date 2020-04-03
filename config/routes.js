import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation'
import Cam from '../screens/Cam'
import Home from '../screens/Home'


export default createAppContainer(createStackNavigator({
  home: {
		screen: Home,
        path:'login/:user',
        navigationOptions: ({ navigation }) => ({
	      	title: 'Plant Doctor',
		    headerStyle: {
		      backgroundColor: '#469B40',
		    },
		    headerTintColor: '#fff',
		    headerTitleStyle: {
		      fontWeight: 'bold',
		      alignSelf: 'center',
		      textAlign:"center",
		      flex:1
		    },
	    })
	},
  cam: {
		screen: Cam,
		navigationOptions: ({ navigation }) => ({
	      title: 'Crop Diagnosis',
	    })
	},

}))

