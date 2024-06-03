import ScreenHeader from 'components/ScreenHeader';
import { hue } from '../../../../constants';
import React, { useState } from 'react';
import { View, Text, Modal, Button, StyleSheet, ScrollView, Image } from 'react-native';
import { Divider } from '@rneui/themed';


const notifications = {
  "New": [
    { photo: require('../../../../assets/images/lodge-5.jpg'), text: "This information about Camico Lodge has been updated.", time: new Date() },
  ],
  "Today": [
    { photo: require('../../../../assets/images/lodge-5.jpg'), text: "This information about Camico Lodge has been updated.", time: new Date() },
    { photo: require('../../../../assets/images/lodge-5.jpg'), text: "This information about Camico Lodge has been updated.", time: new Date() }
  ],
  "This week": [
    { photo: require('../../../../assets/images/lodge-5.jpg'), text: "This information about Camico Lodge has been updated.", time: new Date() },
    { photo: require('../../../../assets/images/lodge-5.jpg'), text: "This information about Camico Lodge has been updated.", time: new Date() },
    { photo: require('../../../../assets/images/lodge-5.jpg'), text: "This information about Camico Lodge has been updated.", time: new Date() }
  ],
  "Older": [
    { photo: require('../../../../assets/images/lodge-5.jpg'), text: "This information about Camico Lodge has been updated.", time: new Date() },
    { photo: require('../../../../assets/images/lodge-5.jpg'), text: "This information about Camico Lodge has been updated.", time: new Date() },
    { photo: require('../../../../assets/images/lodge-5.jpg'), text: "This information about Camico Lodge has been updated.", time: new Date() },
    { photo: require('../../../../assets/images/lodge-5.jpg'), text: "This information about Camico Lodge has been updated.", time: new Date() },
    { photo: require('../../../../assets/images/lodge-5.jpg'), text: "This information about Camico Lodge has been updated.", time: new Date() },
    { photo: require('../../../../assets/images/lodge-5.jpg'), text: "This information about Camico Lodge has been updated.", time: new Date() },
  ]
}

export default function Notification() {

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader pageTitle={'Notifications'} />

      <ScrollView>
        {Object.keys(notifications).map((key: keyof typeof notifications, idx) => (
          <View style={{ padding: 15, gap: 12 }} key={idx}>
            <Text style={{ display: "flex", fontSize: 20, fontWeight: '700' }}>{key}</Text>
            {notifications[key]?.map((list, idx) => (
              <View style={{ width: '80%', flexDirection: 'row', gap: 15 }} key={idx}>
                <View style={{ width: 44, height: 44 }}>
                  <Image source={list.photo} style={{ width: 44, height: 44, borderRadius: 5 }} />
                </View>
                <Text style={{ fontSize: 16, color: hue.primary }}>{list.text}</Text>
                <Text style={{ fontSize: 14, color: hue.primaryLight }}>3h</Text>
              </View>
            ))}
            {idx !== Object.keys(notifications).length - 1 && (
              <Divider />
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({

});