import React, { useState } from 'react'
import { FAB } from 'react-native-paper'
import { SafeAreaView, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export function UserMgtScreen() {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
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
  fab: {
    borderRadius: 60,
    height: 56,
    width: 56,
    position: 'absolute',
    bottom: 25,
    right: 20,
  },
})
