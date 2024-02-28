import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './Header.styles';

const Header = ({ name }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label1}>NOW PLAYING:</Text>
      <Text style={styles.label2}>{name}</Text>
    </View>
  )
}

export default Header