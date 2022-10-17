import { StyleSheet } from 'react-native'
import { Colors } from 'react-native-paper'

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  view: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: Colors.grey700,
    alignItems: 'center',
    paddingVertical: 3,
    width: 75,
    marginBottom: 2,
  },
  image: {
    marginBottom: 5,
  },
  itemText: {
    fontFamily: 'NunitoSans_400Regular',
    fontSize: 12,
  },
  text: {
    fontFamily: 'NunitoSans_300Light',
    color: Colors.grey700,
    fontSize: 13,
    paddingTop: 1,
    marginBottom: 10,
  },
})
