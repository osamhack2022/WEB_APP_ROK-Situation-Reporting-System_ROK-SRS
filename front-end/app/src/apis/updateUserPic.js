import URL from '../../url'
import asyncStorage from '@react-native-async-storage/async-storage'

const updateUserPicApi = async ({ pic }) => {
  try {
    const res = await fetch(URL + '/api/user/pic', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await asyncStorage.getItem('roksrs-token')}`,
      },
      body: JSON.stringify({ pic }),
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export default updateUserPicApi
