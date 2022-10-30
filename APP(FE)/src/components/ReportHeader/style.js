import { StyleSheet } from 'react-native'
import { Colors } from 'react-native-paper'

export const styles = StyleSheet.create({
  header: {
    width: '95%',
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  left: {
    backgroundColor: Colors.white,
    position: 'absolute',
    left: -15,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: 'NunitoSans_600SemiBold',
  },
  status: {
    fontSize: 19,
    marginLeft: 5,
  },
  severity: {
    fontSize: 13,
    color: Colors.red600,
    fontFamily: 'NunitoSans_600SemiBold',
  },
  subView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 5,
    marginRight: 15,
  },
  severityText: {
    fontSize: 13,
    fontFamily: 'NunitoSans_600SemiBold',
    marginRight: 3,
  },
  dateText: {
    fontSize: 12,
    fontFamily: 'NunitoSans_300Light',
    marginHorizontal: 10,
    alignSelf: 'center',
  },
})
