import { StyleSheet } from 'react-native'
import {colors} from '../../themes/colors';

export const styles = StyleSheet.create({
    container: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label1:{
        fontSize: 16,
        fontWeight: '700',
        color: colors.main
    },
    label2:{
        fontSize: 22,
        fontWeight:'800',
        color: colors.black
    },
})