import { StyleSheet } from 'react-native'
import { Colors } from 'react-native-paper'

export const styles = StyleSheet.create({
  view: {
    borderRadius: 6,
    alignItems: 'center',
    paddingVertical: 3,
    width: 75,
    marginBottom: 2,
    backgroundColor: Colors.grey200,
    elevation: 3,
  },
  image: {
    marginBottom: 5,
  },
  text: {
    fontFamily: 'NunitoSans_400Regular',
    fontSize: 12,
  },
})
