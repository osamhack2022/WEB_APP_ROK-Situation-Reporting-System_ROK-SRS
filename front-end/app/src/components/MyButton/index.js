import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import { styles } from './style'

export function MyButton(props) {
  let [fontsLoaded] = useNunitoFonts()
  const navigation = useNavigation()

  return (
    <View style={[styles.view, props.style]}>
      <TouchableOpacity onPress={props.onPress}>
        <Text style={styles.text}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  )
}
