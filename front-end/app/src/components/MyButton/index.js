import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import { styles } from './style'

export function MyButton({ text, dest }) {
  let [fontsLoaded] = useNunitoFonts()
  const navigation = useNavigation()

  return (
    <View style={styles.view}>
      <TouchableOpacity onPress={() => navigation.navigate(dest)}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  )
}
