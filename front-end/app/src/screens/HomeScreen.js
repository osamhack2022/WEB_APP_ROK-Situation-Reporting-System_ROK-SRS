import React, { useEffect } from 'react'
import { SafeAreaView, View, Text, StyleSheet, Image } from 'react-native'
import { Colors } from 'react-native-paper'
import { useRecoilState } from 'recoil'
import { unitState, userState } from '../states'
import getUnitApi from '../apis/unit/getUnitApi'

const dftPic =
  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'

export function HomeScreen() {
  const [userMe, setUserMe] = useRecoilState(userState)
  const [myUnit, setMyUnit] = useRecoilState(unitState)

  // useEffect(() => {
  //   const getUnitHandler = async () => {
  //     setMyUnit(await getUnitApi({ unitid: userMe.Unit }))
  //   }
  //   getUnitHandler()
  // })

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={{ fontSize: 16, alignSelf: 'center' }}>사용자 정보</Text>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Image
            source={{ uri: userMe.pic || dftPic }}
            style={{ width: 50, height: 50, borderRadius: 20 }}
          />
          <Text>
            {userMe.Rank} {userMe.Name}
          </Text>
          <Text>{userMe.Role}</Text>
        </View>
        <Text>계정유형: {userMe.Type}</Text>
        <Text>군번: {userMe.DoDID}</Text>
        <Text>이메일: {userMe.email}</Text>
        <Text>전화번호: {userMe.number}</Text>
        <Text>군 전화번호: {userMe.milNumber}</Text>
      </View>
      {/* <View style={styles.card}>
        <Text style={{ fontSize: 16 }}>부대 정보</Text>
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <Image
            source={{ uri: myUnit.Logo }}
            style={{ width: 40, height: 40, borderRadius: 15 }}
          />
          <Text>{myUnit.Unitname}</Text>
          <Text>{myUnit.unitslogan}</Text>
        </View>
      </View> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey200,
  },
  card: {
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 0,
    backgroundColor: Colors.white,
    elevation: 4,
  },
})
