import { StyleSheet } from 'react-native'
import { Colors } from 'react-native-paper'

export const styles = StyleSheet.create({
  cardListItem: {
    width: '97%',
    borderColor: Colors.grey400,
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginTop: 8,
    borderRadius: 5,
    paddingVertical: 3,
  },
  title: {
    fontSize: 17,
    fontFamily: 'NunitoSans_600SemiBold',
  },
  paragraph: {
    fontSize: 14,
    fontFamily: 'NunitoSans_400Regular',
    color: Colors.grey700,
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
    marginLeft: 3,
    color: 'red',
    fontFamily: 'NunitoSans_600SemiBold',
  },
  footer: {
    fontSize: 13,
    fontFamily: 'NunitoSans_300Light',
  },
})
