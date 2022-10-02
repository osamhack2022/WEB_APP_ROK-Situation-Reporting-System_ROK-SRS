import React from 'react'
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native'
import { Colors } from 'react-native-paper'
import { ChatListItem } from '../../components/ChatListItem'

export function ChatListScreen() {
  const userData = [
    {
      name: '김형민',
      lastMessage: 'Hello, How are you?',
      createAt: '2022-01-01',
    },
    {
      name: '김형민',
      lastMessage: 'Hello, How are you?',
      createAt: '2022-01-01',
    },
    {
      name: '김형민',
      lastMessage: 'Hello, How are you?',
      createAt: '2022-01-01',
    },
    {
      name: '김형민',
      lastMessage: 'Hello, How are you?',
      createAt: '2022-01-01',
    },
    {
      name: '김형민',
      lastMessage: 'Hello, How are you?',
      createAt: '2022-01-01',
    },
    {
      name: '김형민',
      lastMessage: 'Hello, How are you?',
      createAt: '2022-01-01',
    },
    {
      name: '김형민',
      lastMessage: 'Hello, How are you?',
      createAt: '2022-01-01',
    },
    {
      name: '김형민',
      lastMessage: 'Hello, How are you?',
      createAt: '2022-01-01',
    },
    {
      name: '김형민',
      lastMessage: 'Hello, How are you?',
      createAt: '2022-01-01',
    },
    {
      name: '김형민',
      lastMessage: 'Hello, How are you?',
      createAt: '2022-01-01',
    },
    {
      name: '김형민',
      lastMessage: 'Hello, How are you?',
      createAt: '2022-01-01',
    },
    {
      name: '김형민',
      lastMessage: 'Hello, How are you?',
      createAt: '2022-01-01',
    },
  ]

  const renderItem = ({ item }) => (
    <ChatListItem
      name={item.name}
      lastMessage={item.lastMessage}
      createAt={item.createAt}
    />
  )

  return (
    <SafeAreaView style={styles.flex}>
      <FlatList
        data={userData}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  itemSeparator: {
    borderWidth: 1,
    borderColor: Colors.grey300,
  },
})
