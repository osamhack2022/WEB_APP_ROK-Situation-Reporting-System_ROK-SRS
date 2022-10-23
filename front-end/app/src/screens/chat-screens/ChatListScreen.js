import React, { useState, useEffect } from 'react'
// prettier-ignore
import { FlatList, SafeAreaView, StyleSheet } from 'react-native'
import { Colors } from 'react-native-paper'
import { ChatListItem } from '../../components/ChatListItem'
import userData from '../../data/userData'
import getChatApi from '../../apis/getChatApi'
import { Searchbar } from '../../components/Searchbar'

export function ChatListScreen() {
  const [query, setQuery] = useState('')
  useEffect(() => {
    const fetchChatList = async () => {
      const res = await getChatApi()
      console.log(res)
    }
    fetchChatList()
  }, [])

  const renderItem = ({ item }) => (
    <ChatListItem
      name={item.name}
      lastMessage={item.lastMessage}
      createAt={item.createAt}
    />
  )

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={userData}
        renderItem={renderItem}
        style={{ width: '100%' }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Searchbar
            placeholder="검색어를 입력하세요."
            value={query}
            setQuery={setQuery}
          />
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, alignItems: 'center' },
})

const borderColor = (focus) =>
  StyleSheet.create({
    borderBottomColor: focus ? Colors.green500 : Colors.grey400,
  })
