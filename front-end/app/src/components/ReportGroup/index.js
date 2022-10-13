import React from 'react'
import { FlatList, Text } from 'react-native'
import { Avatar } from 'react-native-paper'
import { styles } from './style'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'

const ItemSeparator = () => {
  return (
    <Avatar.Icon
      icon="arrow-right"
      size={50}
      style={{ backgroundColor: 'white' }}
    />
  )
}

export function ReportGroup({ group, name, pic }) {
  let [fontsLoaded] = useNunitoFonts()

  const renderItem = ({ item }) => (
    <View>
      <Avatar.Image
        source={require('../../assets/images/avatar.png')}
        size={40}
        style={styles.image}
      />
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemText}>{item.position}</Text>
    </View>
  )

  return (
    <>
      <FlatList
        data={group}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
        horizontal={true}
        ItemSeparatorComponent={ItemSeparator}
        showsHorizontalScrollIndicator={false}
      />
      <Text style={styles.text}>
        {name === 'onDuty' ? '당직계통 보고체계' : '본부중대 보고체계'}
      </Text>
    </>
  )
}
