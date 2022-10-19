import { View, Text } from 'react-native'
import { Avatar } from 'react-native-paper'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import { styles } from './style'

export function Profile(
  {
    name = '병장 김형민',
    position = '본부중대 통신',
    size = 45,
    src = require('../../assets/images/avatar.png'),
  },
  props
) {
  let [fontsLoaded] = useNunitoFonts()

  return (
    <View style={[styles.avatarView, props.style]}>
      <Avatar.Image source={src} size={size} style={styles.avatarImg} />
      <View style={styles.nameView}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.position}>{position}</Text>
      </View>
      {props.date && (
        <View style={styles.dateView}>
          <Text style={styles.dateText}>{props.date}</Text>
        </View>
      )}
      {props.right}
    </View>
  )
}
