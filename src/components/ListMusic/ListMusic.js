import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { styles } from './ListMusic.styles';
import { Ionicons } from '@expo/vector-icons';
import { Shadow } from 'react-native-shadow-2';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const ListMusic = ({ data, setcurrentIndex, setSong, currentIndex }) => {

  const flatListRef = useRef(null);

  useEffect(() => {
    scrollToCurrentSong();
  }, [currentIndex]);

  const scrollToCurrentSong = () => {
    flatListRef.current.scrollToIndex({ animated: true, index: currentIndex });
  };

  const renderItem = ({ item, index }) => {
    let isActive = index === currentIndex ? 'Active' : ''
    return (
      <Shadow
        distance={5}
        style={styles.shadow}>
        <TouchableOpacity
          onPress={() => {
            setcurrentIndex(index)
            setSong(index)
            // playSong()
          }}
          style={[styles.song, styles[`bg${isActive}`]]}>
          <Image source={item.image} style={styles.imageSong} />
          <View style={styles.infoSong}>
            <Text style={[styles.name, styles[`text${isActive}`]]}>{item.name}</Text>
            <Text style={[styles.singer, styles[`text${isActive}`]]}>{item.singer}</Text>
          </View>
          <Ionicons style={[styles.more, styles[`text${isActive}`]]}
            name='ellipsis-horizontal' />
        </TouchableOpacity>
      </Shadow>
    )
  }
  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        showsVerticalScrollIndicator={false}
        data={data} renderItem={renderItem} />
    </View>
  )
}

export default ListMusic