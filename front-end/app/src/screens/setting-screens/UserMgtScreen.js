import React from 'react'
import { FAB, Avatar } from 'react-native-paper'
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const LeftImage = () => (
  <Avatar.Image
    source={require('../../assets/images/avatar.png')}
    size={40}
    style={{ alignSelf: 'center', marginLeft: 15, marginRight: 5 }}
  />
)

const tempData = [
  {
    title: '중위 이원빈',
    description: '통신소대장',
  },
  {
    title: '중사 구창우',
    description: '통신부소대장',
  },
]

const deleteUserHandler = () => {}

export function UserMgtScreen() {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.view}>
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
