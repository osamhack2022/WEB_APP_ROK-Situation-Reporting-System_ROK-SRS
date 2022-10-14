import React from 'react'
import { FlatList, Text, View, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-paper'
import { styles } from './style'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'

const ItemSeparator = () => (
  <TouchableOpacity style={{ alignItems: 'center' }}>
    <Avatar.Icon
      icon="arrow-right"
      size={50}
      style={{ backgroundColor: 'white', padding: 0 }}
    />
    <Avatar.Icon
      icon="plus"
      size={30}
      style={{ backgroundColor: 'white', color: 'green' }}
    />
  </TouchableOpacity>
)

const renderItem = ({ item }) => (
  <>
    <View style={styles.view}>
      <Avatar.Image
        source={require('../../assets/images/avatar.png')}
        size={40}
        style={styles.image}
      />
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemText}>{item.position}</Text>
    </View>
    <TouchableOpacity>
      <Avatar.Icon
        icon="alpha-x"
        size={30}
        style={{ backgroundColor: 'white' }}
      />
    </TouchableOpacity>
  </>
)

export function ReportGroup({ group, name, pic, isSetting = false }) {
  let [fontsLoaded] = useNunitoFonts()

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
