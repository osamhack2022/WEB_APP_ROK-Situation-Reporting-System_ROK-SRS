import URL from '../../../url'
import asyncStorage from '@react-native-async-storage/async-storage'

const getReportApi = async () => {
  try {
    const res = await fetch(URL + '/api/report', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${await asyncStorage.getItem('roksrs-token')}`,
      },
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export default getReportApi
