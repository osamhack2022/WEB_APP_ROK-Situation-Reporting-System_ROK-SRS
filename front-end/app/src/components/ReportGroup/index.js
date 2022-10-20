import React from 'react'
import { FlatList, Text, Image } from 'react-native'
import { styles } from './style'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import { UserCard } from '../UserCard'

const ItemSeparator = () => (
  <Image
    source={require('../../assets/images/arrow.png')}
    style={[styles.image]}
  />
)

const renderItem = ({ item }) => (
  <UserCard name={item.name} position={item.position} source={item.source} />
)

export function ReportGroup(props) {
  let [fontsLoaded] = useNunitoFonts()

  return (
    <>
      <FlatList
        data={props.group}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
        horizontal={true}
        ItemSeparatorComponent={ItemSeparator}
        showsHorizontalScrollIndicator={false}
      />
      <Text style={styles.text}>
        {props.name === 'onDuty' ? '당직계통 보고체계' : '본부중대 보고체계'}
      </Text>
    </>
  )
}
