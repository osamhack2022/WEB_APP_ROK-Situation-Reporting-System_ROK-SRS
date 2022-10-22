import { StyleSheet } from 'react-native'
import { Colors } from 'react-native-paper'

export const styles = StyleSheet.create({
  searchBar: {
    width: '92%',
    height: 45,
    backgroundColor: Colors.grey100,
    elevation: 4,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderBottomWidth: 1,
  },
  input: {
    fontSize: 15,
    flex: 1,
  },
})

export const borderColor = (focus) =>
  StyleSheet.create({
    borderBottomColor: focus ? '#008275' : Colors.grey400,
  })
