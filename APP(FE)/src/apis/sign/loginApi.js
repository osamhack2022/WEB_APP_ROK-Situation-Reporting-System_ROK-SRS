import Constants from 'expo-constants'

const loginApi = async ({ DoDID, password }) => {
  try {
    const res = await fetch(
      Constants.manifest.extra.appPublicBackendRoot + 'api/user/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ DoDID, password }),
      }
    )
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export default loginApi
