import Constants from 'expo-constants'
import asyncStorage from '@react-native-async-storage/async-storage'

const updateUnitApi = async ({ Unitname, Unitslogan }) => {
  try {
    const res = await fetch(
      Constants.manifest.extra.appPublicBackendRoot + 'api/unit/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await asyncStorage.getItem('roksrs-token')}`,
        },
        body: JSON.stringify({ Unitname, Unitslogan }),
      }
    )
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export default updateUnitApi
