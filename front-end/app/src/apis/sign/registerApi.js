import URL from '../../../url'

const registerApi = async ({
  Rank,
  DoDID,
  password,
  Name,
  email,
  pic,
  Invcode,
}) => {
  try {
    const res = await fetch(URL + '/api/user/register', {
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
    return res.json()
  } catch (error) {
    console.error(error)
  }
}

export default registerApi
