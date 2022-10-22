import URL from '../../url'
import asyncStorage from '@react-native-async-storage/async-storage'

const fetchChatApi = async () => {
  try {
    const res = await fetch(URL + '/api/chat', {
      headers: {
        Authorization: `Bearer ${await asyncStorage.getItem('roksrs-token')}`,
      },
    })
    console.log(res.status)
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export default fetchChatApi
