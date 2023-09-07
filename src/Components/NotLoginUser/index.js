import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { scaleHeight, scaleWidth } from '../../Constant/DynamicSize';
const style = StyleSheet.create({
    loginText: {
      color:'white'
    },
    loginBtnConatiner: {
        flex: 1,
        justifyContent: 'center',
    },
    loginButton: {
        backgroundColor: '#022A6D',
        padding: scaleHeight(20),
        alignSelf: 'center',
        width: scaleWidth(200),
        borderRadius: scaleHeight(5),
        alignItems: 'center',
        justifyContent: 'center'
    },
})
const NotLoginUser = ({ onloginPageClick }) => {
    return (
        <View style={style.loginBtnConatiner}>
            <TouchableOpacity onPress={onloginPageClick} style={style.loginButton}>
                <Text style={style.loginText}>Login</Text>
            </TouchableOpacity>
        </View>
    )
}
export default NotLoginUser;