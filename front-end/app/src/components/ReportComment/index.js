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
        name={props.name}
        position={props.position}
        size={40}
        Rank={props.Rank}
        src={require('../../assets/images/avatar.png')}
        date={moment().format('YYYY-MM-DD hh:mm')}
        nameStyle={{ fontSize: 13 }}
      />
      <Paragraph style={{ marginTop: 5, marginLeft: 1 }}>
        <Paragraph style={[styles.type, { color: color }]}>
          {Type + ' '}
        </Paragraph>
        <Paragraph style={styles.paragraph}>{props.Content}</Paragraph>
      </Paragraph>
    </View>
  )
}
