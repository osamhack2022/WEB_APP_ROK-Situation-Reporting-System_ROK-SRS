import asyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'

const addReportApi = async ({
  Type,
  ReportingSystem,
  Invited,
  Content,
  Title,
  User,
}) => {
  try {
    console.log()
    const res = await fetch(
      Constants.manifest.extra.appPublicBackendRoot + 'api/report',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await asyncStorage.getItem('roksrs-token')}`,
        },
        body: JSON.stringify({
          Type,
          ReportingSystem,
          Invited,
          Content,
          Title,
        }),
        user: JSON.stringify(User),
      }
    )
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export default addReportApi
