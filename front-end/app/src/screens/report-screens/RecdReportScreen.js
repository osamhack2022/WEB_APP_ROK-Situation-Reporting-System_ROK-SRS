import React, { useState, useEffect } from 'react'
import { ReportListItem } from '../../components/ReportListItem'
// prettier-ignore
import { SafeAreaView, StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native'
import { Colors, FAB } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import getReportApi from '../../apis/report/getReportApi'

// const { Title, Status, Content, severity, date, Type } = {
//   Title: '3초소 거수자 발견',
//   Status: 'Resolved',
//   Content: `충성! 당직사령님, 3초소에 사복을 입은 거수자가 나타났습니다.\n무기는 소지하고 있지 않은 것으로 보이며, 위병소 앞에서 두리번 거리고 있습니다.\n현재 경계중이며, 추가사항 발생시 보고드리겠습니다.`,
//   severity: 3,
//   date: `${moment().subtract(6, 'days').format('YYYY-MM-DD hh:mm')}`,
//   Type: '긴급상황',
// }

export function RecdReportScreen() {
  const [reports, setReports] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getReportHandler = async () => {
    setReports(await getReportApi())
  }

  useEffect(() => {
    getReportHandler()
    setIsLoading(false)
  }, [])

  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.green700} />
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            {reports.map((report) => (
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
            ))}
          </ScrollView>
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
        </View>
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
    flex: 1,
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
