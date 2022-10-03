import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { ReportHeader } from '../../components/ReportHeader'

export function ReportScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ReportHeader />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
})
