import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import { View, Text } from 'react-native'
import { Avatar } from 'react-native-paper'
import { styles } from './style'

export function UserCard(props) {
  let [fontsLoaded] = useNunitoFonts()

  return (
    <View style={[styles.view, props.style]}>
      <Avatar.Image source={props.source} size={45} style={styles.image} />
      <Text style={styles.title}>
        {props.rank} {props.name}
      </Text>
      <Text style={styles.text} numberOfLines={1} ellipsizeMode="clip">
        {props.position}
      </Text>
      {props.right}
    </View>
  )
}
