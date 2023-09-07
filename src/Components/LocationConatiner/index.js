import React from "react";
import { Image, Platform, StyleSheet, TextInput, TouchableOpacity, View ,Text} from 'react-native';
import { Images } from "../../Constant/Images";
import { TextConstant } from "../../Constant/TextConstant";
import { normalize, scaleHeight, scaleWidth } from "../../Constant/DynamicSize";
import { FONTS } from "../../Constant/fonts";
// import { Text } from "react-native-svg";
const style = StyleSheet.create({
    mainCOatiner: {
        borderWidth: 1,
        flexDirection: 'row',
        padding: Platform.OS === 'ios' ? scaleHeight(8.5) : scaleHeight(1),
        marginHorizontal: scaleWidth(16),
        borderColor: '#FFFFFF',
        borderRadius: scaleHeight(5),
        backgroundColor: 'white',
        alignItems: 'center',
        padding:scaleHeight(10)
    },
    location: {
        // marginLeft: scaleWidth(19.5),
        // marginRight: scaleWidth(8.2),
        alignSelf: 'center'
    },
    textInput: {
        fontSize: normalize(12),
        fontFamily: FONTS.MontserratRegular,
        lineHeight: scaleHeight(14.63),
        color: '#858585',
        width: '100%',
        marginLeft:scaleWidth(10)
    }
})
const LocationConatiner = ({ locationClick,loationDetails }) => {
    console.log("loationDetails>>",loationDetails)
    return (
        <View style={style.mainCOatiner}>
            <TouchableOpacity onPress={locationClick}>
                <Image style={style.location} source={Images.LOCATION} />
            </TouchableOpacity>
            <Text  style={style.textInput}>{loationDetails}</Text>
        </View>
    )
}
export default LocationConatiner;