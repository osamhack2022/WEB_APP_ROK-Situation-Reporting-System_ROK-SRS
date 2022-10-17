import { View, TouchableOpacity } from 'react-native'
import { Text, Colors, Avatar } from 'react-native-paper'
import { styles } from './style'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import { useNavigation } from '@react-navigation/native'

export function ReportHeader({ Title, isEnd, severity, date }) {
  let [fontsLoaded] = useNunitoFonts()
  const navigation = useNavigation()

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Avatar.Icon
          icon="arrow-left"
          style={styles.left}
          size={65}
          color={Colors.black}
        />
      </TouchableOpacity>
      <View style={styles.titleView}>
        <Text style={styles.title}>{Title}</Text>
        <Text
          style={[
            styles.isEnd,
            { color: isEnd ? Colors.green700 : Colors.red600 },
          ]}
        >
          {isEnd ? '[종결]' : '[미종결]'}
        </Text>
      </View>
      <View style={styles.subView}>
        <Text style={styles.severityText}>중요도:</Text>
        <Text style={styles.severity}>{severity}</Text>
        <Text style={styles.dateText}>{date}</Text>
      </View>
    </View>
  )
}
