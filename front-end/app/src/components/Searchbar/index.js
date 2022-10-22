import React, { useState } from 'react'
import { View, TextInput } from 'react-native'
import { IconButton, Colors } from 'react-native-paper'
import { styles, borderColor } from './style'

export function Searchbar(props) {
  const [focus, setFocus] = useState(false)

  return (
    <View style={[styles.searchBar, borderColor(focus), props.style]}>
      <IconButton
        icon="magnify"
        size={25}
        color={focus ? '#008275' : Colors.grey500}
      />
      <TextInput
        placeholder={props.placeholder}
        onChangeText={(query) => props.setQuery(query)}
        style={styles.input}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        value={props.value}
      />
      {props.value && (
        <IconButton
          icon="window-close"
          size={25}
          color={Colors.grey500}
          onPress={() => props.setQuery('')}
        />
      )}
    </View>
  )
}
