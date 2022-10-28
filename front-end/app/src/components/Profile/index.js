import { View, Text } from 'react-native'
import { Avatar } from 'react-native-paper'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import { styles } from './style'

export function Profile(props) {
  let [fontsLoaded] = useNunitoFonts()

  return (
    <View style={[styles.avatarView, props.style]}>
      <Avatar.Image
        source={props.source || require('../../assets/images/avatar.png')}
        size={props.size || 45}
        style={styles.avatarImg}
      />
      <View style={styles.nameView}>
        <Text style={[styles.name, props.nameStyle]}>
          {props.Rank} {props.name}
        </Text>
        <Text style={styles.position}>{props.position || '본부중대 통신'}</Text>
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
