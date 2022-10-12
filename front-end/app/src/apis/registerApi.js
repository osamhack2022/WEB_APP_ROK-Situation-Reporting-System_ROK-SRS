import URL from '../../url'

const registerApi = (userData) => {
  fetch(URL + '/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then((res) => res.json())
    .catch((error) => console.error(error))
}

export default registerApi
