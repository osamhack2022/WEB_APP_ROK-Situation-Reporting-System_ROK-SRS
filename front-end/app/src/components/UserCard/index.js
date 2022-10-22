import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import { View, Text } from 'react-native'
import { Avatar } from 'react-native-paper'
import { styles } from './style'

export function UserCard(props) {
  let [fontsLoaded] = useNunitoFonts()

  return (
    <View style={styles.view}>
      <Avatar.Image source={props.source} size={48} style={styles.image} />
      <Text style={styles.title}>{props.name}</Text>
      <Text style={styles.text}>{props.position}</Text>
    </View>
  )
}
