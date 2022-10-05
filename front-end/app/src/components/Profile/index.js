import { View, Text } from 'react-native'
import { Avatar } from 'react-native-paper'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import { styles } from './style'

export function Profile({ name, position, size = 45, src, date }) {
  let [fontsLoaded] = useNunitoFonts()

  return (
    <View style={styles.avatarView}>
      <Avatar.Image source={src} size={size} style={styles.avatarImg} />
      <View style={styles.nameView}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.position}>{position}</Text>
      </View>
      {date && (
        <View style={styles.dateView}>
          <Text style={styles.dateText}>{date}</Text>
        </View>
      )}
    </View>
  )
}
