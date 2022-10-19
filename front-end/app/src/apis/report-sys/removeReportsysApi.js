import URL from '../../../url'
import asyncStorage from '@react-native-async-storage/async-storage'

const removeReportsysApi = async ({ _id }) => {
  try {
    const res = await fetch(URL + '/api/reportsys', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${await asyncStorage.getItem('roksrs-token')}`,
      },
      body: JSON.stringify({ _id }),
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export default removeReportsysApi
