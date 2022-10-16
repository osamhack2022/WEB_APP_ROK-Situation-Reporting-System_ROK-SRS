import React, { useState } from 'react'
import { ReportListItem } from '../../components/ReportListItem'
// prettier-ignore
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import { Colors, FAB } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import fetchReportApi from '../../apis/fetchReportApi'

export function RecdReportScreen() {
  const navigation = useNavigation()
  // const [reports, setReports] = useState(() => fetchReportHandler())

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <ReportListItem />
        <ReportListItem />
        <ReportListItem />
        <ReportListItem />
        <ReportListItem />
        <ReportListItem />
        <ReportListItem />
        <ReportListItem />
        <ReportListItem />
        {/* {reports &&
          reports.map((report, idx) => (
            <ReportListItem
              Title={report.Title}
              isEnd={report.isEnd}
              Content={report.Content}
              severity={report.severity}
              date={report.date}
              Type={report.Type}
            />
          ))} */}
      </ScrollView>
      <FAB
        icon="pencil-plus-outline"
        onPress={() => navigation.navigate('CreateReportScreen')}
        style={styles.fab}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey200,
    marginBottom: 10,
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
    height: 56,
    width: 56,
    position: 'absolute',
    bottom: 15,
    right: 20,
  },
})
