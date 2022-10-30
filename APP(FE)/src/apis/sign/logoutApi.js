import asyncStorage from '@react-native-async-storage/async-storage'

const logoutApi = async () => {
  await asyncStorage.removeItem('roksrs-token')
}

export default logoutApi
