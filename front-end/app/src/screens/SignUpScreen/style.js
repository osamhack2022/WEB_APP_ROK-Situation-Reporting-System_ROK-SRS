import { StyleSheet } from 'react-native'
import { window } from '../../constants/layout'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    width: '100%',
    alignItems: 'center',
  },
  guideTextView: {
    marginBottom: (15 / 812) * window.height,
    width: '100%',
    alignItems: 'flex-end',
  },
  signUpView: {
    width: '85%',
  },
  signUpTextInput: {
    width: '100%',
    backgroundColor: 'white',
  },
  signUpButtonView: {
    width: (275 / 375) * window.width,
    height: (55 / 812) * window.height,
    borderRadius: 5,
    backgroundColor: '#008275',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: (150 / 812) * window.height,
    elevation: 10,
    shadowOpacity: 0.5,
    shadowRadius: 1,
    marginTop: 15,
  },
  signUpText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'NunitoSans_600SemiBold',
  },
})
