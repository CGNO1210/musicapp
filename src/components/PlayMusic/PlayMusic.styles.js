import { StyleSheet } from 'react-native'
import { colors } from '../../themes/colors'

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    imageSong: {
        width: 200,
        height: 200,
        borderRadius: 200,
        marginVertical: 15
    },
    controlMusic: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        marginTop: 15
    },
    icon: {
        fontSize: 36
    },
    iconPlay: {
        fontSize: 36,
        backgroundColor: colors.main,
        color: colors.white,
        borderRadius: 100,
        padding: 15
    },
    slide: {
        width: '90%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
        justifyContent: 'space-between'
    },
    slideBar: {
        flex: 1
    }
})