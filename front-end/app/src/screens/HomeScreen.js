import React, { useEffect } from 'react'
import { SafeAreaView, View, Text, StyleSheet, Image } from 'react-native'
import { Colors } from 'react-native-paper'
import { useRecoilState } from 'recoil'
import { unitState, userState } from '../states'
import getUnitApi from '../apis/unit/getUnitApi'

export function HomeScreen() {
  const [userMe, setUserMe] = useRecoilState(userState)
  const [myUnit, setMyUnit] = useRecoilState(unitState)

  useEffect(() => {
    const getUnitHandler = async () => {
      setMyUnit(await getUnitApi(userMe.Unit))
    }
    getUnitHandler()
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={{ fontSize: 16 }}>사용자 정보</Text>
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <Image
            source={{ uri: userMe.pic }}
            style={{ width: 40, height: 40, borderRadius: 15 }}
          />
          <Text>
            {userMe.Rank} {userMe.Name}
          </Text>
          <Text>{userMe.Role}</Text>
        </View>
        <Text>{userMe.Type}</Text>
        <Text>{userMe.DoDID}</Text>
        <Text>{userMe.email}</Text>
        <Text>{userMe.number}</Text>
        <Text>{userMe.milNumber}</Text>
      </View>
      <View style={styles.card}>
        <Text style={{ fontSize: 16 }}>부대 정보</Text>
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <Image
            source={{ uri: myUnit.Logo }}
            style={{ width: 40, height: 40, borderRadius: 15 }}
          />
          <Text>{myUnit.Unitname}</Text>
          <Text>{myUnit.unitslogan}</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey200,
  },
  card: {
    margin: 10,
    borderRadius: 10,
    elevation: 4,
    alignItems: 'center',
  },
})
