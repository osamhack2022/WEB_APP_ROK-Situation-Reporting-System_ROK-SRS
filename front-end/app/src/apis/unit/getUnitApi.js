import Constants from 'expo-constants'
import asyncStorage from '@react-native-async-storage/async-storage'

const getUnitApi = async ({ unitid }) => {
  try {
    console.log('adfjasd;fjasdf;sdfj', unitid)
    const res = await fetch(
      Constants.manifest.extra.appPublicBackendRoot +
        'api/unit/get?search=' +
        unitid,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await asyncStorage.getItem('roksrs-token')}`,
        },
      }
    )
    console.log('unit', await res.json())
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export default getUnitApi
