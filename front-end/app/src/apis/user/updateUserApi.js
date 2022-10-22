import URL from '../../../url'
import asyncStorage from '@react-native-async-storage/async-storage'

const updateUserApi = async ({ Rank, Name, email, milNumber, Number }) => {
  try {
    const res = await fetch(URL + '/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await asyncStorage.getItem('roksrs-token')}`,
      },
      body: JSON.stringify({ Rank, Name, email, milNumber, Number }),
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export default updateUserApi
