import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as NavigationBar from 'expo-navigation-bar'; 
import { StyleSheet, Text, View } from 'react-native';
import { Redirect, Tabs, Stack, Slot} from 'expo-router';
import { useStateValue } from '../../state-provider';
import { hue } from '../../constants';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [state, _] = useStateValue()

  StatusBar.setBackgroundColor(hue.bgColor);
  StatusBar.setBarStyle('dark-content');
  NavigationBar.setButtonStyleAsync("dark")
  NavigationBar.setBackgroundColorAsync(hue.bgColor)

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here

      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
       
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  if(!state.signedUp){
    return <Redirect href="/sign-up" />
  }

  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: hue.bgColor }}
      onLayout={onLayoutRootView}>
      <Redirect href="/tabs/home"/>
    </View>
  );
}