import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import {
  Colors,
  FAB,
  Provider,
  Modal,
  Portal,
  TextInput,
} from 'react-native-paper'
import { ReportGroup } from '../../components/ReportGroup'
import DATA from '../../data/procData'
import { UserCard } from '../../components/UserCard'
import getReportsysApi from '../../apis/report-sys/getReportsysApi'
import addReportsysApi from '../../apis/report-sys/addReportsysApi'
import removeReportsysApi from '../../apis/report-sys/removeReportsysApi'
import { useRecoilState } from 'recoil'
import { userState } from '../../states/userState'

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
  const [userMe, setUserMe] = useRecoilState(userState)
  const [reportsys, setReportsys] = useState([])
  const [query, setQuery] = useState('')

  const [visible, setVisible] = useState(false)
  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)

  useEffect(() => {
    const getAllReportsysHandler = async () => {
      const res = await getReportsysApi()
      setReportsys(res)
    }
    getAllReportsysHandler()
  })

  const AddReportsysHandler = async ({ Title, List }) => {
    const res = await addReportsysApi({ Title, List, Unit: userMe.Unit })
    setReportsys(reportsys.concat(res))
  }

  const removeReportsysHandler = async ({ _id }) => {
    const res = await removeReportsysApi({ _id, Unit: userMe.Unit })
    setReportsys(reportsys.filter((item) => item._id != _id))
  }

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal}>
            <TextInput
              placeholder="이름 또는 군 번을 입력하세요."
              dense={true}
              activeUnderlineColor={Colors.green500}
              onChangeText={(query) => {
                setQuery(query)
              }}
              left={<TextInput.Icon icon="magnify" />}
            />
          </Modal>
        </Portal>
        <ScrollView>
          {/* {reportsys.map((sys) => <ReportGroup group={sys.List} name={sys.Title} />)} */}
          <ReportGroup List={DATA.onDuty} Title="onDuty" />
          <ReportGroup List={DATA.headquarter} Title="headquarter" />
        </ScrollView>
        <FAB
          icon="account-plus"
          style={styles.fab}
          onPress={showModal}
          color="white"
        />
      </SafeAreaView>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  fab: {
    borderRadius: 60,
    height: 56,
    width: 56,
    position: 'absolute',
    bottom: 25,
    right: 20,
  },
})
