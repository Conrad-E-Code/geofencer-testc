
import { StatusBar } from 'expo-status-bar';
import { } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/UI/IconButton';
import { Colors } from "./constants/colors"

export default function App() {

  const Stack = createNativeStackNavigator()
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {backgroundColor: Colors.primary500},
          headerTintColor: Colors.gray700,
          contentStyle: {backgroundColor: Colors.gray700} }}>
          <Stack.Screen
           name="AllPlaces" 
           component={AllPlaces} 
          options={({navigation}) => ({
            title: "Your Favorite Places",
            headerRight: ({tintColor}) => (
               <IconButton icon="add" size={24} color={tintColor} onPress={() => navigation.navigate("AddPlace")}
                />
          ),
        })}
        />
          <Stack.Screen name="AddPlace" component={AddPlace}
          options={{
            title: "Add A New Place"
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    
    </>
  );
}

