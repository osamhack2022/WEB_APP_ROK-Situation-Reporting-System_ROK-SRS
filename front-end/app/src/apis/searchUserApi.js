import URL from '../../url'
import asyncStorage from '@react-native-async-storage/async-storage'

const searchUserApi = async (query) => {
  const searchQuery = query ? query : ''
  console.log(URL + '/api/user?search=' + searchQuery)
  try {
    const res = await fetch(URL + '/api/user?search=' + searchQuery, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await asyncStorage.getItem('roksrs-token')}`,
      },
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export default searchUserApi
