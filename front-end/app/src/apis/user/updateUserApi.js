import Constants from 'expo-constants'
import asyncStorage from '@react-native-async-storage/async-storage'

const updateUserApi = async ({ Rank, Name, email, milNumber, Number }) => {
  try {
    const res = await fetch(
      Constants.manifest.extra.appPublicBackendRoot + 'api/user',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await asyncStorage.getItem('roksrs-token')}`,
        },
        body: JSON.stringify({ Rank, Name, email, milNumber, Number }),
      }
    )
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export default updateUserApi
