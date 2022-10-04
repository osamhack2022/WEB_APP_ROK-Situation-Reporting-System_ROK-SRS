import { View, Text } from 'react-native'
import { Avatar, Paragraph, Button } from 'react-native-paper'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import { styles } from './style'

const text =
  '충성! 당직사령님, 사복을 입은 거수자가 나타났습니다.\n무기를 소지한 것 같지는 않고, 위병소 앞에서 두리번 거리고 있습니다.\n현재 경계 중이며, 특이사항 발생 시 보고드리겠습니다.'

export function ReportCard() {
  let [fontsLoaded] = useNunitoFonts()

  return (
    <View style={styles.contentView}>
      <View style={styles.avatarView}>
        <Avatar.Image
          source={require('../../assets/images/avatar.png')}
          size={50}
        />
        <View style={styles.nameView}>
          <Text style={styles.name}>병장 김형민</Text>
          <Text style={styles.position}>본부중대 통신</Text>
        </View>
      </View>
      <Paragraph style={styles.paragraph}>{text}</Paragraph>
      <View style={styles.contView}>
        <View style={styles.seqView}>
          <Text
            style={styles.seqText}
          >{`보고체계: 본부중대\n보고순서: 분대장 -> 소대장 -> 중대장`}</Text>
        </View>
        <View style={styles.buttonView}>
          <Button
            style={styles.endButton}
            color="white"
            onPress={() => console.log('pressed.')}
          >
            종결하기
          </Button>
          <Button
            style={styles.upButton}
            color="white"
            onPress={() => console.log('pressed.')}
          >
            상급보고
          </Button>
        </View>
      </View>
    </View>
  )
}
