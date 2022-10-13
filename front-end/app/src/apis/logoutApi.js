import URL from '../../url'
import asyncStorage from '@react-native-async-storage/async-storage'

const logoutApi = async () => {
  console.log(await asyncStorage.getItem('roksrs-token'))
  await asyncStorage.removeItem('roksrs-token')
  console.log(await asyncStorage.getItem('roksrs-token'))
}

export default logoutApi
