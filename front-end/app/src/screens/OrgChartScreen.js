import React, { useState, useEffect, useCallback } from 'react'
// prettier-ignore
import { SafeAreaView, StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native'
// prettier-ignore
import { Portal, Modal, Avatar, Provider, Colors, List } from 'react-native-paper'
import { useRecoilState } from 'recoil'
import { userState } from '../states'
import { useNunitoFonts } from '../hooks/useNunitoFonts'
import getAllUsersApi from '../apis/user/getAllUsersApi'
import { convertRank } from '../helperfunctions/convertRank'

const dftPic =
  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'

export function OrgChartScreen() {
  let [fontsLoaded] = useNunitoFonts()

  const [userMe, setUserMe] = useRecoilState(userState)
  const [modalData, setModalData] = useState({ visible: false })
  const [users, setUsers] = useState([])

  const showModal = useCallback(
    ({ rank, name, role, number, milNumber, email, pic }) =>
      setModalData({
        rank,
        name,
        role,
        number,
        milNumber,
        email,
        pic,
        visible: true,
      })
  )

  const hideModal = useCallback(() =>
    setModalData({ ...modalData, visible: false })
  )

  useEffect(() => {
    const getAllUsersHandler = async () => {
      const res = await getAllUsersApi(userMe.Unit)
      setUsers(res)
    }
    getAllUsersHandler()
  }, [])

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={{ width: '100%' }}>
            <List.Section>
              {users &&
                users.map((user) => (
                  <List.Item
                    title={`${convertRank(user.Rank)} ${user.Name}`}
                    description={user.Role}
                    left={() => (
                      <Avatar.Image
                        source={{ uri: user.pic || dftPic }}
                        size={40}
                        style={{
                          alignSelf: 'center',
                          marginLeft: 15,
                          marginRight: 5,
                          backgroundColor: Colors.grey400,
                        }}
                      />
                    )}
                    right={() => (
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          alignItems: 'flex-end',
                        }}
                        onPress={() =>
                          showModal({
                            pic: user.pic || dftPic,
                            rank: convertRank(user.Rank),
                            name: user.Name,
                            role: user.Role,
                            number: user.number,
                            milNumber: user.milNumber,
                            email: user.email,
                          })
                        }
                      >
                        <Text style={styles.btnText}>Click for detail</Text>
                      </TouchableOpacity>
                    )}
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: Colors.grey200,
                      padding: 0,
                      paddingVertical: 3,
                    }}
                    titleStyle={{
                      fontSize: 15,
                      fontFamily: 'NunitoSans_400Regular',
                    }}
                    descriptionStyle={{
                      fontSize: 12,
                      fontFamily: 'NunitoSans_300Light',
                    }}
                    key={user._id}
                    onPress={() =>
                      showModal({
                        pic: user.pic || dftPic,
                        rank: convertRank(user.Rank),
                        name: user.Name,
                        role: user.Role,
                        number: user.number,
                        milNumber: user.milNumber,
                        email: user.email,
                      })
                    }
                  />
                ))}
            </List.Section>
          </View>
          <Portal>
            <Modal
              visible={modalData.visible}
              onDismiss={hideModal}
              contentContainerStyle={styles.modal}
            >
              <Avatar.Image
                source={{ uri: modalData.pic }}
                size={70}
                style={styles.img}
              />
              <Text
                style={styles.nameText}
              >{`${modalData.rank} ${modalData.name}`}</Text>
              <View style={{ alignItems: 'flex-start' }}>
                <View style={styles.flexRow}>
                  <View style={styles.box}>
                    <Text style={styles.boxText}>직책</Text>
                  </View>
                  <Text style={styles.text}>{modalData.role}</Text>
                </View>
                <View style={styles.flexRow}>
                  <View style={styles.box}>
                    <Text style={styles.boxText}>전화</Text>
                  </View>
                  <Text style={styles.text}>{modalData.number}</Text>
                </View>
                <View style={styles.flexRow}>
                  <View style={styles.box}>
                    <Text style={styles.boxText}>군 전화</Text>
                  </View>
                  <Text style={styles.text}>{modalData.milNumber}</Text>
                </View>
                <View style={styles.flexRow}>
                  <View style={styles.box}>
                    <Text style={styles.boxText}>이메일</Text>
                  </View>
                  <Text style={styles.text}>{modalData.email}</Text>
                </View>
              </View>
            </Modal>
          </Portal>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    width: '100%',
    alignItems: 'flex-start',
  },
  flexRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  box: {
    backgroundColor: Colors.grey300,
    width: 80,
    borderRadius: 3,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  nameText: {
    fontFamily: 'NunitoSans_400Regular',
    fontSize: 16,
    marginBottom: 15,
  },
  boxText: {
    fontFamily: 'NunitoSans_700Bold',
    fontSize: 13,
  },
  text: {
    ontFamily: 'NunitoSans_400Regular',
    fontSize: 13,
    marginLeft: 5,
    color: Colors.grey600,
  },
  modal: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 20,
    marginHorizontal: 30,
    borderRadius: 15,
  },
  img: {
    backgroundColor: Colors.grey400,
    marginBottom: 5,
  },
  btnText: {
    fontFamily: 'NunitoSans_400Regular',
    color: Colors.green700,
    marginRight: 15,
    marginTop: 15,
  },
})
