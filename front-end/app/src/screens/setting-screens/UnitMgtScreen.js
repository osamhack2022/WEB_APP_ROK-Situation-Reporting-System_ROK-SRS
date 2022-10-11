import React, { useState } from 'react'
import { SafeAreaView, View, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'
import { ImagePicker } from '../../components/ImagePicker'

export function UnitMgtScreen() {
  const [name, setName] = useState('')
  const [slogan, setSlogan] = useState('')

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view}>
        <ImagePicker />
        <TextInput
          label="부대 이름 변경"
          dense={true}
          activeUnderlineColor="#008275"
          onChangeText={(name) => setName(name)}
          style={styles.textInput}
        />
        <TextInput
          label="부대 슬로건 변경"
          dense={true}
          activeUnderlineColor="#008275"
          onChangeText={(slogan) => setSlogan(slogan)}
          style={styles.textInput}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  view: {
    width: '85%',
  },
  textInput: {
    width: '100%',
    backgroundColor: 'white',
  },
})
