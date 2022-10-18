import URL from '../../../url'
import asyncStorage from '@react-native-async-storage/async-storage'

const updateUnitLogoApi = async ({ Logo }) => {
  try {
    const res = await fetch(URL + '/api/unit/logo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await asyncStorage.getItem('roksrs-token')}`,
      },
      body: JSON.stringify({ Logo }),
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export default updateUnitLogoApi
