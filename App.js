import { LocationAccuracy, startLocationUpdatesAsync, useBackgroundPermissions, PermissionStatus} from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import { } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/UI/IconButton';
import { Colors } from "./constants/colors"
import Map from './screens/Map';
import { useEffect } from 'react';
import { askAsync } from "expo-permissions"

export default function App() {
  const [locationPermissionInformation, requestPermission] = useBackgroundPermissions()
  const startLocationTask = async () => {
    const hasPermission = await verifyPermissions()
    if (!hasPermission) {
        return
        
    }
    try {
      await startLocationUpdatesAsync('locationTask', {
        accuracy: LocationAccuracy.Balanced,
        timeInterval: 5000,
        distanceInterval: 10,
        foregroundService: true,
      });
      console.log('Location task started!');
    } catch (error) {
      console.log('Error starting location task:', error);
    }
  };
  useEffect(() => {
    startLocationTask();
  }, [])
    console.log("35")

    async function verifyPermissions() {
      if (locationPermissionInformation) {
        console.log(locationPermissionInformation)
      if ( locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
               const permissionResponse = await requestPermission()
               return permissionResponse.granted
           }
           if (locationPermissionInformation.status === PermissionStatus.DENIED) {
               console.log(locationPermissionInformation)
               console.log("Billy")
               Alert.alert("Permission Required to run app", "YOU NEED TO GRANT PERMISSIONS")
               return false
           }
           return true
          }
   
       }
    //    async function getLocationHandler() {
    //     const hasPermission = await verifyPermissions()
    //     if (!hasPermission) {
    //         return 
    //     }
    //     console.log("has permission")

    // }
    
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

