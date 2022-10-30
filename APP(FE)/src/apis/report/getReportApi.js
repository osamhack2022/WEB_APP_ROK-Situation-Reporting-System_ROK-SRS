import asyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'

const getReportApi = async ({ sender, receiver }) => {
  const endpoint = sender
    ? `api/report?sender=${sender}`
    : `api/report?receiver=${receiver}`
  try {
    const res = await fetch(
      Constants.manifest.extra.appPublicBackendRoot + endpoint,
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
    // console.log(error)
  }
}

export default getReportApi
