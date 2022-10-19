import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { Card, Paragraph, Colors } from 'react-native-paper'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import { useNavigation } from '@react-navigation/native'
import { styles } from './style'

export function ReportListItem(props) {
  const { Title, isEnd, Content, severity, date, Type } = props
  console.log(props)

  let [fontsLoaded] = useNunitoFonts()

  const navigation = useNavigation()

  const goReportScreen = () => {
    navigation.navigate('ReportNavigator', {
      screen: 'ReportScreen',
      params: {
        Title,
        isEnd,
        Content,
        severity,
        date,
        Type,
      },
    })
  }

  return (
    <TouchableOpacity
      onPress={goReportScreen}
      style={[
        styles.cardListItem,
        { borderColor: isEnd ? Colors.green600 : Colors.red300 },
      ]}
    >
      <Card.Content style={{ paddingBottom: 5 }}>
        <View style={styles.flexRow}>
          <Text style={styles.title}>{Title}</Text>
          <Text style={[styles.isEnd, { color: isEnd ? 'green' : 'red' }]}>
            {isEnd ? '[종결]' : '[미종결]'}
          </Text>
        </View>
        <Paragraph
          style={styles.paragraph}
          numberOfLines={4}
          ellipsizeMode="tail"
        >
          {Content}
        </Paragraph>
        <View style={styles.flexRowEnd}>
          <Text style={styles.severityText}>중요도:</Text>
          <Text style={styles.severity}>{severity}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </Card.Content>
    </TouchableOpacity>
  )
}
