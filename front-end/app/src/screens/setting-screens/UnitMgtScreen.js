import { SafeAreaView, StyleSheet } from 'react-native'
import { ImagePicker } from '../../components/ImagePicker'

export function UnitMgtScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ImagePicker />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
})
