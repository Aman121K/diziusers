import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextConstant } from '../../Constant/TextConstant';
import { Images } from '../../Constant/Images';
import { normalize, scaleHeight, scaleWidth } from '../../Constant/DynamicSize';
import { FONTS } from '../../Constant/fonts';
const style = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#C8C8C8',
        marginHorizontal: scaleWidth(16),
        borderRadius: scaleWidth(10),
        flexDirection: 'row',
        paddingTop: scaleHeight(10),
        paddingLeft: scaleWidth(15),
        alignItems: 'center'
    },
    textStyle: {
        width: scaleWidth(200),
        fontSize: normalize(16),
        color: 'white',
        fontFamily: FONTS.MontserratRegular
    }, btnStyle: {
        backgroundColor: 'gray',
        alignItems: 'center',
        borderRadius: 20,
        margin: scaleHeight(10)
    },
    btntextStyle:{
            color:'white',
            fontSize:normalize(12),
            padding:scaleHeight(5)
    }
})
const UserAdsContainer = ({onClick}) => {
    return (
        <View style={style.mainContainer}>
            <View>
                <Text style={style.textStyle}>{TextConstant.USER_ADS_TEXT}</Text>
                <Text style={style.textStyle}>See your new styles</Text>
                <TouchableOpacity onPress={onClick} style={style.btnStyle}>
                    <Text style={style.btntextStyle}>Recommended Me</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Image source={Images.USERS_ADS} />
            </View>
        </View>
    )
}
export default UserAdsContainer;