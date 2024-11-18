import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import SaveContainer from '../components/Save/SaveContainer'
import TabContainers from '../components/Profiles/TabContainers'

export default function Saved() {
  return (

    <View style={{ flex: 1, paddingHorizontal: 17, backgroundColor: 'white'}}>
      <SaveContainer /> 
    </View>

  )
}