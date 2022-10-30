import asyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'

const addCommentApi = async ({ Type, Content, Title, _id }) => {
  try {
    const res = await fetch(
      Constants.manifest.extra.appPublicBackendRoot + 'api/comment',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${await asyncStorage.getItem('roksrs-token')}`,
        },
        body: JSON.stringify({ Type, Content, Title }),
        user: JSON.stringify({ _id }),
      }
    )
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export default addCommentApi
