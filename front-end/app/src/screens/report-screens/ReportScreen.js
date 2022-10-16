import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text, FlatList } from 'react-native'
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
    </View>
  )

  const renderItem = ({ item }) => {
    return (
      <ReportComment
        name={item.name}
        position={item.position}
        text={item.text}
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
      <View style={styles.commentInputView}>
        <TextInput
          style={styles.commentInput}
          placeholder="댓글을 입력하세요."
          multiline={true}
          dense={true}
          onChangeText={(text) => setComment(text)}
          value={comment}
          right={
            <TextInput.Icon
              icon="send-circle-outline"
              size={30}
              color={Colors.blue400}
              onPress={() => {
                setComments([
                  ...comments,
                  {
                    name: userMe.Name,
                    position: userMe.Position,
                    text: comment,
                  },
                ])
                addCommentHandler({ Title, Type, Content: comment })
              }}
            />
          }
        ></TextInput>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  commentInputView: {
    bottom: 0,
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  commentInput: {
    width: '100%',
  },
})
