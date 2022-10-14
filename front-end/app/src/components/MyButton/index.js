import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import { styles } from './style'

export function MyButton({ text, onPress }) {
  let [fontsLoaded] = useNunitoFonts()
  const navigation = useNavigation()

  return (
    <View style={styles.view}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  )
}
