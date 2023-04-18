import {View, Button, Alert, Image, Text, StyleSheet} from "react-native"
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from "expo-image-picker"
import { useState } from "react"
import { Colors } from "../../constants/colors"
import OutlinedButton from "../UI/OutlinedButton"
function ImagePicker() {

    const [cameraPermissionInformation, requestPermission] = useCameraPermissions()
    const [cameraImage, setCameraImage] = useState()

    async function verifyPermissions() {
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED ) {
            const permissionResponse = await requestPermission()
            return permissionResponse.granted
        }
    
        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            console.log(cameraPermissionInformation)
            Alert.alert("Permission Required to run app", "YOU NEED TO GRANT PERMISSIONS")
            return false
        }
        return true
    }

   async function takePhotoHandler() {
    const hasPermission = await verifyPermissions();
    console.log(hasPermission)

    if (!hasPermission) {
        return 
    }

       const image = await launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
       })
       setCameraImage(image.uri)
    }
    let imagePreview = <Text>No Image Selected Yet.</Text>
    if (cameraImage) {
        imagePreview = <Image style={styles.image} source={{uri: cameraImage}} />
    }
    return(
        <View>
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>
            <OutlinedButton icon="camera" onPress={takePhotoHandler}>Take Photo</OutlinedButton>

        </View>

    ) 
}

export default ImagePicker

const styles = StyleSheet.create({
    imagePreview: {
        width: "100%",
        height: 200,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    image: {
        width: "100%",
        height: "100%"
    }
})