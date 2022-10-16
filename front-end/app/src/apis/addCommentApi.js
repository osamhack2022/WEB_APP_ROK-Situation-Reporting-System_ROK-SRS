import URL from '../../url'
import asyncStorage from '@react-native-async-storage/async-storage'

const addCommentApi = async ({ Type, Content, Title }) => {
  try {
    const res = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${await asyncStorage.getItem('roksrs-token')}`,
      },
      body: {
        Type,
        Reportsystems,
        Additionalpeople,
        Content,
        Title,
      },
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export default addCommentApi
