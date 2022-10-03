import React, { useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native'
import { Colors, Searchbar } from 'react-native-paper'
import { ChatListItem } from '../../components/ChatListItem'
import userData from '../../data/userData'

export function ChatListScreen() {
  const [searchQuery, setSearchQuery] = useState('')

  const onChangeSearch = (query) => setSearchQuery(query)

  const renderItem = ({ item }) => (
    <ChatListItem
      name={item.name}
      lastMessage={item.lastMessage}
      createAt={item.createAt}
    />
  )

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Search.."
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBar}
      />
      <FlatList
        data={userData}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        style={{ backgroundColor: 'white', width: '95%' }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', alignItems: 'center' },
  itemSeparator: {
    borderColor: Colors.grey300,
  },
  searchBar: {
    borderWidth: 1,
    backgroundColor: Colors.grey200,
    borderColor: Colors.grey300,
    elevation: 3,
    height: 40,
  },
})
