import { View, Text } from 'react-native'
import { Avatar, Paragraph } from 'react-native-paper'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import moment from 'moment'
import { styles } from './style'
import { Profile } from '../Profile'

export function ReportComment({ name, position, text }) {
  let [fontsLoaded] = useNunitoFonts()

  console.log({ name, position, text })

  return (
    <View style={styles.contentView}>
      <Profile
        name="상병 조영효"
        position="본부중대 저격"
        size={40}
        src={require('../../assets/images/avatar.png')}
        date={moment().format('YYYY-MM-DD hh:mm')}
      />
      <Paragraph style={styles.paragraph}>{text}</Paragraph>
      <View style={styles.contView}></View>
    </View>
  )
}
