import { StyleSheet } from 'react-native'
import { Colors } from 'react-native-paper'

export const styles = StyleSheet.create({
  cardListItem: {
    width: '95%',
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey400,
    marginTop: 3,
    paddingBottom: 3,
  },
  title: {
    fontSize: 18,
    fontFamily: 'NunitoSans_600SemiBold',
  },
  paragraph: {
    fontSize: 14,
    fontFamily: 'NunitoSans_400Regular',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRowEnd: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 3,
  },
  text: {
    fontSize: 15,
    marginLeft: 3,
    color: 'red',
    fontFamily: 'NunitoSans_600SemiBold',
  },
  footer: {
    fontSize: 13,
    fontFamily: 'NunitoSans_300Light',
  },
})
