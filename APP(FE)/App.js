import React from 'react'
import { StatusBar, LogBox } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigator from './src/navigation/MainNavigator'
import 'moment/locale/ko'

import 'react-native-gesture-handler'
import { Colors } from 'react-native-paper'
import { RecoilRoot } from 'recoil'

export default function App() {
  LogBox.ignoreAllLogs() //Ignore all log notifications

  return (
    <NavigationContainer>
      <RecoilRoot>
        <StatusBar style="light-content" backgroundColor={Colors.grey500} />
        <MainNavigator />
      </RecoilRoot>
    </NavigationContainer>
  )
}
