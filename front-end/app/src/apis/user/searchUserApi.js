import URL from '../../../url'
import asyncStorage from '@react-native-async-storage/async-storage'

const searchUserApi = async ({ query, index }) => {
  const reqUrl = query
    ? URL + `/api/user?search=${query}`
    : URL + `/api/user?index=${index}`
  console.log(reqUrl)
  try {
    const res = await fetch(reqUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await asyncStorage.getItem('roksrs-token')}`,
      },
    })
    return res.json()
  } catch (error) {
    // console.log(error)
  }
}

export default searchUserApi
