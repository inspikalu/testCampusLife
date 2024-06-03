import { Slot, Stack } from 'expo-router'
import { View, Text } from 'react-native'

export default function SettingsLayout() {
  return (
    <View style={{flex: 1}}>
      <Slot/>
    </View>
  )
}