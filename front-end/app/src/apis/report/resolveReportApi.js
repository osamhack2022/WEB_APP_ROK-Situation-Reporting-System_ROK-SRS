import asyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'

const resolveReportApi = async ({ reportId }) => {
  try {
    console
    const res = await fetch(
      Constants.manifest.extra.appPublicBackendRoot + 'api/report',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${await asyncStorage.getItem('roksrs-token')}`,
        },
        body: JSON.stringify({ reportId }),
      }
    )
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export default resolveReportApi
