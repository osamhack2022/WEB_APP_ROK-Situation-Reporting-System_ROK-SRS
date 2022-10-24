import React, { useState, useEffect } from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { Card, Paragraph, Colors } from 'react-native-paper'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import { styles } from './style'

export function ReportListItem(props) {
  const {
    Title,
    Status,
    Content,
    Severity,
    createdAt,
    Type,
    ReportingSystem,
    Invited,
    Comments,
    User,
  } = props

  const [date, setDate] = useState('')
  useEffect(() => {
    if (createdAt) {
      setDate(
        moment(createdAt.slice(0, 10) + ' ' + createdAt.slice(11, 19)).format(
          'MM/DD hh:mm'
        )
      )
    }
  })

  let [fontsLoaded] = useNunitoFonts()
  const navigation = useNavigation()

  const goReportScreen = () => {
    navigation.navigate('ReportNavigator', {
      screen: 'ReportScreen',
      params: {
        Title,
        Status,
        Content,
        Severity,
        date,
        Type,
        ReportingSystem,
        Invited,
        Comments,
        User,
      },
    })
  }

  return (
    <TouchableOpacity
      onPress={goReportScreen}
      style={[
        styles.cardListItem,
        {
          borderColor: Status === 'Resolved' ? Colors.green600 : Colors.red300,
        },
      ]}
    >
      <Card.Content style={{ paddingBottom: 5 }}>
        <View style={styles.flexRow}>
          <Text style={styles.title}>{Title}</Text>
          <Text
            style={[
              styles.isEnd,
              { color: Status === 'Resolved' ? 'green' : 'red' },
            ]}
          >
            {Status === 'Resolved' ? '[종결]' : '[미종결]'}
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
          <Text style={styles.severity}>{Severity}</Text>
          <Text style={styles.date}>{date && date}</Text>
        </View>
      </Card.Content>
    </TouchableOpacity>
  )
}
