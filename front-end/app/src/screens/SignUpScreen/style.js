import { StyleSheet } from 'react-native'
import { window } from '../../constants/layout'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  signUpView: {
    width: '85%',
    alignItems: 'center',
  },
  signUpTextInput: {
    width: '100%',
    marginBottom: (30 / 812) * window.height,
    backgroundColor: 'white',
  },
})
