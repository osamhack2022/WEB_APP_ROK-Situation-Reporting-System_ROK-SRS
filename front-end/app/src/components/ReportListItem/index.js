import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import { styles } from './style'

export function ReportListItem() {
  let [fontsLoaded] = useNunitoFonts()

  const navigation = useNavigation()

  const goReportScreen = ({ title, finished, content, importance }) => {
    navigation.navigate('ReportScreen')
  }

  return (
    <TouchableOpacity onPress={goReportScreen}>
      <View style={styles.cardListItem}>
        <Card.Content style={{ paddingBottom: 5 }}>
          <View style={styles.flexRow}>
            <Title style={styles.title}>3초소 거수자 발견</Title>
            <Text style={styles.text}>{'[미종결]'}</Text>
          </View>
          <Paragraph
            style={styles.paragraph}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            충성! 당직사령님. 3초소에 사복을 입은 거수자가 나타났습니다. 무기를
            소지한 것 같지는 않고 위병소 앞에서 두리번 거리고 있습니다. 현재
            경계중이며, 추가사항 발생시 보고드리겠습니다.
          </Paragraph>
          <View style={styles.flexRowEnd}>
            <Text style={[styles.footer, { marginRight: 3 }]}>중요도:</Text>
            <Text
              style={[
                styles.footer,
                { color: 'red', fontFamily: 'NunitoSans_600SemiBold' },
              ]}
            >
              {3}
            </Text>
            <Text style={[styles.footer, { marginLeft: 10 }]}>
              {moment().subtract(6, 'days').format('YYYY-MM-DD hh:mm')}
            </Text>
          </View>
        </Card.Content>
      </View>
    </TouchableOpacity>
  )
}
