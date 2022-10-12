import URL from '../../url'

const addUserApi = ({ rank, name, dodId, isAdmin }) => {
  fetch(URL + '/api/user/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rank, name, dodId, isAdmin }),
  })
    .then((res) => res.json())
    .catch((error) => console.error(error))
}

export default addUserApi
