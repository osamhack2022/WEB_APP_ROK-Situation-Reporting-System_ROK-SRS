import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigator from './src/navigation/MainNavigator'
import 'react-native-gesture-handler'
import { Colors } from 'react-native-paper'
import { RecoilRoot } from 'recoil'

export default function App() {
  return (
    <NavigationContainer>
      <RecoilRoot>
        <StatusBar style="light-content" backgroundColor={Colors.grey500} />
        <MainNavigator />
      </RecoilRoot>
    </NavigationContainer>
  )
}
