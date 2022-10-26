import { StyleSheet } from 'react-native'
import { Colors } from 'react-native-paper'

export const styles = StyleSheet.create({
  contentView: {
    width: '97%',
    paddingTop: 5,
    paddingBottom: 3,
    paddingLeft: 3,
    alignSelf: 'center',
  },
  avatarView: {
    width: '100%',
    flexDirection: 'row',
  },
  nameView: { marginTop: 4 },
  name: { fontSize: 14, fontFamily: 'NunitoSans_700Bold' },
  position: {
    fontSize: 11,
    fontFamily: 'NunitoSans_300Light',
    color: Colors.grey900,
  },
  type: {
    fontSize: 13,
    marginRight: 5,
    fobtFamily: 'Roboto',
    fontWeight: '700',
  },
  paragraph: {
    fontFamily: 'Roboto',
    fontSize: 13,
  },
  dateView: { alignItems: 'flex-end', flex: 1, marginRight: 10 },
  dateText: {
    fontFamily: 'NunitoSans_300Light',
    fontSize: 11,
  },
})
