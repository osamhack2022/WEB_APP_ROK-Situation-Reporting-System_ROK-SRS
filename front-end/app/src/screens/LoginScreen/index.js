import React, { useState, useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { LoginState } from '../../states/LoginState'
//prettier-ignore
import { Image, SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { styles } from './style'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import { GuideText } from '../../components/GuideText'
import AppLoading from 'expo-app-loading'
import URL from '../../../url'

const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState)

const loginHandler = ({ dodId, password }, cb) => {
  fetch(URL + '/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ dodId, password }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res.message)
      const token = res.token
      if (token) localStorage.setItem('rok-srs-token', token)
      if (localStorage.getItem('rok-srs-token')) setIsLoggedIn(true)
      cb()
    })
    .catch((error) => console.error(error))
}

export function LoginScreen() {
  let [fontsLoaded] = useNunitoFonts()

  const [dodId, setDodId] = useState('')
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

  console.log(process.env.URL)
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
          onChangeText={(dodId) => setDodId(dodId)}
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
          onPress={() => loginHandler({ dodId, password }, goChatNavigator)}
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
