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
    paddingVertical: 4,
    fontFamily: 'NunitoSans_400Regular',
  },
  paragraph: {
    fontSize: 13,
    color: Colors.grey800,
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
  },
  severityText: {
    fontSize: 13,
    marginRight: 3,
    fontFamily: 'NunitoSans_400Regular',
  },
  severity: {
    fontSize: 13,
    color: 'red',
    fontFamily: 'NunitoSans_400Regular',
  },
  date: {
    fontSize: 12,
    marginLeft: 10,
    fontFamily: 'NunitoSans_300Light',
  },
})
