import { StyleSheet } from 'react-native'
import { Colors } from 'react-native-paper'
import { window } from '../../constants/layout'

export const styles = StyleSheet.create({
  pressable: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: window.height * 0.03,
  },
  image: {
    width: 0.8 * window.width,
    height: 0.8 * window.width,
    backgroundColor: Colors.grey300,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.grey500,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: Colors.grey700,
  },
})
