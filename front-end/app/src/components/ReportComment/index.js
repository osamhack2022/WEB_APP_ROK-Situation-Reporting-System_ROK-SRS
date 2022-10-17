import { View } from 'react-native'
import { Paragraph } from 'react-native-paper'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import moment from 'moment'
import { styles } from './style'
import { Profile } from '../Profile'

export function ReportComment({ Name, position, Content }) {
  let [fontsLoaded] = useNunitoFonts()

  return (
    <View style={styles.contentView}>
      <Profile
        name={Name}
        position={position}
        size={40}
        src={require('../../assets/images/avatar.png')}
        date={moment().format('YYYY-MM-DD hh:mm')}
      />
      <Paragraph style={styles.paragraph}>{Content}</Paragraph>
      <View style={styles.contView}></View>
    </View>
  )
}
