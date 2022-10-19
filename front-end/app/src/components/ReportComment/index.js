import { View, Text } from 'react-native'
import { Paragraph, Colors } from 'react-native-paper'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import moment from 'moment'
import { styles } from './style'
import { Profile } from '../Profile'

export function ReportComment({ Name, position, Content, Type }) {
  let [fontsLoaded] = useNunitoFonts()

  const type =
    Type === 'emergency' ? '[긴급]' : Type === 'order' ? '[지시]' : '[보고]'
  const color =
    Type === 'emergency' ? 'red' : Type === 'order' ? Colors.amber700 : 'green'
  return (
    <View style={styles.contentView}>
      <Profile
        name={Name}
        position={position}
        size={40}
        src={require('../../assets/images/avatar.png')}
        date={moment().format('YYYY-MM-DD hh:mm')}
      />
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Paragraph style={[styles.type, { color: color }]}>{type}</Paragraph>
        <Paragraph style={styles.paragraph}>{Content}</Paragraph>
      </View>
    </View>
  )
}
