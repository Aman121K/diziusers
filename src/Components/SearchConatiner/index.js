import React from 'react';
import { Image, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { TextConstant } from '../../Constant/TextConstant';
import { Images } from '../../Constant/Images';
import { normalize, scaleHeight, scaleWidth } from '../../Constant/DynamicSize';
import { FONTS } from '../../Constant/fonts';
const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        padding: scaleHeight(Platform.OS === 'ios' ? 10 : 2),
        marginHorizontal: scaleWidth(12),
        borderColor: '#CECECE',
        borderRadius: scaleWidth(5),
        alignItems: 'center'
    },
    inputStyle: {
        marginLeft: scaleWidth(20),
        fontSize: normalize(14),
        fontFamily: FONTS.MontserratRegular,
        width: "90%"
    }
})
const SearchConatiner = ({ placeholdertext, onChangeText, value }) => {
    return (
        <View style={styles.mainContainer}>
            <Image style={{marginLeft:scaleWidth(10)}} source={Images.SEARCH_ICON} />
            <TextInput
                style={styles.inputStyle}
                onChangeText={(e) => onChangeText(e)}
                value={value}
                placeholder={placeholdertext ? placeholdertext : TextConstant.SEARCH_TEXT} />
        </View>
    )
}
export default SearchConatiner;