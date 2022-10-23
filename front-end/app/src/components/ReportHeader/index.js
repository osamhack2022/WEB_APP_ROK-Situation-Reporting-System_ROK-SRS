import { View } from 'react-native'
import { Text, Colors } from 'react-native-paper'
import { styles } from './style'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'

export function ReportHeader(props) {
  let [fontsLoaded] = useNunitoFonts()
  let { Status, Title, Severity, date } = props
  Status = Status === 'Resolved' ? '[종결]' : '[미종결]'
  const StatusColor = Status === '[종결]' ? Colors.green700 : Colors.red600
  return (
    <View style={styles.header}>
      <View style={styles.titleView}>
        <Text style={styles.title}>{Title}</Text>
        <Text style={[styles.status, { color: StatusColor }]}>{Status}</Text>
      </View>
      <View style={styles.subView}>
        <Text style={styles.severityText}>중요도:</Text>
        <Text style={styles.severity}>{Severity}</Text>
        <Text style={styles.dateText}>{date}</Text>
      </View>
    </View>
  )
}
