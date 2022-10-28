import asyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'

const getReportApi = async () => {
  try {
    const res = await fetch(
      Constants.manifest.extra.appPublicBackendRoot + 'api/report',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${await asyncStorage.getItem('roksrs-token')}`,
        },
      }
    )
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export default getReportApi
