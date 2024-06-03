import { Slot, Stack } from 'expo-router'
import { View, Text } from 'react-native'
import { hue } from '../../../../constants'

export default function MessageLayout() {
  return (
    <View style={{backgroundColor: hue.bgColor, flex:1 }}>
      <Slot/>
    </View>
  )
}