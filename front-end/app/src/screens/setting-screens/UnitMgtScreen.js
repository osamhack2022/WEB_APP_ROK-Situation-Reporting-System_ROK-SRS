import React, { useState, useCallback, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, Alert } from 'react-native'
import { TextInput, Colors } from 'react-native-paper'
import { ImagePicker } from '../../components/ImagePicker'
import { window } from '../../constants/layout'
import updateUnitApi from '../../apis/unit/addUnitApi'
import updateUnitLogoApi from '../../apis/unit/updateUnitLogoApi'
import { MyButton } from '../../components/MyButton'
import { useRecoilState } from 'recoil'
import { userState, unitState } from '../../states'

export function UnitMgtScreen() {
  const [userMe, setUserMe] = useRecoilState(userState)
  const [myUnit, setMyUnit] = useRecoilState(unitState)
  const [Unitname, setUnitname] = useState('')
  const [Unitslogan, setUnitslogan] = useState('')
  const [Logo, setLogo] = useState('')

  const updateUnitHandler = useCallback(async ({ Unitname, Unitslogan }) => {
    const res = await updateUnitApi({ Unitname, Unitslogan, Unit: userMe.Unit })
    if (res.Unitname) {
      Alert.alert('부대 정보가 변경되었습니다.')
    } else {
      Alert.alert(res.message)
    }
  }, [])

  const updateUnitLogoHandler = useCallback(async ({ Logo }) => {
    const res = await updateUnitLogoApi({ Logo, Unit: userMe.Unit })
    if (res.message) {
      Alert.alert(res.message)
    }
  }, [])

  useEffect(() => {
    setUnitname(myUnit.Unitname)
    setUnitslogan(myUnit.Unitslogan)
    setLogo(myUnit.Logo)
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view}>
        <ImagePicker
          imageUrl={Logo}
          setImageUrl={setLogo}
          text="부대 로고를 변경하려면 클릭."
          imgStyle={{ borderRadius: 0, borderWidth: 0, width: 85 }}
        />
        <TextInput
          label="부대 이름"
          placeholder={Unitname}
          dense={true}
          activeUnderlineColor="#008275"
          onChangeText={(Unitname) => setUnitname(Unitname)}
          style={styles.textInput}
        />
        <TextInput
          label="부대 슬로건"
          placeholder={Unitslogan}
          dense={true}
          activeUnderlineColor="#008275"
          onChangeText={(Unitslogan) => setUnitslogan(Unitslogan)}
          style={[styles.textInput, { marginBottom: 5 }]}
        />
      </View>
      <MyButton
        text="부대 정보 변경"
        onPress={() => {
          updateUnitHandler({ Unitname, Unitslogan })
          updateUnitLogoHandler({ Logo })
        }}
        style={{ marginTop: 15, width: '65%' }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  view: {
    width: '85%',
    alignItems: 'center',
    marginBottom: (20 / 812) * window.height,
  },
  textInput: {
    width: '100%',
    backgroundColor: 'white',
    marginBottom: (15 / 812) * window.height,
  },
})
