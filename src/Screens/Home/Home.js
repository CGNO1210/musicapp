import { View, Text } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/Header/Header'
import ListMusic from '../../components/ListMusic/ListMusic'
import PlayMusic from '../../components/PlayMusic/PlayMusic'
import { styles } from './Home.styles';
import { Audio } from 'expo-av';
import { music } from '../../music/index';

const Home = () => {
    const [soundObject, setSoundObject] = useState(new Audio.Sound());
    const [currentIndex, setcurrentIndex] = useState(0);
    const [isPlay, setIsPlay] = useState(false)
    const [isRandom, setIsRandom] = useState(false)
    const [isLooping, setIsLooping] = useState(false);
    const [isLoad, setIsLoad] = useState(false)
    const [duration, setDuration] = useState(0);
    const [position, setPosition] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);
    const intervalRef = useRef(null);

    const startUpdatingProgress = () => {
        intervalRef.current = setInterval(async () => {
            const { positionMillis } = await soundObject.getStatusAsync();
            setPosition(positionMillis);
        }, 1000); // Cập nhật vị trí mỗi giây
    };
    const seekSong = async (value) => {
        setIsSeeking(true);
        setPosition(value);
        await soundObject.setPositionAsync(value);
        setIsSeeking(false);
        if (!isPlay) {
            await soundObject.playAsync();
            setIsPlay(true);
        }
    };
    const formatTime = (milliseconds) => {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds - minutes * 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    useEffect(() => {
        loadSong(music[currentIndex].song)
        return () => {
        };
    }, []);

    const onPlaybackStatusUpdate = (status) => {
        if (!isLooping) {
            if (status.didJustFinish) {
                nextSong(1)
            }
        } else {
            if (!isRandom) {
                if (status.didJustFinish) {
                    nextSong(0)
                }
            } else {
                if (status.didJustFinish) {
                    randomSong()
                }
            }
        }
    };

    async function loadSong(sound) {
        try {
            if (isLoad) {
                await soundObject.stopAsync()
                await soundObject.unloadAsync();
            }
            await soundObject.loadAsync(sound);
            setIsLoad(true)
            const { durationMillis } = await soundObject.getStatusAsync();
            setDuration(durationMillis);
            startUpdatingProgress();
        } catch (error) {
            console.error('Error occurred while loading sound:', error);
        }
    }


    async function playSong() {
        try {
            await soundObject.playAsync();
            setIsPlay(true)
            soundObject.setIsLoopingAsync(isLooping);
            soundObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);//set event end song
        } catch (error) {
            console.log('Error playing sound: ', error);
        }
    }
    async function pauseSong() {
        try {
            await soundObject.pauseAsync();
            setIsPlay(false)
        } catch (error) {
            console.log('Error pausing sound: ', error);
        }
    }
    const nextSong = async (num) => {
        if (!isRandom) {
            const nextIndex = (currentIndex + num) % music.length;
            try {
                await soundObject.stopAsync()
                await soundObject.unloadAsync();
                await soundObject.loadAsync(music[nextIndex].song)
                // Sau khi tải bài hát mới, phát bài hát
                await soundObject.playAsync();
                setIsPlay(true);
                setcurrentIndex(nextIndex);
                const { durationMillis } = await soundObject.getStatusAsync();
                setDuration(durationMillis);
            } catch (error) {
                console.log('Error playing next sound', error);
            }
        } else {
            randomSong()
        }
    }
    const setSong = async (index) => {
        try {
            await soundObject.stopAsync()
            await soundObject.unloadAsync();
            await soundObject.loadAsync(music[index].song)
            // Sau khi tải bài hát mới, phát bài hát
            await soundObject.playAsync();
            setIsPlay(true);
            setcurrentIndex(index);
            const { durationMillis } = await soundObject.getStatusAsync();
            setDuration(durationMillis);
        } catch (error) {
            console.log('Error playing next sound', error);
        }
    }
    const prevSong = async () => {
        if (!isRandom) {
            const prevIndex = (currentIndex - 1 + music.length) % music.length;
            try {
                await soundObject.stopAsync()
                await soundObject.unloadAsync();
                await soundObject.loadAsync(music[prevIndex].song)
                // Sau khi tải bài hát mới, phát bài hát
                await soundObject.playAsync();
                setIsPlay(true);
                setcurrentIndex(prevIndex);
                const { durationMillis } = await soundObject.getStatusAsync();
                setDuration(durationMillis);
            } catch (error) {
                console.log('Error playing next sound', error);
            }
        } else {
            randomSong()
        }
    }
    const randomSong = async () => {
        const randomIndex = Math.floor(Math.random() * music.length);
        try {
            await soundObject.stopAsync()
            await soundObject.unloadAsync();
            await soundObject.loadAsync(music[randomIndex].song)
            // Sau khi tải bài hát mới, phát bài hát
            await soundObject.playAsync();
            setIsPlay(true);
            setcurrentIndex(randomIndex);
            const { durationMillis } = await soundObject.getStatusAsync();
            setDuration(durationMillis);
        } catch (error) {
            console.log('Error playing next sound', error);
        }
    }

    const toggleLooping = () => {
        setIsLooping(!isLooping);
    };
    const toggleRandom = () => {
        setIsRandom(!isRandom);
    };

    return (
        <View style={styles.container}>
            <Header name={music[currentIndex].name} />
            <PlayMusic
                playSong={playSong}
                pauseSong={pauseSong}
                nextSong={nextSong}
                prevSong={prevSong}
                toggleLooping={toggleLooping}
                isPlay={isPlay}
                isLooping={isLooping}
                toggleRandom={toggleRandom}
                isRandom={isRandom}
                img={music[currentIndex].image}
                position={position}
                formatTime={formatTime}
                duration={duration}
                seekSong={seekSong}
            />
            <ListMusic
                playSong={playSong}
                setSong={setSong}
                data={music}
                setcurrentIndex={setcurrentIndex}
                currentIndex={currentIndex} />
        </View>
    )
}

export default Home