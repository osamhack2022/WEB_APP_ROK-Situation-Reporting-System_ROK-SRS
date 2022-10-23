import React, { useState, useEffect } from 'react'
import { ReportListItem } from '../../components/ReportListItem'
// prettier-ignore
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import { Colors, FAB } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import getReportApi from '../../apis/report/getReportApi'

export function RecdReportScreen() {
  const [reports, setReports] = useState([])

  const getReportHandler = async () => {
    setReports(await getReportApi())
  }

  useEffect(() => {
    getReportHandler()
  }, [])

  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        scrollEnabled={true}
      >
        {reports &&
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
          ))}
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
