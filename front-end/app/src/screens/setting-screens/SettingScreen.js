import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { LoginState } from '../../states/LoginState'
import { SafeAreaView, StyleSheet, ScrollView, Switch } from 'react-native'
import { List, Colors } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'

const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState)

const logoutHandler = (cb) => {
  localStorage.removeItem('rok-srs-token')
  setIsLoggedIn(false)
  cb()
}

export function SettingScreen() {
  let [fontsLoaded] = useNunitoFonts()
  const navigation = useNavigation()

  const [enabled, toggleEnabled] = useState('unchecked')

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ width: '100%' }}>
        <List.Item
          title="로그아웃"
          left={() => <List.Icon icon="logout" />}
          style={styles.listItem}
          onPress={() =>
            logoutHandler(() => navigation.navigate('LoginScreen'))
          }
        />
        <List.Item
          title="개인정보 수정"
          left={() => <List.Icon icon="account-edit" />}
          style={styles.listItem}
        />
        <List.Item
          title="앱 알림 설정"
          left={() => <List.Icon icon="bell" />}
          right={() => (
            <Switch
              value={enabled}
              onValueChange={toggleEnabled}
              trackColor={{ false: Colors.grey300, true: Colors.green300 }}
            />
          )}
          style={styles.listItem}
        />
        <List.Item
          title="문의하기"
          left={() => <List.Icon icon="email-outline" />}
          style={styles.listItem}
        />
        <List.Item
          title="사용자 관리"
          left={() => <List.Icon icon="account-details" />}
          style={styles.listItem}
          onPress={() => navigation.navigate('UserMgtScreen')}
        />
        <List.Item
          title="부대 관리"
          left={() => <List.Icon icon="account-multiple-check" />}
          style={styles.listItem}
          onPress={() => navigation.navigate('UnitMgtScreen')}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  listItem: {
    padding: 0,
    borderBottomWidth: 1,
    borderColor: Colors.grey200,
    marginRight: 10,
  },
})
