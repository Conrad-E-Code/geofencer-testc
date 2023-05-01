import MapView, {Marker, Polygon} from "react-native-maps"
import {View, StyleSheet} from "react-native"
import {useState} from "react"
import {isPointInPolygon} from "geolib"

function Map() {
    const polygonCoords = [
        { latitude: 47.653353, longitude: -122.365216 },
        { latitude: 47.653343, longitude: -122.364737 },
        { latitude: 47.653106, longitude: -122.365257 },
        { latitude: 47.653022, longitude: -122.365316 }
      ]
    const [selectedLocation, setSelectedLocation] = useState()
    const region = {
        latitude: 47.653353,
        longitude: -122.365216,
        latitudeDelta: 0.0922 ,
        longitudeDelta: 0.0421
    }
    if (selectedLocation) {
        const isWithinPolygon = isPointInPolygon(selectedLocation, polygonCoords)
        console.log(isWithinPolygon)
            if (isWithinPolygon) {
        console.log('The point is within the polygon.');
      } else {
        console.log('The point is outside the polygon.');
      }}
function selectLocationHandler(e) {
    const lat = e.nativeEvent.coordinate.latitude
    const lng = e.nativeEvent.coordinate.longitude
    setSelectedLocation({
        latitude: lat,
        longitude: lng
    })

    }


      
    return(
        <MapView onPress={selectLocationHandler} style={styles.map} initialRegion={region}>
            {selectedLocation ? <Marker coordinate={selectedLocation} /> : null}
            <Polygon
          coordinates={polygonCoords}
          strokeWidth={2}
          fillColor="rgba(255,0,0,0.5)"
          strokeColor="red"
        />
        </MapView>
    )
}

export default Map

const styles = StyleSheet.create({
    map: {
        flex: 1
    }

}) 