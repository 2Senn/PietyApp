import 'react-native-gesture-handler'
import React from 'react' 
import { createDrawerNavigator } from '@react-navigation/drawer'
import DefaultScreen from './screens/Default-Screen'
import AboutScreen from './screens/about'


const Drawer = createDrawerNavigator()

const App = () => {
  return (
    <Drawer.Navigator 
    initialRouteName = "Home"
    screenOptions={{
        headerShown: false,
        drawerType: 'back',
        overlayColor: '#0000000'}}>
      <Drawer.Screen name="Home" component={DefaultScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  )
}

export default App