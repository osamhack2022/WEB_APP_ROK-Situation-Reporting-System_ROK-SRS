import React from 'react'
import * as ExpoImagePicker from 'expo-image-picker'
import { Pressable, Image, Text, View } from 'react-native'
import { styles } from './style'

const dftPic =
  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'

export function ImagePicker(props) {
  const [status, requestPermission] =
    ExpoImagePicker.useMediaLibraryPermissions()

  const uploadImage = async () => {
    // 권한 확인 코드
    if (!status?.granted) {
      const permission = await requestPermission()
      if (!permission.granted) {
        return null
      }
    }
    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      allowEditing: true,
      quality: 1,
      aspect: [1, 1],
    })
    if (result.cancelled) {
      return null // 이미지 업로드 취소한 경우
    }
    console.log(result)
    props.setImageUrl(result.uri)
  }

  return (
    <Pressable onPress={uploadImage} style={[styles.pressable, props.style]}>
      <Image source={{ uri: props.imageUrl || dftPic }} style={styles.image} />
    </Pressable>
  )
}
