import URL from '../../../url'
import asyncStorage from '@react-native-async-storage/async-storage'

const addUserApi = async ({ Rank, Name, DoDID, Type }) => {
  try {
    const res = await fetch(URL + '/api/user/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${await asyncStorage.getItem('roksrs-token')}`,
      },
      body: JSON.stringify({ Rank, Name, DoDID, Type }),
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export default addUserApi
