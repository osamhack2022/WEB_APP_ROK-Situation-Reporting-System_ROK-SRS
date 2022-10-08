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
      <FlatList
        data={userData}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        style={{ backgroundColor: Colors.grey200, width: '100%' }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Searchbar
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.searchBar}
          />
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.grey200, alignItems: 'center' },
  itemSeparator: {
    borderColor: Colors.grey300,
  },
  searchBar: {
    width: '90%',
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: Colors.grey400,
    marginTop: 5,
    height: 40,
    elevation: 0,
    alignSelf: 'center',
  },
})
