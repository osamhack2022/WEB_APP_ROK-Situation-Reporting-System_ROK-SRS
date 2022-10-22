import { Text } from 'react-native'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import { styles } from './style'

export function GuideText(props) {
  let [fontsLoaded] = useNunitoFonts()

  return <Text style={styles.guideText}>{props.guideText}</Text>
}
