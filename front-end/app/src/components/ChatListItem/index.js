import React, { useEffect, useState } from 'react'
import { Image, View, Text, TouchableOpacity } from 'react-native'
import styles from './style'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'

export const ChatListItem = ({ name, lastMessage, createAt }) => {
  const navigation = useNavigation()
  const goChatRoom = () => {
    navigation.navigate('ChatRoomScreen')
  }

  return (
    <TouchableOpacity onPress={goChatRoom}>
      <View style={styles.container}>
        <View style={styles.lefContainer}>
          <Image
            source={require('../../assets/images/avatar.png')}
            style={styles.avatar}
          />
          <View style={styles.midContainer}>
            <Text style={styles.username}>{name}</Text>
            <Text numberOfLines={2} style={styles.lastMessage}>
              {lastMessage}
            </Text>
          </View>
        </View>
        <Text style={styles.time}>
          {moment('2022-01-01').format('DD/MM/YYYY')}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
