import URL from '../../../url'
import asyncStorage from '@react-native-async-storage/async-storage'

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
    const res = await fetch(URL + '/api/report', {
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
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export default addReportApi
