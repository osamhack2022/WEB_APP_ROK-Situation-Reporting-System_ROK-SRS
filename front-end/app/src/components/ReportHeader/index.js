import { View } from 'react-native'
import { Text, Title } from 'react-native-paper'
import { styles } from './style'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import moment from 'moment'

export function ReportHeader() {
  let [fontsLoaded] = useNunitoFonts()

  return (
    <View style={styles.header}>
      <View style={styles.titleView}>
        <Title style={styles.title}>3초소 거수자 발견</Title>
        <Text style={styles.text}>{'[미종결]'}</Text>
      </View>
      <View style={styles.subView}>
        <Text style={styles.severityText}>중요도:</Text>
        <Text style={styles.rank}>{3}</Text>
        <Text style={styles.dateText}>
          {moment().subtract(6, 'days').format('YYYY-MM-DD hh:mm')}
        </Text>
      </View>
    </View>
  )
}
