import { StyleSheet } from 'react-native'
import { Colors } from 'react-native-paper'

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  view: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.grey800,
    alignItems: 'center',
    padding: 4,
  },
  image: {
    marginBottom: 5,
  },
  itemText: {
    fontFamily: 'NunitoSans_400Regular',
    fontSize: 12,
    marginBottom: 5,
  },
  text: {
    fontFamily: 'NunitoSans_300Light',
    color: Colors.grey800,
    fontSize: 12,
    marginBottom: 10,
  },
})
