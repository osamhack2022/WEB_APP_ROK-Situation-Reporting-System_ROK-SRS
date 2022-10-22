import { StyleSheet } from 'react-native'
import { Colors } from 'react-native-paper'

export const styles = StyleSheet.create({
  view: {
    borderRadius: 6,
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 3,
    width: 70,
    marginBottom: 2,
    backgroundColor: Colors.grey200,
    elevation: 3,
  },
  image: {
    marginBottom: 5,
    backgroundColor: Colors.green400,
  },
  title: {
    fontSize: 12,
    fontFamily: 'NunitoSans_700Bold',
  },
  text: {
    fontFamily: 'NunitoSans_400Regular',
    fontSize: 11,
  },
})
