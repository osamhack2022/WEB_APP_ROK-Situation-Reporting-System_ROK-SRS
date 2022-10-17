import { View, Text } from 'react-native'
import { Paragraph, Button } from 'react-native-paper'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import { Profile } from '../Profile'
import { styles } from './style'

export function ReportContent({ Content, Type }) {
  let [fontsLoaded] = useNunitoFonts()

  return (
    <View style={[styles.contentView]}>
      <Profile
        name="병장 김형민"
        position="본부중대 통신"
        size={43}
        src={require('../../assets/images/avatar.png')}
      />
      <View style={styles.flexRow}>
        <Paragraph style={styles.paragraph}>{Content}</Paragraph>
      </View>
      <View style={styles.contView}>
        <View style={styles.seqView}>
          <Text
            style={styles.seqText}
          >{`체계: 본부중대\n순서: 분대장 -> 소대장 -> 중대장`}</Text>
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
