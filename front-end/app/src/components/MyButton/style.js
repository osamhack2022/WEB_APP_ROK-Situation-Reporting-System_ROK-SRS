import { StyleSheet } from 'react-native'
import { window } from '../../constants/layout'

export const styles = StyleSheet.create({
  view: {
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
    alignSelf: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'NunitoSans_600SemiBold',
  },
})
