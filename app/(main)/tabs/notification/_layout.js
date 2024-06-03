import { Slot, Stack } from 'expo-router'
import { View, Text } from 'react-native'

export default function NotificationLayout() {
  return (
    <View style={{flex: 1}}>
      <Slot/>
    </View>
  )
}