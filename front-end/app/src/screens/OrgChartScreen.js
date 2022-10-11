import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text, ScrollView } from 'react-native'
import { Portal, Modal, Avatar, Provider, Colors } from 'react-native-paper'
import { OrgListItem } from '../components/OrgListItem'
import { useNunitoFonts } from '../hooks/useNunitoFonts'

export const LeftImage = () => (
  <Avatar.Image
    source={require('../assets/images/avatar.png')}
    size={40}
    style={{ alignSelf: 'center', marginLeft: 15, marginRight: 5 }}
  />
)

export function OrgChartScreen() {
  let [fontsLoaded] = useNunitoFonts()

  const [modalData, setModalData] = useState({})

  const showModal = ({ name, role, team, tel }) =>
    setModalData({ name, role, team, tel, visible: true })

  const hideModal = () => setModalData({ ...modalData, visible: false })

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <OrgListItem showModal={showModal} title="본부중대" />
          <Portal>
            <Modal
              visible={modalData.visible}
              onDismiss={hideModal}
              contentContainerStyle={styles.modal}
            >
              <Avatar.Image
                source={require('../assets/images/soldier.png')}
                size={70}
                style={styles.img}
              />
              <Text style={styles.nameText}>{modalData.name}</Text>
              <View style={{ marginRight: 80 }}>
                <View style={styles.flexRow}>
                  <View style={styles.box}>
                    <Text style={styles.boxText}>ROLE</Text>
                  </View>
                  <Text style={styles.text}>{modalData.role}</Text>
                </View>
                <View style={styles.flexRow}>
                  <View style={styles.box}>
                    <Text style={styles.boxText}>TEAM</Text>
                  </View>
                  <Text style={styles.text}>{modalData.team}</Text>
                </View>
                <View style={styles.flexRow}>
                  <View style={styles.box}>
                    <Text style={styles.boxText}>TEL</Text>
                  </View>
                  <Text style={styles.text}>{modalData.tel}</Text>
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
    margin: 50,
    padding: 25,
    borderRadius: 15,
  },
  img: {
    backgroundColor: Colors.grey400,
    marginBottom: 5,
  },
})
