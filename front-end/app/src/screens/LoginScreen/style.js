import { StyleSheet } from 'react-native'
import { window } from '../../constants/layout'
import { Colors } from 'react-native-paper'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: (105 / 812) * window.height,
  },
  logoView: {
    alignItems: 'center',
    marginBottom: (35 / 812) * window.height,
    marginRight: 20,
  },
  logoImage: {
    width: (280 / 375) * window.width,
    height: (110 / 280) * ((280 / 375) * window.width),
  },
  loginView: {
    width: '80%',
    alignItems: 'center',
  },
  loginTextInput: {
    width: '100%',
    backgroundColor: 'white',
  },
  guideTextView: {
    marginBottom: (40 / 812) * window.height,
    width: '100%',
    alignItems: 'flex-end',
  },
  loginButtonView: {
    width: (275 / 375) * window.width,
    height: (55 / 812) * window.height,
    borderRadius: 5,
    backgroundColor: '#008275',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: (30 / 812) * window.height,
    elevation: 10,
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
  LoginText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'NunitoSans_600SemiBold',
  },
  signUpText: {
    fontSize: 15,
    fontFamily: 'NunitoSans_400Regular',
    color: '#006255',
  },
  signUpView: {
    marginBottom: (20 / 812) * window.height,
    flexDirection: 'row',
  },
})
