import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text } from 'react-native'
import { Avatar, Colors } from 'react-native-paper'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'

export function SettingScreen() {
  let [fontsLoaded] = useNunitoFonts()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profile}>
          <Avatar.Image
            source={require('../../assets/images/avatar.png')}
            size={80}
          />
          <Text style={styles.profileText}>병장 김형민 {'(21-76036771)'}</Text>
          <Text style={styles.profileText}>병장 김형민 {'(21-76036771)'}</Text>
          <Text style={styles.profileText}>병장 김형민 {'(21-76036771)'}</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  profileContainer: {
    width: '92%',
    backgroundColor: Colors.grey200,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: '3%',
  },
  profile: { marginTop: '5%', marginLeft: '5%' },
  profileText: {
    fontFamily: 'NunitoSans_600SemiBold',
    fontSize: 20,
  },
})
