import Constants from 'expo-constants'
import asyncStorage from '@react-native-async-storage/async-storage'

const removeReportsysApi = async ({ _id, Unit }) => {
  try {
    const res = await fetch(
      Constants.manifest.extra.appPublicBackendRoot + 'api/reportsys',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${await asyncStorage.getItem('roksrs-token')}`,
        },
        body: JSON.stringify({ _id }),
        user: JSON.stringify({ Unit }),
      }
    )
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export default removeReportsysApi
