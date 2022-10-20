import { View, Text } from 'react-native'
import { Paragraph, Colors } from 'react-native-paper'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import moment from 'moment'
import { styles } from './style'
import { Profile } from '../Profile'

export function ReportComment(props) {
  let [fontsLoaded] = useNunitoFonts()

  const Type =
    props.Type === 'emergency'
      ? '[긴급]'
      : props.Type === 'order'
      ? '[지시]'
      : '[보고]'
  const color =
    props.Type === 'emergency'
      ? 'red'
      : props.Type === 'order'
      ? Colors.amber700
      : 'green'
  return (
    <View style={styles.contentView}>
      <Profile
        name={props.Name}
        position={props.position}
        size={40}
        src={require('../../assets/images/avatar.png')}
        date={moment().format('YYYY-MM-DD hh:mm')}
      />
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Paragraph style={[styles.type, { color: color }]}>{Type}</Paragraph>
        <Paragraph style={styles.paragraph}>{props.Content}</Paragraph>
      </View>
    </View>
  )
}
