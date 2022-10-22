import React, { useState, useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { userState } from '../../states/userState'
// prettier-ignore
import { SafeAreaView, StyleSheet, ScrollView, Switch, Alert } from 'react-native'
import { List, Colors } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import logoutApi from '../../apis/sign/logoutApi'

export function SettingScreen() {
  const [userMe, setUserMe] = useRecoilState(userState)

  const logoutHandler = useCallback(async (cb) => {
    Alert.alert('알림', '로그아웃 하시겠습니까?', [
      {
        text: '로그아웃',
        onPress: () => {
          logoutApi()
          cb()
        },
      },
      {
        text: '취소',
      },
    ])
  })

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
            logoutHandler(() =>
              navigation.navigate('SettingNavigator', {
                screen: 'LoginScreen',
              })
            )
          }
        />
        <List.Item
          title="내 정보 관리"
          left={() => <List.Icon icon="account-edit" />}
          style={styles.listItem}
          onPress={() =>
            navigation.navigate('SettingNavigator', {
              screen: 'UserUpdateScreen',
            })
          }
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
          onPress={() =>
            navigation.navigate('SettingNavigator', {
              screen: 'UserMgtScreen',
            })
          }
        />
        <List.Item
          title="부대 관리"
          left={() => <List.Icon icon="account-multiple-check" />}
          style={styles.listItem}
          onPress={() =>
            navigation.navigate('SettingNavigator', {
              screen: 'UnitMgtScreen',
            })
          }
        />
        <List.Item
          title="부대 추가"
          left={() => <List.Icon icon="account-multiple-check" />}
          style={styles.listItem}
          onPress={() =>
            navigation.navigate('SettingNavigator', {
              screen: 'UnitAddScreen',
            })
          }
        />
        <List.Item
          title="보고체계 관리"
          left={() => <List.Icon icon="arrow-decision" />}
          style={styles.listItem}
          onPress={() =>
            navigation.navigate('SettingNavigator', {
              screen: 'SysMgtScreen',
            })
          }
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
