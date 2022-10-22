import React, { useEffect, useState } from 'react'
import { Image, View, Text, TouchableOpacity } from 'react-native'
import styles from './style'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'

const chatHandler = () => {
  return fetch('')
    .then((res) => res.json())
    .catch((error) => console.log(error))
}

export const ChatListItem = (props) => {
  let [fontsLoaded] = useNunitoFonts()

  const navigation = useNavigation()
  const goChatRoom = () => {
    navigation.navigate('ChatRoomScreen')
  }

  return (
    <TouchableOpacity onPress={goChatRoom} style={{ borderRadius: 15 }}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image
            source={require('../../assets/images/avatar.png')}
            style={styles.avatar}
          />
          <View style={styles.midContainer}>
            <Text style={styles.username}>{props.name}</Text>
            <Text numberOfLines={2} style={styles.lastMessage}>
              {props.lastMessage}
            </Text>
          </View>
        </View>
        <Text style={styles.time}>
          {props.createdAt || moment('2022-10-03 04:00').fromNow()}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
