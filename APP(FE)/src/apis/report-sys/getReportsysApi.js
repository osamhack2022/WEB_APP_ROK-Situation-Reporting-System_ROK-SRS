import Constants from 'expo-constants'
import asyncStorage from '@react-native-async-storage/async-storage'

const getReportsysApi = async ({ query, Unit }) => {
  const searchQuery = query ? query : ''
  try {
    const res = await fetch(
      Constants.manifest.extra.appPublicBackendRoot +
        'api/reportsys?search=' +
        searchQuery,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${await asyncStorage.getItem('roksrs-token')}`,
        },
        user: { Unit },
      }
    )
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export default getReportsysApi
