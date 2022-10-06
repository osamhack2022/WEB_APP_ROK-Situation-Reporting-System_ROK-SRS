import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text } from 'react-native'
import { Portal, Modal, Avatar, Provider, Colors } from 'react-native-paper'
import { OrgListItem } from '../../components/OrgListItem'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'

export const LeftImage = () => (
  <Avatar.Image
    source={require('../../assets/images/avatar.png')}
    size={40}
    style={{ alignSelf: 'center', marginLeft: 15, marginRight: 5 }}
  />
)

export function OrgChartScreen() {
  let [fontsLoaded] = useNunitoFonts()

  const [visible, setVisible] = useState(false)

  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <OrgListItem showModal={showModal} />
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={{
              backgroundColor: 'white',
              alignItems: 'center',
              margin: 50,
              padding: 25,
              borderRadius: 15,
            }}
          >
            <Avatar.Image
              source={require('../../assets/images/soldier.png')}
              size={70}
              style={{ backgroundColor: Colors.grey400, marginBottom: 5 }}
            />
            <Text style={styles.nameText}>중위 이원빈</Text>
            <View style={{ marginRight: 80 }}>
              <View style={styles.flexRow}>
                <View style={styles.box}>
                  <Text style={styles.boxText}>ROLE</Text>
                </View>
                <Text style={styles.text}>관리자</Text>
              </View>
              <View style={styles.flexRow}>
                <View style={styles.box}>
                  <Text style={styles.boxText}>TEAM</Text>
                </View>
                <Text style={styles.text}>통신소대</Text>
              </View>
              <View style={styles.flexRow}>
                <View style={styles.box}>
                  <Text style={styles.boxText}>TEL</Text>
                </View>
                <Text style={styles.text}>010-1234-5678</Text>
              </View>
            </View>
          </Modal>
        </Portal>
      </SafeAreaView>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
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
})
