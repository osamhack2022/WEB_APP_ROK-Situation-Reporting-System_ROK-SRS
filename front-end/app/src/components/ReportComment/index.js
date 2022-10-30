import { View } from 'react-native'
import { Paragraph, Colors } from 'react-native-paper'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import moment from 'moment'
import { styles } from './style'
import { Profile } from '../Profile'
import { convertRank } from '../../helperfunctions/convertRank'

const dftPic =
  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'

export function ReportComment(props) {
  let [fontsLoaded] = useNunitoFonts()

  const Type =
    props.Type === '보고사항'
      ? '[보고사항]'
      : props.Type === '지시사항'
      ? '[지시사항]'
      : '[기밀사항]'
  const color =
    props.Type === '보고사항'
      ? Colors.green700
      : props.Type === '지시사항'
      ? Colors.amber700
      : Colors.red700

  return (
    <View style={styles.contentView}>
      <Profile
        Rank={convertRank(props.User.Rank)}
        name={props.User.Name}
        role={props.User.Role}
        size={40}
        source={{ uri: props.User.pic || dftPic }}
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
