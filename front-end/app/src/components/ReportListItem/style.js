import { StyleSheet } from 'react-native'
import { Colors } from 'react-native-paper'

export const styles = StyleSheet.create({
  cardListItem: {
    width: '96%',
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 2,
    paddingVertical: 3,
    marginVertical: 4,
  },
  title: {
    fontSize: 18,
    fontFamily: 'NunitoSans_600SemiBold',
    paddingVertical: 4,
  },
  paragraph: {
    fontSize: 13,
    fontFamily: 'NunitoSans_400Regular',
    color: Colors.grey800,
    flex: 1,
    flexWrap: 'wrap',
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
  isEnd: {
    fontSize: 17,
    marginLeft: 5,
    fontFamily: 'NunitoSans_600SemiBold',
  },
  severityText: {
    fontSize: 13,
    fontFamily: 'NunitoSans_300Light',
    marginRight: 3,
  },
  severity: {
    fontSize: 13,
    fontFamily: 'NunitoSans_600SemiBold',
    color: 'red',
  },
  date: {
    fontSize: 12,
    fontFamily: 'NunitoSans_300Light',
    marginLeft: 10,
  },
})
