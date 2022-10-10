import { Text } from 'react-native'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import { styles } from './style'

export function GuideText({ guideText }) {
  let [fontsLoaded] = useNunitoFonts()

  return <Text style={styles.guideText}>{guideText}</Text>
}
