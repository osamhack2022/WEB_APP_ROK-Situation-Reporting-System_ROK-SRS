import URL from '../../../url'
import asyncStorage from '@react-native-async-storage/async-storage'

const addCommentApi = async ({ Type, Content, Title, _id }) => {
  try {
    const res = await fetch(URL + '/api/comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${await asyncStorage.getItem('roksrs-token')}`,
      },
      body: JSON.stringify({
        Type: Type,
        Content: Content,
        Title: Title,
      }),
      user: JSON.stringify({
        _id: _id,
      }),
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export default addCommentApi
