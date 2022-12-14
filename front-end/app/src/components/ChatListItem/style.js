import { StyleSheet } from 'react-native'
import { Colors } from 'react-native-paper'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignSelf: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderColor: Colors.grey200,
    borderBottomWidth: 1,
  },
  leftContainer: {
    flexDirection: 'row',
  },
  midContainer: {
    justifyContent: 'space-around',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 15,
    marginRight: 13,
  },
  username: {
    fontSize: 14,
    fontFamily: 'NunitoSans_600SemiBold',
  },
  lastMessage: {
    fontFamily: 'NunitoSans_400Regular',
    fontSize: 12,
    color: Colors.grey500,
  },
  time: {
    fontFamily: 'NunitoSans_400Regular',
    fontSize: 11,
    marginRight: 5,
    color: Colors.grey500,
  },
})

export default styles
