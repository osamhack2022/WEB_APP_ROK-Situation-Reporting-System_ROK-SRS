import React from 'react'
import { Image, View, Text, TouchableOpacity } from 'react-native'
import styles from './style'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'

export const ChatListItem = (props) => {
  let [fontsLoaded] = useNunitoFonts()

  const navigation = useNavigation()
  const goChatRoom = () => {
    navigation.navigate('ChatNavigator', {
      screen: 'ChatRoomScreen',
      params: {
        name: props.name,
        userdata: props.userdata,
        users: props.users,
        chatid: props.chatid,
      },
    })
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
              {props.recentmsg}
            </Text>
          </View>
        </View>
        <Text style={styles.time}>{moment(props.rectime).fromNow()}</Text>
      </View>
    </TouchableOpacity>
  )
}
