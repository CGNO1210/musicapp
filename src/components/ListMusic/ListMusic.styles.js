import { StyleSheet } from 'react-native'
import { colors } from '../../themes/colors'

export const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: colors.gray,
        flex: 1,
    },
    song: {
        height: 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 5,
        borderColor: colors.white,
        alignItems: 'center',
        marginBottom: 20,

    },
    imageSong: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    infoSong: {
        flex: 1,
        marginLeft: 15
    },
    name: {
        fontSize: 18,
        fontWeight: '600'
    },
    singer: {
        fontSize: 14,
        fontWeight: '400'
    },
    more: {
        fontSize: 20
    },
    text: {
        color: colors.black
    },
    textActive: {
        color: colors.white
    },
    shadow: {
        width: '99%',
    },
    bg:{
        backgroundColor: colors.white
    },
    bgActive:{
        backgroundColor: colors.main
    },
})