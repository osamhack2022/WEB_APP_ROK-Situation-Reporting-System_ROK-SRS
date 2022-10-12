import URL from '../../url'

const loginApi = ({ dodId, password }) => {
  fetch(URL + '/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ dodId, password }),
  })
    .then((res) => res.json())
    .catch((error) => console.error(error))
}

export default loginApi
