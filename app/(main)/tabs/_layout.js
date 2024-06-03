import { Tabs } from 'expo-router'
import React from 'react'
import { hue } from '../../../constants'
import { StatusBar } from 'react-native'
import BottomTabBar from '../../../components/BottomTabBar'

export default function TabsLayout() {

  StatusBar.setBackgroundColor(hue.bgColor);

  return (
    <Tabs

      tabBar={props => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}

      sceneContainerStyle={{
        backgroundColor: hue.bgColor,
        marginTop: StatusBar.currentHeight
      }}>

      <Tabs.Screen name="home" />
      <Tabs.Screen name="wishlist" />
      <Tabs.Screen name="notification" />
      <Tabs.Screen name="message" />
      <Tabs.Screen name="settings" />

    </Tabs>
  )
}
