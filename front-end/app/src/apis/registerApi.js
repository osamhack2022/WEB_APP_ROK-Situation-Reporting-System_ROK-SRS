import URL from '../../url'

const registerApi = ({ Rank, DoDID, password, Name, email, pic, Invcode }) => {
  fetch(URL + '/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Rank,
      DoDID,
      password,
      Name,
      email,
      pic,
      Invcode,
    }),
  })
    .then((res) => res.json())
    .catch((error) => console.error(error))
}

export default registerApi
