import React, { useEffect } from 'react'
import { SafeAreaView, View, Text, StyleSheet, Image } from 'react-native'
import { Colors, Avatar } from 'react-native-paper'
import { useRecoilState } from 'recoil'
import { unitState, userState } from '../states'
import getUnitApi from '../apis/unit/getUnitApi'
import { convertRank } from '../helperfunctions/convertRank'
import { convertUserType } from '../helperfunctions/covertUserType'

const dftPic =
  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'

export function HomeScreen() {
  const [userMe, setUserMe] = useRecoilState(userState)
  const [myUnit, setMyUnit] = useRecoilState(unitState)

  useEffect(() => {
    const getUnitHandler = async () => {
      const res = await getUnitApi({ unitid: userMe.Unit })
      setMyUnit(res[0])
    }
    getUnitHandler()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.modal}>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>사용자 정보</Text>
        <Image source={{ uri: userMe.pic }} style={[styles.img]} />
        <Text style={styles.nameText}>
          {`${convertRank(userMe.Rank)} ${userMe.Name}`}
        </Text>
        <View style={{ alignSelf: 'flex-start' }}>
          <View style={styles.flexRow}>
            <View style={styles.box}>
              <Text style={styles.boxText}>군 번</Text>
            </View>
            <Text style={styles.text}>{userMe.DoDID}</Text>
          </View>
          <View style={styles.flexRow}>
            <View style={styles.box}>
              <Text style={styles.boxText}>계정 유형</Text>
            </View>
            <Text style={styles.text}>{convertUserType(userMe.Type)}</Text>
          </View>
          <View style={styles.flexRow}>
            <View style={styles.box}>
              <Text style={styles.boxText}>직책</Text>
            </View>
            <Text style={styles.text}>{userMe.Role}</Text>
          </View>
          <View style={styles.flexRow}>
            <View style={styles.box}>
              <Text style={styles.boxText}>전화</Text>
            </View>
            <Text style={styles.text}>{userMe.number}</Text>
          </View>
          <View style={styles.flexRow}>
            <View style={styles.box}>
              <Text style={styles.boxText}>군 전화</Text>
            </View>
            <Text style={styles.text}>{userMe.milNumber}</Text>
          </View>
          <View style={styles.flexRow}>
            <View style={styles.box}>
              <Text style={styles.boxText}>이메일</Text>
            </View>
            <Text style={styles.text}>{userMe.email}</Text>
          </View>
        </View>
      </View>
      <View style={[styles.modal, { marginTop: 5 }]}>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>부대 정보</Text>
        <Image
          source={{ uri: myUnit.Logo }}
          style={[styles.img, { height: 70, width: 60, borderRadius: 0 }]}
        />
        <Text style={[styles.nameText, { marginBottom: 3 }]}>
          {myUnit.Unitname}
        </Text>
        <Text style={styles.nameText}>"{myUnit.Unitslogan}"</Text>
        <View style={{ alignSelf: 'flex-start' }}>
          <View style={styles.flexRow}>
            <View style={styles.box}>
              <Text style={styles.boxText}>사용자 수</Text>
            </View>
            <Text style={styles.text}>
              {myUnit.Members ? myUnit.Members.length : ''}명
            </Text>
          </View>
          <View style={styles.flexRow}>
            <View style={styles.box}>
              <Text style={styles.boxText}>메모보고</Text>
            </View>
            <Text style={styles.text}>
              {myUnit.ReportCard ? myUnit.ReportCard.length : ''}개
            </Text>
          </View>
          <View style={styles.flexRow}>
            <View style={styles.box}>
              <Text style={styles.boxText}>보고체계</Text>
            </View>
            <Text style={styles.text}>
              {myUnit.reportSys ? myUnit.reportSys.length : ''}개
            </Text>
          </View>
          <View style={styles.flexRow}>
            <View style={styles.box}>
              <Text style={styles.boxText}>슬로건</Text>
            </View>
            <Text style={styles.text}>{myUnit.Unitslogan}</Text>
          </View>
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
  ///
  modal: {
    backgroundColor: 'white',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 15,
    elevation: 4,
  },
  flexRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  box: {
    backgroundColor: Colors.grey300,
    width: 80,
    borderRadius: 3,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  nameText: {
    fontFamily: 'NunitoSans_400Regular',
    fontSize: 16,
    marginBottom: 15,
  },
  boxText: {
    fontFamily: 'NunitoSans_700Bold',
    fontSize: 13,
  },
  text: {
    ontFamily: 'NunitoSans_400Regular',
    fontSize: 13,
    marginLeft: 5,
    color: Colors.grey600,
  },
  img: {
    backgroundColor: Colors.grey400,
    marginBottom: 5,
    width: 70,
    height: 70,
    borderRadius: 30,
  },
})
