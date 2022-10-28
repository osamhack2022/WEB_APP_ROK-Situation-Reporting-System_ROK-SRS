import React, { useEffect, useState } from 'react'
// prettier-ignore
import { SafeAreaView, ScrollView, StyleSheet, View, Text, Image, Alert } from 'react-native'
//prettier-ignore
import { Colors, FAB, Provider, Modal, Portal, TextInput, IconButton } from 'react-native-paper'
import { UserCard } from '../../components/UserCard'
import { ReportGroup } from '../../components/ReportGroup'
import getReportsysApi from '../../apis/report-sys/getReportsysApi'
import addReportsysApi from '../../apis/report-sys/addReportsysApi'
import editReportsysApi from '../../apis/report-sys/editReportsysApi'
import removeReportsysApi from '../../apis/report-sys/removeReportsysApi'
import searchUserApi from '../../apis/user/searchUserApi'
import { useRecoilState } from 'recoil'
import { userState } from '../../states/userState'
import { MyButton } from '../../components/MyButton'

const ItemSeparator = () => (
  <Image
    source={require('../../assets/images/arrow.png')}
    style={{
      alignSelf: 'center',
      width: 30,
      height: 20,
      marginHorizontal: 8,
    }}
  />
)

export function SysMgtScreen() {
  const [userMe, setUserMe] = useRecoilState(userState)
  const [reportsys, setReportsys] = useState([])
  const [sysOnEdit, setSysOnEdit] = useState('')
  const [query, setQuery] = useState('')
  const [users, setUsers] = useState([])
  const [Title, setTitle] = useState('')
  const [modalType, setModalType] = useState('')

  const [value, setValue] = useState('')

  const [visible, setVisible] = useState(false)
  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)

  const getAllReportsysHandler = async () => {
    const res = await getReportsysApi()
    setReportsys(res)
  }

  const AddReportsysHandler = async () => {
    const res = await addReportsysApi({ Title, List: users, Unit: userMe.Unit })
    setReportsys([...reportsys, res])
    Alert.alert(`${Title} 보고체계가 추가되었습니다.`)
  }

  const editReportsysHandler = async () => {
    const res = await editReportsysApi({
      Title,
      List: users,
      Unit: userMe.Unit,
    })
    await getAllReportsysHandler()
  }
  console.log(userMe.Unit)

  const removeReportsysHandler = async ({ _id }) => {
    const res = await removeReportsysApi({ _id, Unit: userMe.Unit })
    if (res._id) {
      Alert.alert('보고체계 삭제에 성공하였습니다.')
    } else {
      setReportsys(reportsys.filter((item) => item._id != _id))
    }
  }

  const getOneUserHandler = async () => {
    const res = await searchUserApi({ query })
    if (!res[0].Rank) {
      Alert.alert('사용자를 찾을 수 없습니다.')
    } else {
      setUsers([...users, res[0]])
    }
  }

  const onRemove = (_id) => {
    setUsers(users.filter((user) => user._id !== _id))
  }

  useEffect(() => {
    getAllReportsysHandler()
  }, [])

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modal}
          >
            {modalType === 'add' && (
              <View
                style={{ width: '100%', padding: 10, alignItems: 'center' }}
              >
                <Text
                  style={{ fontSize: 20, fontWeight: '500', marginBottom: 20 }}
                >
                  보고체계 추가
                </Text>
                <TextInput
                  label="보고체계 이름"
                  dense={true}
                  activeUnderlineColor={'#008275'}
                  style={styles.title}
                  onChangeText={(text) => setTitle(text)}
                />
                <TextInput
                  label="보고 인원 추가"
                  dense={true}
                  style={[styles.textInput]}
                  onChangeText={(query) => setQuery(query)}
                  right={
                    <TextInput.Icon
                      icon="plus"
                      color={query ? '#009975' : Colors.grey500}
                      size={25}
                      style={{ marginTop: 15 }}
                      forceTextInputFocus={false}
                      onPress={() => getOneUserHandler()}
                    />
                  }
                  onSubmitEditing={() => {
                    getOneUserHandler()
                  }}
                  activeUnderlineColor="#008275"
                />
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={{ width: '85%' }}
                  contentContainerStyle={{ alignSelf: 'center' }}
                >
                  {users.map((user) => (
                    <View style={{ flexDirection: 'row' }}>
                      <UserCard
                        rank={user.Rank}
                        name={user.Name}
                        position={user.Position}
                        style={{ paddingBottom: 0 }}
                        key={user._id}
                        right={
                          <IconButton
                            mode="contained-tonal"
                            icon="window-close"
                            size={25}
                            style={styles.icon}
                            contentContainerStyle={{ padding: 0 }}
                            color={Colors.red700}
                            onPress={() => onRemove(user._id)}
                          />
                        }
                      />
                      <ItemSeparator />
                    </View>
                  ))}
                </ScrollView>
                <MyButton
                  text="추 가 하 기"
                  style={{ width: '70%', marginTop: 30, marginBottom: 0 }}
                  onPress={() => AddReportsysHandler()}
                />
              </View>
            )}
            {modalType === 'edit' && (
              <View
                style={{ width: '100%', padding: 10, alignItems: 'center' }}
              >
                <Text style={{ fontSize: 18, fontWeight: '600' }}>
                  보고체계 수정
                </Text>
                <TextInput
                  label="보고체계 이름"
                  placeholder={sysOnEdit.Title}
                  dense={true}
                  activeUnderlineColor={'#008275'}
                  style={styles.title}
                  onChangeText={(text) => setTitle(text)}
                />
                <MyButton
                  text="보고체계 수정"
                  style={{ width: '70%', marginTop: 15 }}
                  onPress={() => EditReportsysHandler()}
                />
              </View>
            )}
          </Modal>
        </Portal>
        <ScrollView
          contentContainerStyle={{
            width: '100%',
            alignSelf: 'center',
            paddingBottom: 50,
          }}
          showsVerticalScrollIndicator={false}
        >
          {reportsys &&
            reportsys.map((sys) => (
              <View
                style={{
                  flexDirection: 'row',
                  width: '96%',
                  elevation: 4,
                  padding: 5,
                  paddingBottom: 0,
                  backgroundColor: Colors.white,
                  borderRadius: 8,
                  marginTop: 10,
                  alignSelf: 'center',
                }}
              >
                <ReportGroup
                  Title={sys.Title}
                  List={sys.List}
                  key={sys._id}
                  style={{ width: '80%', padding: 5 }}
                />
                <IconButton
                  icon="circle-edit-outline"
                  size={25}
                  style={styles.icon}
                  color={Colors.green500}
                  onPress={() => {
                    setSysOnEdit(sys)
                    setModalType('edit')
                    showModal()
                  }}
                />
                <IconButton
                  icon="window-close"
                  size={25}
                  style={styles.icon}
                  color={Colors.red700}
                  onPress={() => removeReportsysHandler({ _id: sys._id })}
                />
              </View>
            ))}
        </ScrollView>
        <FAB
          icon="account-multiple-plus"
          style={styles.fab}
          onPress={() => {
            setModalType('add')
            showModal()
          }}
          color="white"
        />
      </SafeAreaView>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grey200,
    flex: 1,
  },
  title: {
    width: '85%',
    alignSelf: 'center',
    backgroundColor: Colors.white,
    marginBottom: 20,
  },
  textInput: {
    width: '85%',
    backgroundColor: Colors.white,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modal: {
    backgroundColor: Colors.white,
    paddingVertical: 10,
    paddingBottom: 20,
    paddingHorizontal: 5,
    margin: 10,
    marginBottom: 30,
    borderRadius: 15,
  },
  icon: { margin: 0, padding: 0, bottom: 0 },
  fab: {
    borderRadius: 60,
    height: 56,
    width: 56,
    position: 'absolute',
    bottom: 25,
    right: 25,
    backgroundColor: '#009572',
  },
})
