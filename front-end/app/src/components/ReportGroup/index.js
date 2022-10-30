import React from 'react'
import { FlatList, Text, Image, View } from 'react-native'
import { styles } from './style'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import { UserCard } from '../UserCard'
import { convertRank } from '../../helperfunctions/convertRank'

const dftPic =
  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'

const ItemSeparator = () => (
  <Image
    source={require('../../assets/images/arrow.png')}
    style={[styles.image]}
  />
)

const renderItem = ({ item, props }) => (
  <UserCard
    rank={convertRank(item.Rank)}
    name={item.Name}
    position={item.Role}
    source={{ uri: item.pic || dftPic }}
    style={props.cardStyle}
  />
)

export function ReportGroup(props) {
  let [fontsLoaded] = useNunitoFonts()

  return (
    <View style={props.style}>
      <FlatList
        data={props.List}
        renderItem={({ item }) => renderItem({ item, props })}
        contentContainerStyle={styles.container}
        horizontal={true}
        ItemSeparatorComponent={ItemSeparator}
        showsHorizontalScrollIndicator={false}
        ListFooterComponent={props.right || null}
      />
      <Text style={styles.text}>{props.Title}</Text>
    </View>
  )
}
