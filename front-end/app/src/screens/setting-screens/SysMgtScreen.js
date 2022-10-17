import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'
import { ReportGroup } from '../../components/ReportGroup'
import DATA from '../../data/procData'

export function SysMgtScreen() {
  return (
    <SafeAreaView>
      <ReportGroup group={DATA} name="onDuty" />
      <ReportGroup group={DATA} name="headquarter" />
    </SafeAreaView>
  )
}
