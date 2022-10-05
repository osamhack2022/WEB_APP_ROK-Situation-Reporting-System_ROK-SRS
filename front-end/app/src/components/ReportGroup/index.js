import React from 'react'
import { View, FlatList, Text } from 'react-native'
import { Avatar } from 'react-native-paper'
import { Profile } from '../Profile'
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

export function ReportGroup({ group, name }) {
  let [fontsLoaded] = useNunitoFonts()

  const renderItem = ({ item }) => (
    <Profile
      name={item.name}
      position={item.position}
      src={require('../../assets/images/avatar2.png')}
    />
  )

  return (
    <View>
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
    </View>
  )
}
