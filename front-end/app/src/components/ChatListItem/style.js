import { StyleSheet } from 'react-native'
import { Colors } from 'react-native-paper'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: 10,
    borderColor: Colors.grey200,
    borderBottomWidth: 1,
  },
  lefContainer: {
    flexDirection: 'row',
  },
  midContainer: {
    justifyContent: 'space-around',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 15,
    marginRight: 15,
  },
  username: {
    fontSize: 15,
    fontFamily: 'NunitoSans_600SemiBold',
  },
  lastMessage: {
    fontFamily: 'NunitoSans_400Regular',
    fontSize: 13,
    color: 'grey',
  },
  time: {
    fontFamily: 'NunitoSans_400Regular',
    fontSize: 11,
    color: 'grey',
  },
})

export default styles
