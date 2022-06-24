import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

const GroupSettings = () => {
    const navigation = useNavigation()
    const route = useRoute()
  return (
    <View>
      <Text>GroupSettings</Text>
    </View>
  )
}

export default GroupSettings