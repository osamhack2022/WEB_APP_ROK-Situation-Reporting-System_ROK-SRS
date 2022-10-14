import URL from '../../url'

const searchUserApi = async ({ Name, DoDID, email }) => {
  const query = Name || DoDID || email ? Name || DoDID || email : ''
  try {
    const res = await fetch(URL + 'api/user?search=' + query)
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export default searchUserApi
