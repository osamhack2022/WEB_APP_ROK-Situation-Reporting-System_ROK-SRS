import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, ScrollView, Switch } from 'react-native'
import { List, Colors } from 'react-native-paper'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'

export function SettingScreen() {
  let [fontsLoaded] = useNunitoFonts()

  const [enabled, toggleEnabled] = useState('unchecked')

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ width: '100%' }}>
        <List.Item
          title="로그아웃"
          left={() => <List.Icon icon="logout" />}
          style={styles.listItem}
        />
        <List.Item
          title="개인정보 수정"
          left={() => <List.Icon icon="account-cog" />}
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
          title="사용자 추가"
          left={() => <List.Icon icon="account-plus" />}
          style={styles.listItem}
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
