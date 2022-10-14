import React from 'react'
import { FAB, List, Avatar } from 'react-native-paper'
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ReportGroup } from '../../components/ReportGroup'
import DATA from '../../data/procData'

const LeftImage = () => (
  <Avatar.Image
    source={require('../../assets/images/avatar.png')}
    size={40}
    style={{ alignSelf: 'center', marginLeft: 15, marginRight: 5 }}
  />
)

const tempData = [
  {
    Name: '김형민',
    position: '본부중대 통신',
  },
]

const deleteUserHandler = () => {}

export function UserMgtScreen() {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.view}>
        <ReportGroup group={DATA.onDuty} name="당직계통" />
        <ReportGroup group={DATA.headquarter} name="본부중대" />
      </ScrollView>
      <FAB
        icon="account-plus"
        style={styles.fab}
        onPress={() => navigation.navigate('UserAddScreen')}
      />
    </SafeAreaView>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  view: {
    width: '90%',
    alignItems: 'center',
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
