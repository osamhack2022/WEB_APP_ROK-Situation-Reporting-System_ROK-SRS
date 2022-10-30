import React, { useState, useEffect } from 'react'
import { ReportListItem } from '../../components/ReportListItem'
import { useRecoilState } from 'recoil'
import { userState } from '../../states'
// prettier-ignore
import { SafeAreaView, StyleSheet, ScrollView, Text } from 'react-native'
import { Colors, FAB, ActivityIndicator } from 'react-native-paper'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import getReportApi from '../../apis/report/getReportApi'

export function RecdReportScreen() {
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const [loading, setLoading] = useState(true)
  const [userMe, setUserMe] = useRecoilState(userState)
  const [reports, setReports] = useState([])

  const getReportHandler = async () => {
    const res = await getReportApi({ receiver: userMe._id })
    setReports(res)
    setLoading(false)
  }

  useEffect(() => {
    getReportHandler()
  }, [isFocused])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        scrollEnabled={true}
      >
        {loading ? (
          <ActivityIndicator
            size={45}
            style={{ marginTop: 300 }}
            color={Colors.green500}
          />
        ) : reports[0] ? (
          reports.map((report) => (
            <ReportListItem
              Title={report.Title}
              Status={report.Status}
              Content={report.Content}
              Severity={report.Severity}
              createdAt={report.createdAt}
              Type={report.Type}
              ReportingSystem={report.ReportingSystem}
              Invited={report.Invited}
              Comments={report.Comments}
              User={report.User}
              key={report._id}
            />
          ))
        ) : (
          <Text style={{ marginTop: 300, fontSize: 16 }}>
            받은 메모보고가 없습니다
          </Text>
        )}
      </ScrollView>
      {reports && (
        <FAB
          icon="pencil-plus-outline"
          onPress={() =>
            navigation.navigate('ReportNavigator', {
              screen: 'CreateReportScreen',
            })
          }
          style={styles.fab}
          color="white"
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey200,
    paddingTop: 3,
    paddingBottom: 5,
    justifyContent: 'center',
  },
  scrollView: {
    width: '100%',
    alignItems: 'center',
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row',
  },
  fab: {
    borderRadius: 60,
    height: 55,
    width: 55,
    position: 'absolute',
    bottom: 15,
    right: 20,
    backgroundColor: '#009572',
  },
})
