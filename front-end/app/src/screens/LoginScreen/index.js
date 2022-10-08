import React, { useState, useEffect, useCallback } from 'react'
//prettier-ignore
import { Image, SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { styles } from './style'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import { GuideText } from '../../components/GuideText'
import AppLoading from 'expo-app-loading'
import { Alert } from 'react-native'

const loginHandler = ({ dodId, password }, cb) => {
  fetch('https://1bd7-14-7-194-69.jp.ngrok.io/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ dodId, password }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res.message)
      if (res.status === '200') cb()
      else {
        Alert.alert(res.message)
      }
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
