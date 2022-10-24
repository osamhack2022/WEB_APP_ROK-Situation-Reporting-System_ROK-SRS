import React from 'react'
import { FlatList, Text, Image, View } from 'react-native'
import { styles } from './style'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import { UserCard } from '../UserCard'

const ItemSeparator = () => (
  <Image
    source={require('../../assets/images/arrow.png')}
    style={[styles.image]}
  />
)

const renderItem = ({ item, props }) => (
  <UserCard
    rank={item.rank}
    name={item.name}
    position={item.position}
    source={item.source}
    style={props.cardStyle}
  />
)

export function ReportGroup(props) {
  let [fontsLoaded] = useNunitoFonts()

  return (
    <View>
      <FlatList
        data={props.List}
        renderItem={({ item }) => renderItem({ item, props })}
        contentContainerStyle={styles.container}
        horizontal={true}
        ItemSeparatorComponent={ItemSeparator}
        showsHorizontalScrollIndicator={false}
      />
      <Text style={styles.text}>{props.Title}</Text>
    </View>
  )
}
