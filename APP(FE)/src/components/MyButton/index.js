import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import { styles } from './style'

export function MyButton(props) {
  let [fontsLoaded] = useNunitoFonts()
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.view, props.style]}
    >
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  )
}
