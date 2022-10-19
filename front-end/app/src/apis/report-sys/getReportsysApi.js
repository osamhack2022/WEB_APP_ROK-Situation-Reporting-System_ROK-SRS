import URL from '../../../url'
import asyncStorage from '@react-native-async-storage/async-storage'

const getReportsysApi = async (query) => {
  const searchQuery = query ? query : ''
  console.log(URL + '/api/reportsys?search=' + searchQuery)
  try {
    const res = await fetch(URL + '/api/reportsys?search=' + searchQuery, {
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

export default getReportsysApi
