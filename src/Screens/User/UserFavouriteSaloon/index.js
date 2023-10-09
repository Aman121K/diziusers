import React from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import UserCartHeader from "../../../Components/UserCartHeader";
import { TextConstant } from "../../../Constant/TextConstant";
import SearchNearSaloon from "../../../Components/SearchNearSaloon";
import { normalize, scaleHeight, scaleWidth } from "../../../Constant/DynamicSize";
import { Images } from "../../../Constant/Images";
import { FONTS } from "../../../Constant/fonts";
import { Routes } from "../../../Constant/Routes";
import SaloonContainers from "../../../Components/SaloonContainers";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
        // fontFamily:FONTS.MontserratRegular,
        color: "#7A7A7A"
    },
    saloonText: {
        // fontFamily:FONTS.MontserratRegular,
        color: 'black',
        fontSize: normalize(10)
    },
    locationText: {
        fontSize: normalize(9),
        color: '#6C6C6C'
    }
})
const UserFavouriteSaloon = ({ navigation }) => {
    const [sallonListData, setSallonListData] = React.useState([
        { title: 'Hair Cutting', Image: Images.SALLON_BG_IMAGE },
        { title: 'Hair Cutting', Image: Images.SALLON_BG_IMAGE },
    ])
    React.useLayoutEffect(async () => {
        const data = await AsyncStorage.getItem('recomendedsaloon');
        if (data) {
            setSallonListData(JSON.parse(data))
        }
    }, [])
    React.useEffect(()=>{

    },[])

    const gotoSaloonDetailsPage = (item) => {
        navigation.navigate(Routes.UserSaloonDetails, { data: item?.item })
    }
    const renderData = (item) => {
        return (
            <SaloonContainers onClick={gotoSaloonDetailsPage} item={item} />
        )
    }
    return (
        <SafeAreaView style={style.mainConatiner}>
            <UserCartHeader navigation={navigation} isBackhide={false} title={TextConstant.SEARCH_FOR_SERVICE} />
            <View style={style.searchConatiner}>
                <SearchNearSaloon text={TextConstant.SEARCH__HAIR_CUTTING_SALON} />
            </View>
            <View style={style.dataMainContainer}>
                <FlatList
                    data={sallonListData}
                    renderItem={renderData}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    )
}
export default UserFavouriteSaloon;