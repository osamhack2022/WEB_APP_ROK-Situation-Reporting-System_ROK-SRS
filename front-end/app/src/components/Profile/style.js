import { StyleSheet } from 'react-native'
import { Colors } from 'react-native-paper'

export const styles = StyleSheet.create({
  avatarView: {
    flex: 1,
    flexDirection: 'row',
  },
  nameView: { marginLeft: 6, flex: 1, justifyContent: 'center' },
  name: {
    fontSize: 13,
    fontFamily: 'NunitoSans_700Bold',
  },
  avatarImg: {
    backgroundColor: Colors.grey400,
  },
  position: {
    fontSize: 11,
    fontFamily: 'NunitoSans_300Light',
    color: Colors.grey900,
  },
  dateView: { alignItems: 'flex-end', flex: 1, marginRight: 10 },
  dateText: {
    fontFamily: 'NunitoSans_300Light',
    fontSize: 11,
  },
})
