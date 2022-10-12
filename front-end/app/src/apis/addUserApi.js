import URL from '../../url'

const addUserApi = ({ Rank, Name, DoDID, Type }) => {
  fetch(URL + '/api/user/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('roksrs-token')}`,
    },
    body: JSON.stringify({ Rank, Name, DoDID, Type }),
  })
    .then((res) => res.json())
    .catch((error) => console.error(error))
}

export default addUserApi
