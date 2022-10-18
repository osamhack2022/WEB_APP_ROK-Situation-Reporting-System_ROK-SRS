import React, { useState } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { Color, FAB } from 'react-native-paper'
import { ReportGroup } from '../../components/ReportGroup'
import DATA from '../../data/procData'

// fetch로 데이터를 받아와서 넘겨줌.
// 스크롤뷰로 나타냄.
// title을 체크해서 중복되면 삭제하고 다시 해달라고 alert.
// 꾹 눌러서 delete alert.
// 일단 add or delete
// FAB을 통해 add Screen or Modal
// 1. Modal이 나을듯
// delete의 경우 button을 통해?

export function SysMgtScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <ReportGroup group={DATA} name="onDuty" />
        <ReportGroup group={DATA} name="headquarter" />
      </ScrollView>
    </SafeAreaView>
  )
}
