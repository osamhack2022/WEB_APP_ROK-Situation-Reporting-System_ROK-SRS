import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View, FlatList, Text } from 'react-native'
import { TextInput } from 'react-native-paper'
import { ReportHeader } from '../../components/ReportHeader'
import { ReportContent } from '../../components/ReportContent'
import { ReportComment } from '../../components/ReportComment'
import { Colors } from 'react-native-paper'
import { useRecoilState } from 'recoil'
import { userState } from '../../states/userState'
import addCommentApi from '../../apis/addCommentApi'

const addCommentHandler = async ({ Type, Content, Title }) => {
  const res = await addCommentApi({ Type, Content, Title })
}

export function ReportScreen({ route }) {
  const { Title, isEnd, Content, severity, date, Type } = route.params

  const [userMe, setUserMe] = useRecoilState(userState)

  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])

  const ListHeaderComponent = () => (
    <View style={{ width: '100%', alignItems: 'center' }}>
      <ReportHeader
        Title={Title}
        isEnd={isEnd}
        severity={severity}
        date={date}
      />
      <ReportContent Content={Content} Type={Type} />
      <View
        style={{
          width: '95%',
          borderBottomWidth: 1,
          borderColor: Colors.grey500,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: '500', padding: 5 }}>
          Comments.
        </Text>
      </View>
    </View>
  )

  const renderItem = ({ item }) => {
    return (
      <ReportComment
        name={item.Name}
        position={item.position}
        Content={item.Content}
      />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={ListHeaderComponent}
        data={comments}
        renderItem={renderItem}
      />
      <TextInput
        style={styles.commentInput}
        placeholder="댓글을 입력하세요."
        activeUnderlineColor={Colors.green500}
        underlineColor={Colors.grey500}
        multiline={true}
        dense={true}
        onChangeText={(text) => setComment(text)}
        value={comment}
        right={
          <TextInput.Icon
            icon="send-circle-outline"
            size={30}
            color={Colors.green500}
            onPress={() => {
              setComments([
                ...comments,
                {
                  Name: userMe.Name,
                  position: userMe.Position,
                  Content: comment,
                },
              ])
              addCommentHandler({ Title, Type, Content: comment })
              setComment('')
            }}
          />
        }
      ></TextInput>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingBottom: 40,
  },

  commentInput: {
    bottom: 0,
    position: 'absolute',
    paddingTop: 5,
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: Colors.grey400,
    borderBottomWidth: 0,
  },
})
