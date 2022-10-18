import React from 'react'
import { FlatList, Text, View, TouchableOpacity, Image } from 'react-native'
import { Avatar } from 'react-native-paper'
import { styles } from './style'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'

// 배경 회색으로, 각 카드 elevation주기

const ItemSeparator = () => (
  <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}>
    <Image
      source={require('../../assets/images/arrow.png')}
      style={{ width: 35, height: 20, marginHorizontal: 5 }}
    />
  </TouchableOpacity>
)

const renderItem = ({ item }) => (
  <>
    <View style={styles.view}>
      <Avatar.Image
        source={require('../../assets/images/avatar.png')}
        size={48}
        style={styles.image}
      />
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemText}>{item.position}</Text>
    </View>
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
