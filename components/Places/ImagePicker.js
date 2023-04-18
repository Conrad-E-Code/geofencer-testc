import {View, Button, Alert} from "react-native"
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from "expo-image-picker"

function ImagePicker() {
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions()

    async function verifyPermissions() {
        console.log(cameraPermissionInformation)
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED ) {
            const permissionResponse = await requestPermission()
            return permissionResponse.granted
        }
        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            console.log(cameraPermissionInformation)
            Alert.alert("Permission Required to run app")
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
       console.log(image)
    }
    return(
        <View>
            <View>

            </View>
            <Button title="Take Photo" onPress={takePhotoHandler} />

        </View>

    ) 
}

export default ImagePicker