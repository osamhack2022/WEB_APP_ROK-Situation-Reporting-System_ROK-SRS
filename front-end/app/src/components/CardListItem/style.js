import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  cardListItem: {
    width: '95%',
    elevation: 0,
    borderBottomWidth: 1,
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
    marginTop: 5,
  },
  text: {
    fontSize: 15,
    marginLeft: 5,
    color: 'red',
    fontFamily: 'NunitoSans_600SemiBold',
  },
  footer: {
    fontSize: 13,
    fontFamily: 'NunitoSans_300Light',
  },
})
