import { View, Text } from 'react-native'
import { Paragraph, Button } from 'react-native-paper'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import { Profile } from '../Profile'
import { styles } from './style'

export function ReportContent(props) {
  let [fontsLoaded] = useNunitoFonts()

  return (
    <View style={[styles.contentView]}>
      <Profile
        name={props.Name}
        Rank={props.Rank}
        position={props.position ? props.position : '본부중대 통신'}
        size={43}
        src={props.pic ? props.pic : require('../../assets/images/avatar.png')}
      />
      <View style={styles.flexRow}>
        <Paragraph style={styles.paragraph}>{props.Content}</Paragraph>
      </View>
      <View style={styles.contView}>
        <View style={styles.seqView}>
          <Text style={styles.seqText}>{props.ReportingSystem.Title}</Text>
          <Text style={styles.seqText}>{props.Invited}</Text>
        </View>
        <View style={styles.buttonView}>
          <Button
            style={styles.endButton}
            color="white"
            onPress={() => console.log('pressed.')}
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
