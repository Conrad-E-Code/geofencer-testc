import {View, Text, TextInput, ScrollView, StyleSheet} from "react-native"
import { useState } from "react"
function PlaceForm() {
    const [enteredTitle, setEnteredTitle] = useState("")
    function changeTitleHandler(enteredText) {
        setEnteredTitle(enteredText)
    }
        return(
        <ScrollView>
            <View>
                <Text>Title</Text>
                <TextInput onChangeText={changeTitleHandler}></TextInput>
            </View>
        </ScrollView>
    )
}

export default PlaceForm

const styles = StyleSheet.create()