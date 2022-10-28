import Constants from 'expo-constants'

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
    const res = await fetch(
      Constants.manifest.extra.appPublicBackendRoot + 'api/user/register',
      {
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
      }
    )
    return res.json()
  } catch (error) {
    console.error(error)
  }
}

export default registerApi
