import { StyleSheet } from 'react-native'
import { Colors } from 'react-native-paper'

export const styles = StyleSheet.create({
  header: {
    width: '95%',
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey400,
  },
  title: {
    fontSize: 20,
    fontFamily: 'NunitoSans_600SemiBold',
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    marginLeft: 5,
    color: 'red',
    fontFamily: 'NunitoSans_600SemiBold',
  },
  severity: { color: 'red', fontFamily: 'NunitoSans_600SemiBold' },
  subView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
    marginRight: 15,
    marginBottom: 5,
  },
  severityText: {
    fontSize: 13,
    fontFamily: 'NunitoSans_300Light',
    marginRight: 3,
  },
  dateText: {
    fontSize: 13,
    fontFamily: 'NunitoSans_300Light',
    marginLeft: 10,
    marginRight: 10,
  },
})
