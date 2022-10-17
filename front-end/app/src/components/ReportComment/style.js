import { StyleSheet } from 'react-native'
import { Colors } from 'react-native-paper'
import { window } from '../../constants/layout'

export const styles = StyleSheet.create({
  contentView: {
    width: '95%',
    borderBottomWidth: 1,
    borderColor: Colors.grey400,
    paddingVertical: 8,
    marginLeft: window.width * 0.025,
    paddingLeft: 3,
  },
  avatarView: {
    width: '100%',
    flexDirection: 'row',
  },
  nameView: { marginLeft: 6, marginTop: 4 },
  name: { fontSize: 14, fontFamily: 'NunitoSans_700Bold' },
  position: {
    fontSize: 11,
    fontFamily: 'NunitoSans_300Light',
    color: Colors.grey900,
  },
  paragraph: {
    width: '100%',
    marginTop: 5,
    fontFamily: 'NunitoSans_400Regular',
    fontSize: 13,
  },
  dateView: { alignItems: 'flex-end', flex: 1, marginRight: 10 },
  dateText: {
    fontFamily: 'NunitoSans_300Light',
    fontSize: 11,
  },
})
