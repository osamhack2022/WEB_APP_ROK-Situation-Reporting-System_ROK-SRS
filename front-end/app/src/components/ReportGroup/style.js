import { StyleSheet } from 'react-native'
import { Colors } from 'react-native-paper'

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  view: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: Colors.grey800,
    alignItems: 'center',
    paddingVertical: 4,
    width: 70,
    marginVertical: 5,
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
    color: Colors.grey600,
    fontSize: 13,
    marginBottom: 14,
  },
})
