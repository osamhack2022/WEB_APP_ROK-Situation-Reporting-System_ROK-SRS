import URL from '../../../url'
import asyncStorage from '@react-native-async-storage/async-storage'

const fetchReportApi = async ({
  Type,
  Reportsystems,
  Additionalpeople,
  Content,
  Title,
}) => {
  try {
    const res = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${await asyncStorage.getItem('roksrs-token')}`,
      },
      body: {
        Type,
        Reportsystems,
        Additionalpeople,
        Content,
        Title,
      },
    })
  } catch (error) {
    console.log(error)
  }
}

export default fetchReportApi
