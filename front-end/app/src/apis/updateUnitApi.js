import URL from '../../url'
import asyncStorage from '@react-native-async-storage/async-storage'

const updateUnitApi = async ({ Unitname, Unitslogan }) => {
  try {
    const res = await fetch(URL + '/api/unit/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await asyncStorage.getItem('roksrs-token')}`,
      },
      body: JSON.stringify({ Unitname, Unitslogan }),
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export default updateUnitApi
