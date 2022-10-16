import { StyleSheet } from 'react-native'
import { Colors } from 'react-native-paper'

export const styles = StyleSheet.create({
  contentView: {
    width: '95%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.grey400,
    paddingTop: 10,
    paddingBottom: 10,
  },
  avatarView: {
    width: '100%',
    flexDirection: 'row',
  },
  nameView: { marginLeft: 8, marginTop: 5 },
  name: { fontSize: 16, fontFamily: 'NunitoSans_700Bold' },
  position: {
    fontSize: 12,
    fontFamily: 'NunitoSans_300Light',
    color: Colors.grey900,
  },
  paragraph: {
    width: '100%',
    marginTop: 5,
    fontFamily: 'NunitoSans_400Regular',
    fontSize: 13,
  },
  contView: {
    width: '100%',
    flexDirection: 'row',
  },
  seqView: {
    flex: 1,
    alignItems: 'flex-start',
    marginTop: 10,
  },
  seqText: {
    marginTop: 5,
    fontFamily: 'NunitoSans_SemiBold',
    fontSize: 11,
    color: Colors.grey800,
  },
  buttonView: {
    marginTop: 10,
    marginRight: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  endButton: {
    backgroundColor: Colors.green600,
    borderRadius: 8,
    marginRight: 5,
    fontSize: 13,
  },
  upButton: {
    backgroundColor: Colors.red600,
    borderRadius: 8,
  },
})
