import { View, Text } from 'react-native'
import { Paragraph, Button } from 'react-native-paper'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import { Profile } from '../Profile'
import { styles } from './style'
import { convertRank } from '../../helperfunctions/convertRank'

const dftPic =
  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'

export function ReportContent(props) {
  let [fontsLoaded] = useNunitoFonts()

  return (
    <View style={[styles.contentView]}>
      <Profile
        name={props.User.Name}
        Rank={convertRank(props.User.Rank)}
        role={props.User.Role}
        size={43}
        source={{ uri: props.User.pic || dftPic }}
      />
      <View style={styles.flexRow}>
        <Paragraph style={styles.paragraph}>{props.Content}</Paragraph>
      </View>
      <View style={styles.contView}>
        <View style={styles.seqView}>
          {props.ReportingSystem[0] &&
            props.ReportingSystem.map((reportsys) => (
              <Text style={styles.seqText}>{reportsys.Title}</Text>
            ))}
        </View>
        <View style={styles.buttonView}>
          <Button
            style={styles.endButton}
            color="white"
            onPress={props.onPress}
            labelStyle={styles.ButtonLabel}
          >
            종결하기
          </Button>
          <Button
            style={styles.upButton}
            color="white"
            onPress={() => console.log('pressed.')}
            labelStyle={styles.ButtonLabel}
          >
            상급보고
          </Button>
        </View>
      </View>
    </View>
  )
}
