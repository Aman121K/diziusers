import React from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Images } from "../../Constant/Images";
import { TextConstant } from "../../Constant/TextConstant";
import { normalize, scaleHeight, scaleWidth } from "../../Constant/DynamicSize";
import { FONTS } from "../../Constant/fonts";
import moment from "moment";
const style = StyleSheet.create({
    mainConatiner: {
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: scaleHeight(5),
        borderRadius: scaleHeight(5),
        marginTop: scaleHeight(5)
    },
    titleConatiner: {
        marginLeft: scaleWidth(5)
    },
    titleText: {
        fontSize: normalize(16),
        fontFamily: FONTS.MontserratMedium,
        lineHeight: scaleHeight(20)
    },
    subtitleText: {
        fontSize: normalize(10)
    }
})
const TrendingLists = ({ onClick, data }) => {
    return (
        <TouchableOpacity style={style.mainConatiner} onPress={onClick}>
            <Image source={Images.CHOTI_DESIGN} />
            <View style={style.titleConatiner}>
                <Text style={style.titleText}>{data?.item?.title}</Text>
                <Text style={style.subtitleText}>{data?.item?.description}</Text>
                <Text>{moment(data?.item?.createdAt).format('DD-MM-YYYY')}</Text>
            </View>
        </TouchableOpacity>
    )
}
export default TrendingLists;