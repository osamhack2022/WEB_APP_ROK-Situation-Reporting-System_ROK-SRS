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
              padding: 20,
            }}
          >
            <Avatar.Image
              source={require('../../assets/images/soldier.png')}
              size={70}
              style={{ backgroundColor: Colors.grey400, marginBottom: 5 }}
            />
            <Text>중위 이원빈</Text>
            <View></View>
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
})
