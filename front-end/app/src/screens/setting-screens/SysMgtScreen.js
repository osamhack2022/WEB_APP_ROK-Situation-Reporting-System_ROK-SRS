import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { Colors, FAB, Provider, Modal } from 'react-native-paper'
import { ReportGroup } from '../../components/ReportGroup'
import DATA from '../../data/procData'
import { UserCard } from '../../components/UserCard'
import getReportsysApi from '../../apis/report-sys/getReportsysApi'
import addReportsysApi from '../../apis/report-sys/addReportsysApi'
import removeReportsysApi from '../../apis/report-sys/removeReportsysApi'

// fetch로 데이터를 받아와서 넘겨줌.
// 스크롤뷰로 나타냄.
// title을 체크해서 중복되면 삭제하고 다시 해달라고 alert.
// 꾹 눌러서 delete alert.
// 일단 add or delete
// FAB을 통해 add Screen or Modal
// 1. Modal이 나을듯
// delete의 경우 button을 통해?

const ItemSeparator = () => (
  <Image
    source={require('../../assets/images/arrow.png')}
    style={{
      width: 30,
      height: 20,
      marginHorizontal: 7,
    }}
  />
)

export function SysMgtScreen() {
  const [reportsys, setReportsys] = useState([])

  useEffect(() => {
    const getAllReportsysHandler = async () => {
      const res = await getReportsysApi()
      setReportsys(res)
    }
    getAllReportsysHandler()
  })

  return (
    <Provider>
      <SafeAreaView>
        <Portal>
          <Modal></Modal>
        </Portal>
        <ScrollView>
          {/* {reportsys.map((sys) => <ReportGroup group={sys.List} name={sys.Title} />)} */}
          <ReportGroup group={DATA} name="onDuty" />
          <ReportGroup group={DATA} name="headquarter" />
        </ScrollView>
        <FAB
          icon="account-plus"
          style={styles.fab}
          onPress={() => navigation.navigate('UserAddScreen')}
          color="white"
        />
      </SafeAreaView>
    </Provider>
  )
}

const styles = StyleSheet.create({
  fab: {
    borderRadius: 60,
    height: 56,
    width: 56,
    position: 'absolute',
    bottom: 25,
    right: 20,
  },
})
