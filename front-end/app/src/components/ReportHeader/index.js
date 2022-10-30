import { View } from 'react-native'
import { Text, Colors } from 'react-native-paper'
import { styles } from './style'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import { matchSeverityColor } from '../../helperfunctions/matchSeverityColor'

export function ReportHeader(props) {
  let [fontsLoaded] = useNunitoFonts()
  let { Status, Title, Severity, date, Type } = props
  Status = Status === 'Resolved' ? '[종결]' : '[미종결]'
  const statusColor = Status === '[종결]' ? Colors.green700 : Colors.red600
  const typeColor =
    Type === '보고사항'
      ? Colors.green700
      : Type === '지시시항'
      ? Colors.amber700
      : Colors.red700
  return (
    <View style={styles.header}>
      <View style={styles.titleView}>
        <Text style={styles.title}>{Title}</Text>
        <Text style={[styles.status, { color: statusColor }]}>{Status}</Text>
      </View>
      <View style={styles.subView}>
        <Text style={styles.severityText}>종류:</Text>
        <Text style={[styles.severity, { color: typeColor, marginRight: 8 }]}>
          {Type}
        </Text>
        <Text style={styles.severityText}>중요도:</Text>
        <Text
          style={[styles.severity, { color: matchSeverityColor(Severity) }]}
        >
          {Severity}
        </Text>
        <Text style={styles.dateText}>{date}</Text>
      </View>
    </View>
  )
}
