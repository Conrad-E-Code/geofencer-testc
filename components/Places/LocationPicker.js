import {Alert, StyleSheet, View, Text } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location";
import { useState } from "react";

function LocationPicker() {
    const [pickedLocation, SetPickedLocation] = useState()
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions()
    async function verifyPermissions() {
   if ( locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission()
            return permissionResponse.granted
        }
    
        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            console.log(locationPermissionInformation)
            Alert.alert("Permission Required to run app", "YOU NEED TO GRANT PERMISSIONS")
            return false
        }
        return true

    }

   async function getLocationHandler() {
        const hasPermission = await verifyPermissions()

        if (!hasPermission) {
            return
        }
        const location = await getCurrentPositionAsync()
        console.log(` LAT ${location.coords.latitude}, LONG ${location.coords.longitude}`)
        SetPickedLocation(location)
    }
    function pickonMapHandler() {
        
    }
return(
    <View>
        <View style={styles.mapPreview}>
            <Text>{pickedLocation ? ` LAT ${pickedLocation.coords.latitude}, LONG ${pickedLocation.coords.longitude}` : null}</Text>
        </View>
        <View style={styles.actions}>
        <OutlinedButton onPress={getLocationHandler} icon="location">
            Locate User
        </OutlinedButton>
        <OutlinedButton onPress={pickonMapHandler} icon="map">
            Pick On Map
        </OutlinedButton>
        </View>
    </View>
)
}

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
        width: "100%",
        height: 200,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"

    },

})