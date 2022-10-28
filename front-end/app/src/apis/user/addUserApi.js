import Constants from 'expo-constants'
import asyncStorage from '@react-native-async-storage/async-storage'

const addUserApi = async ({ Rank, Name, DoDID, Type, Unit }) => {
  try {
    const res = await fetch(
      Constants.manifest.extra.appPublicBackendRoot + 'api/user/add',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${await asyncStorage.getItem('roksrs-token')}`,
        },
        body: JSON.stringify({ Rank, Name, DoDID, Type }),
        user: JSON.stringify({ Unit }),
      }
    )
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export default addUserApi
