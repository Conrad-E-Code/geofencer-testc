import {View, Text, TextInput, ScrollView, StyleSheet} from "react-native"
import { useState } from "react"
import {Colors} from "../../constants/colors"
import ImagePicker from "./ImagePicker"
function PlaceForm() {
    const [enteredTitle, setEnteredTitle] = useState("")
    function changeTitleHandler(enteredText) {
        setEnteredTitle(enteredText)
        console.log(enteredTitle)
    }
        return(
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} placeholder="check" onChangeText={changeTitleHandler} value={enteredTitle}></TextInput>
            </View>
            <ImagePicker />
        </ScrollView>
    )
}

export default PlaceForm

const styles = StyleSheet.create({
    form: {flex: 1,
    padding: 24,
},
    label: {fontWeight: "bold",
marginBottom: 4,
color: Colors.primary500,
borderBottomColor: Colors.primary700,
borderBottomWidth: 2, },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        backgroundColor: Colors.primary100
    }
})