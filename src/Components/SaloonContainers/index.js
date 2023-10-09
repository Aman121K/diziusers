import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
// import { Image } from 'react-native-svg';
import { Images } from '../../Constant/Images';
import { normalize, scaleHeight, scaleWidth } from '../../Constant/DynamicSize';
import { FONTS } from '../../Constant/fonts';
const style = StyleSheet.create({
    mainConatiner: {
        flex: 1
    },
    searchConatiner: {
        marginTop: scaleHeight(10)
    },
    dataContainer: {
        height: scaleHeight(211),
        width: scaleWidth(165),
        // borderWidth: 1,
        margin: scaleHeight(5),
        backgroundColor: 'white',
        borderRadius: scaleHeight(10)
    },
    dataMainContainer: {
        marginHorizontal: scaleWidth(16),
        alignSelf: 'center',
        marginTop: scaleHeight(20),
        marginBottom: scaleHeight(100)
    },
    dataImage: {
        // alignSelf: 'center'he
        height: scaleHeight(100),
        width: scaleWidth(160),
        borderRadius: scaleHeight(10)
    },
    unlikeButon: {
        position: 'absolute',
        alignSelf: 'flex-end'
    },
    startContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textConatiner: {
        marginHorizontal: scaleWidth(12),
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: scaleHeight(8)
    },
    sallonContainer: {
        flexDirection: 'row',
        marginHorizontal: scaleWidth(12),
        justifyContent: 'space-between',
        marginTop: scaleHeight(5)
    },
    locationContainer: {
        flexDirection: 'row',
        marginHorizontal: scaleWidth(12),
        marginTop: scaleHeight(4)
    },
    reviewtext: {
        fontSize: normalize(10),
        fontFamily: FONTS.MontserratRegular,
        color: '#FFB837',
        marginLeft: scaleWidth(4)
    },
    genderText: {
        fontSize: normalize(10),
        fontFamily: FONTS.MontserratRegular,
        color: "#7A7A7A"
    },
    saloonText: {
        fontFamily: FONTS.MontserratRegular,
        color: 'black',
        fontSize: normalize(10)
    },
    locationText: {
        fontSize: normalize(9),
        color: '#6C6C6C',
    }
})
const SaloonContainers = ({ item, onClick }) => {
    console.log("salon item>>>", item)
    return (
        <TouchableOpacity onPress={() => onClick(item)} style={style.dataContainer}>
            <Image source={Images.SALLON_BG_IMAGE} style={style.dataImage} />
            <TouchableOpacity style={style.unlikeButon}>
                <Image source={Images.UNLIKE} />
            </TouchableOpacity>
            <View style={style.textConatiner}>
                <View style={style.startContainer}>
                    <Image source={Images.STAR} />
                    <Text style={style.reviewtext}>3.5</Text>
                    <Text style={{ fontSize: normalize(10), marginLeft: scaleHeight(4), color: '#7A7A7A' }}>(12)</Text>
                </View>
                <View>
                    <Text style={style.genderText}>Male</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: scaleWidth(10) }}>
                <Text style={style.saloonText}>{item?.item?.salonName}</Text>
                <Text style={style.saloonText}>(Hair's cutting)</Text>
            </View>
            <View>
                <Text style={style.genderText}>{(item?.item?.title)}</Text>
            </View>
            <View style={style.locationContainer}>
                <Image source={Images.LOCATION} />
                <Text style={style.locationText}>10Km. Near Jagatpura Phatak</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: scaleWidth(15), marginTop: scaleHeight(5) }}>
                <Text style={style.saloonText}>Available slots:</Text>
                <Text style={style.locationText}>10.00 PM</Text>
            </View>
        </TouchableOpacity>
    )
}
export default SaloonContainers;