import React, { useState, useEffect } from 'react'
import { FAB, Avatar, Colors, List } from 'react-native-paper'
//prettier-ignore
import { SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useRecoilState } from 'recoil'
import { userState } from '../../states'
import getAllUsersApi from '../../apis/user/getAllUsersApi'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import { convertRank } from '../../helperfunctions/convertRank'

export function UserMgtScreen() {
  let [fontsLoaded] = useNunitoFonts()
  const navigation = useNavigation()
  const [userMe, setUserMe] = useRecoilState(userState)
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getAllUsersHandler = async () => {
      const res = await getAllUsersApi(userMe.Unit)
      setUsers(res)
    }
    getAllUsersHandler()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.view}>
        <List.Section>
          {users &&
            users.map((user) => (
              <List.Item
                title={`${convertRank(user.Rank)} ${user.Name}`}
                description={`초대코드: ${user.Invcode}`}
                left={() => (
                  <Avatar.Image
                    source={{ uri: user.pic || dftPic }}
                    size={40}
                    style={{
                      alignSelf: 'center',
                      marginLeft: 15,
                      marginRight: 5,
                      backgroundColor: Colors.grey400,
                    }}
                  />
                )}
                right={() => (
                  <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={styles.btnText}>Delete</Text>
                  </TouchableOpacity>
                )}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.grey200,
                  padding: 0,
                  paddingVertical: 3,
                }}
                titleStyle={{
                  fontSize: 15,
                  fontFamily: 'NunitoSans_400Regular',
                }}
                descriptionStyle={{
                  fontSize: 12,
                  fontFamily: 'NunitoSans_300Light',
                  color: Colors.grey800,
                }}
                key={user._id}
              />
            ))}
        </List.Section>
      </ScrollView>
      <FAB
        icon="account-plus"
        style={styles.fab}
        color="white"
        onPress={() =>
          navigation.navigate('SettingNavigator', { screen: 'UserAddScreen' })
        }
      />
    </SafeAreaView>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  view: {
    width: '100%',
  },
  item: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey300,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fab: {
    backgroundColor: '#009572',
    borderRadius: 60,
    height: 55,
    width: 55,
    position: 'absolute',
    bottom: 25,
    right: 25,
  },
  image: {
    backgroundColor: Colors.grey500,
    marginRight: 5,
  },
  text: {
    fontFamily: 'NunitoSans_400Regular',
  },
  posText: {
    fontFamily: 'NunitoSans_400Regular',
    color: Colors.grey500,
  },
  btnText: {
    fontFamily: 'NunitoSans_400Regular',
    color: Colors.red400,
    marginRight: 15,
    marginTop: 15,
  },
})
