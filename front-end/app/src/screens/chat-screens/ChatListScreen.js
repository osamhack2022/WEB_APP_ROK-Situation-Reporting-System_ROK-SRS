import React, { useState, useEffect } from 'react'
// prettier-ignore
import { FlatList, SafeAreaView, StyleSheet, TextInput, View } from 'react-native'
import { Colors, IconButton } from 'react-native-paper'
import { ChatListItem } from '../../components/ChatListItem'
import userData from '../../data/userData'
import fetchChatApi from '../../apis/fetchChatApi'

export function ChatListScreen() {
  const [query, setQuery] = useState('')
  const [focus, setFocus] = useState(false)
  useEffect(() => {
    const fetchChatList = async () => {
      const res = await fetchChatApi()
      console.log(res)
    }
    fetchChatList()
  }, [])

  const onChangeSearch = (query) => setQuery(query)

  const renderItem = ({ item }) => (
    <ChatListItem
      name={item.name}
      lastMessage={item.lastMessage}
      createAt={item.createAt}
    />
  )

  return (
    <SafeAreaView style={[styles.container]}>
      <FlatList
        data={userData}
        renderItem={renderItem}
        style={{ width: '100%' }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={[styles.searchBar, borderColor(focus)]}>
            <IconButton
              icon="magnify"
              size={25}
              color={focus ? Colors.green500 : Colors.grey500}
            />
            <TextInput
              placeholder="이름 또는 군 번을 입력하세요."
              onChangeText={onChangeSearch}
              style={styles.input}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
            />
          </View>
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, alignItems: 'center' },
  searchBar: {
    width: '92%',
    backgroundColor: Colors.grey100,
    height: 45,
    elevation: 4,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderBottomWidth: 1,
  },
  input: {
    fontSize: 15,
  },
})

const borderColor = (focus) =>
  StyleSheet.create({
    borderBottomColor: focus ? Colors.green500 : Colors.grey400,
  })
