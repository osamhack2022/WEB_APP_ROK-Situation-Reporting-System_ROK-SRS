import { StyleSheet } from 'react-native'
import { window } from '../../constants/layout'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  guideTextView: {
    marginBottom: (30 / 812) * window.height,
    width: '100%',
    alignItems: 'flex-end',
  },
  signUpView: {
    width: '85%',
    alignItems: 'center',
  },
  signUpTextInput: {
    width: '100%',
    backgroundColor: 'white',
  },
})
