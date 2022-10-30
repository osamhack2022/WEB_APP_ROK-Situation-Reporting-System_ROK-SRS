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
    fontFamily: 'notoserif',
    fontSize: 13,
    flex: 1,
    flexWrap: 'wrap',
  },
  contView: {
    paddingTop: 20,

    width: '100%',
    flexDirection: 'row',
  },
  seqView: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  seqText: {
    fontFamily: 'NunitoSans_400Regular',
    fontSize: 13,
    color: Colors.grey600,
  },
  buttonView: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  endButton: {
    backgroundColor: '#3CB371',
    borderRadius: 3,
    marginRight: 5,
    elevation: 3,
  },
  ButtonLabel: {
    fontSize: 13,
    fontFamily: 'NunitoSans_700Bold',
  },
  upButton: {
    backgroundColor: '#EE4455',
    borderRadius: 3,
    elevation: 3,
  },
})
