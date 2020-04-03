import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation'
import Cam from '../screens/Cam'
import Home from '../screens/Home'


export default createAppContainer(createStackNavigator({
  home: {
		screen: Home,
        path:'login/:user',
	},
  cam: {
		screen: Cam,
	},

}))

