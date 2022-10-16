import URL from '../../url'
import asyncStorage from '@react-native-async-storage/async-storage'

const updateUnitApi = async ({ Unitname, Unitslogan, Logo }) => {
  try {
    const res = await fetch(URL + '/api/unit/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await asyncStorage.getItem('roksrs-token')}`,
      },
      body: JSON.stringify({ Unitname, Unitslogan, Logo }),
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export default updateUnitApi
