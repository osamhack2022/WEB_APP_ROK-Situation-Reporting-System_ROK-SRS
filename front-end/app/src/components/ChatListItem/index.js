import React from 'react'
import { Image, View, Text, TouchableOpacity } from 'react-native'
import styles from './style'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import { matchSeverityColor } from '../../helperfunctions/matchSeverityColor'

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
        severity: props.severity,
      },
    })
  }

  return (
    <TouchableOpacity onPress={goChatRoom} style={{ borderRadius: 15 }}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image
            source={{
              uri: 'https://camo.githubusercontent.com/3c2bd3f35721dc332ebf2b11ace89722c37a0f60b94eac42b2a0462fdeb2d420/68747470733a2f2f63646e2d69636f6e732d706e672e666c617469636f6e2e636f6d2f3531322f363134322f363134323232362e706e67',
            }}
            style={styles.avatar}
          />
          <View style={styles.midContainer}>
            <Text style={styles.username}>{props.name}</Text>
            <Text
              numberOfLines={1}
              style={styles.lastMessage}
              ellipsizeMode="tail"
            >
              {props.recentmsg}
            </Text>
          </View>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
            marginRight: 5,
            justifyContent: 'space-between',
          }}
        >
          <Text style={styles.time}>{moment(props.rectime).fromNow()}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.severity}>중요도: </Text>
            <Text
              style={[
                styles.severity,
                {
                  color: matchSeverityColor(props.severity),
                  fontFamily: 'NunitoSans_700Bold',
                },
              ]}
            >
              {props.severity}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
