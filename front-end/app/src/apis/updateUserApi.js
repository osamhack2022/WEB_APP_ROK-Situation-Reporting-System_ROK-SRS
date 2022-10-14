import URL from '../../url'

const updateUserApi = async ({ Rank, Name, email, milNumber, Number }) => {
  try {
    const res = await fetch(URL + '/api/user/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Rank, Name, email, milNumber, Number }),
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}
