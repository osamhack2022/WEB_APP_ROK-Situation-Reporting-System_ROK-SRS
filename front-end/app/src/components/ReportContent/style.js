import { StyleSheet } from 'react-native'
import { Colors } from 'react-native-paper'

export const styles = StyleSheet.create({
  contentView: {
    width: '98%',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: Colors.grey400,
    padding: 10,
    backgroundColor: Colors.white,
    marginBottom: 10,
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
  flexRow: {
    flexDirection: 'row',
  },
  paragraph: {
    width: '100%',
    marginTop: 5,
    fontFamily: 'NunitoSans_400Regular',
    fontSize: 13,
    flex: 1,
    flexWrap: 'wrap',
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
    paddingTop: 2,
    fontFamily: 'NunitoSans_400Regular',
    fontSize: 12,
    color: Colors.grey800,
  },
  buttonView: {
    marginTop: 10,
    marginRight: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  endButton: {
    backgroundColor: Colors.green600,
    borderRadius: 5,
    marginRight: 5,
    elevation: 3,
  },
  ButtonLabel: {
    fontSize: 13,
    fontFamily: 'NunitoSans_700Bold',
  },
  upButton: {
    backgroundColor: Colors.red600,
    borderRadius: 5,
    elevation: 3,
  },
})
