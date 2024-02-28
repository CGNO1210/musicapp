import { View, Text, Image, TouchableOpacity } from 'react-native'
import Slider from '@react-native-community/slider';
import React, { useEffect } from 'react'
import { styles } from './PlayMusic.styles';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../themes/colors';

const PlayMusic = ({ playSong, pauseSong, nextSong, isRandom, toggleRandom, prevSong,
  toggleLooping, isPlay, isLooping, img, position, formatTime, duration, seekSong }) => {
  const handlePlaySong = () => {
    if (isPlay) {
      pauseSong()
    } else {
      playSong()
    }
  }
  const handleNextSong = () => {
    nextSong(1)
  }
  const handlePrevSong = () => {
    prevSong()
  }
  const handleLoop = () => {
    toggleLooping()
  }
  const handleRandom = () => {
    toggleRandom()
  }
  const handleSeek = (position) => {
    seekSong(position)
  }
  useEffect(() => {

  }, [position])
  return (
    <View style={styles.container}>
      <Image
        source={img}
        style={styles.imageSong} />
      <View style={styles.controlMusic}>
        <Ionicons
          onPress={handleLoop}
          color={isLooping ? colors.main : colors.black}
          style={styles.icon} name='refresh' />
        <TouchableOpacity
          onPress={handlePrevSong} >
          <Ionicons style={styles.icon} name='play-skip-back' />
        </TouchableOpacity>
        <Ionicons
          onPress={handlePlaySong}
          style={styles.iconPlay}
          name={isPlay ? 'pause' : 'play'} />
        <TouchableOpacity
          onPress={handleNextSong}
        >
          <Ionicons style={styles.icon} name='play-skip-forward' />
        </TouchableOpacity>
        <Ionicons
          onPress={handleRandom}
          color={isRandom ? colors.main : colors.black}
          style={styles.icon}
          name='shuffle' />
      </View>
      <View
        style={styles.slide}
      >
        <Slider
          style={styles.slideBar}
          minimumTrackTintColor={colors.main}
          maximumTrackTintColor={colors.black}
          thumbTintColor={colors.main}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onValueChange={handleSeek}
        />
        <Text>{`${position ? formatTime(position) : '0:00'}/${formatTime(duration)}`}</Text>
      </View>

    </View>
  )
}

export default PlayMusic