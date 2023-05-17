
import { StatusBar } from 'expo-status-bar';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/UI/IconButton';
import { Colors } from "./constants/colors"
import Map from './screens/Map';
import { useEffect } from 'react';
import * as Location from 'expo-location';
import * as TaskManager from "expo-task-manager";

export default function App() {
  const LOCATION_TASK_NAME = "background-location-task"


  async function askPermission() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  console.log(status)
  }
askPermission()

// Define the background task for location tracking
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error(error);
    return;
  }
  if (data) {
    // Extract location coordinates from data
    const { locations } = data;
    const location = locations[0];
    if (location) {
      // Do something with captured location coordinates
      console.log(location)
    }
  }
});
const startBackgroundTracking = async () => {
  await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
    //Location Task Options
    
  });
};
    
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
          <Stack.Screen name="Map" component={Map} />
        </Stack.Navigator>
      </NavigationContainer>
    
    </>
  );
}

