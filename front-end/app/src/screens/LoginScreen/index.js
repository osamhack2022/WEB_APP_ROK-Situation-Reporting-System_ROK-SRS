import React, { useState, useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { userState } from '../../states/userState'
//prettier-ignore
import { Image, SafeAreaView, View, Text, TouchableOpacity, Alert } from 'react-native'
import { TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { styles } from './style'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import { GuideText } from '../../components/GuideText'
import AppLoading from 'expo-app-loading'
import loginApi from '../../apis/loginApi'

const [userMe, setUserMe] = useRecoilState(userState)

const loginHandler = async ({ DoDID, password }, cb) => {
  const res = await loginApi({ DoDID, password })
  const token = res.token
  if (token) localStorage.setItem('roksrs-token', token)
  if (localStorage.getItem('roksrs-token')) {
    setUserMe({
      Name: res.Name,
      DoDID: res.DoDID,
      Rank: res.Rank,
      Type: res.Type,
      Position: res.Position,
      email: res.email,
      pic: res.pic,
      is_activated: true,
    })
    cb()
  } else {
    Alert.alert(res.message)
  }
}

export function LoginScreen() {
  let [fontsLoaded] = useNunitoFonts()

  const [DoDID, setDoDID] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(true)

  const navigation = useNavigation()

  const goChatNavigator = useCallback(
    () => navigation.navigate('ChatNavigator'),
    []
  )
  const goSignUpScreen = useCallback(
    () => navigation.navigate('SignUpScreen'),
    []
  )

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoView}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logoImage}
        />
      </View>
      <View style={styles.loginView}>
        <TextInput
          label="군 번"
          dense={true}
          activeUnderlineColor="#008275"
          style={styles.loginTextInput}
          onChangeText={(DoDID) => setDoDID(DoDID)}
        />
        <View style={styles.guideTextView}>
          <GuideText guideText={`2x-xxxxxxxx`} />
        </View>
        <TextInput
          label="비밀번호"
          dense={true}
          activeUnderlineColor="#008275"
          secureTextEntry={passwordVisible}
          right={
            <TextInput.Icon
              icon={passwordVisible ? 'eye' : 'eye-off'}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
          style={styles.loginTextInput}
          onChangeText={(password) => setPassword(password)}
        />
        <View style={styles.guideTextView}>
          <GuideText guideText={`${password.length}/15`} />
        </View>
        <TouchableOpacity
          onPress={() => loginHandler({ DoDID, password }, goChatNavigator)}
          style={styles.loginButtonView}
        >
          <Text style={styles.LoginText}>로 그 인</Text>
        </TouchableOpacity>
        <View style={styles.signUpView}>
          <TouchableOpacity>
            <Text style={styles.signUpText}>비밀번호 찾기</Text>
          </TouchableOpacity>
          <Text style={{ marginLeft: 20, marginRight: 20 }}>|</Text>
          <TouchableOpacity onPress={goSignUpScreen}>
            <Text style={styles.signUpText}>사용신청</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}
