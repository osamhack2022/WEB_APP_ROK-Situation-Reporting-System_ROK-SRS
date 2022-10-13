import URL from '../../url'
import asyncStorage from '@react-native-async-storage/async-storage'

const addUserApi = async ({ Rank, Name, DoDID, Type }) => {
  fetch(URL + '/api/user/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${await asyncStorage.getItem('roksrs-token')}`,
    },
    body: JSON.stringify({ Rank, Name, DoDID, Type }),
  })
    .then((res) => res.json())
    .catch((error) => console.error(error))
}

export default addUserApi
