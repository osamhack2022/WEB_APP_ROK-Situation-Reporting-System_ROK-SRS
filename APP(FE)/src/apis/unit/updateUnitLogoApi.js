import Constants from 'expo-constants'
import asyncStorage from '@react-native-async-storage/async-storage'

const updateUnitLogoApi = async ({ Logo, Unit }) => {
  console.log(Logo, Unit)
  try {
    const res = await fetch(
      Constants.manifest.extra.appPublicBackendRoot + 'api/unit/logo',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await asyncStorage.getItem('roksrs-token')}`,
        },
        body: JSON.stringify({ Logo }),
        user: JSON.stringify({ Unit }),
      }
    )
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export default updateUnitLogoApi
