import { View, Text } from 'react-native'
import { Avatar, Paragraph } from 'react-native-paper'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import moment from 'moment'
import { styles } from './style'

export function ReportComment({ name, position, text }) {
  let [fontsLoaded] = useNunitoFonts()

  console.log({ name, position, text })

  return (
    <View style={styles.contentView}>
      <View style={styles.avatarView}>
        <Avatar.Image
          source={require('../../assets/images/avatar.png')}
          size={40}
        />
        <View style={styles.nameView}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.position}>{position}</Text>
        </View>
        <View style={styles.dateView}>
          <Text style={styles.dateText}>
            {moment().format('YYYY-MM-DD hh:mm')}
          </Text>
        </View>
      </View>
      <Paragraph style={styles.paragraph}>{text}</Paragraph>
      <View style={styles.contView}></View>
    </View>
  )
}
