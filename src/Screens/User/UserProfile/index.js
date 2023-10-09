import React from "react";
import { Alert, FlatList, Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import UserProfileHeader from "../../../Components/UserProfileHeader";
import { Images } from "../../../Constant/Images";
import { normalize, scaleHeight, scaleWidth } from "../../../Constant/DynamicSize";
import { FONTS } from "../../../Constant/fonts";
import { Routes } from "../../../Constant/Routes";
import NotLoginUser from "../../../Components/NotLoginUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
const style = StyleSheet.create({
    dataContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: scaleHeight(10),
        paddingVertical: scaleHeight(23),
        width: '90%',
        alignSelf: 'center',
        borderRadius: scaleHeight(10),
        paddingHorizontal: scaleHeight(23)
    },
    listConatinet: {
        marginTop: scaleHeight(13),
        marginBottom: Platform.OS === 'ios' ? scaleHeight(260) : scaleHeight(310)
    },
    profileConatiner: {
        flex: 1
    },
    titleStyle: {
        marginLeft: scaleWidth(10),
        fontSize: normalize(14),
        fontFamily: FONTS.MontserratRegular,
        color: '#000'
    },
    loginButton: {
        backgroundColor: '#022A6D',
        padding: scaleHeight(10),
        alignSelf: 'center',
        width: scaleWidth(200),
        borderRadius: scaleHeight(5),
        alignItems: 'center'
    },
    loginText: {
        color: 'white'
    },
    loginBtnConatiner: {
        flex: 1,
        justifyContent: 'center',
    }
})
const UserProfile = ({ navigation }) => {
    const [loginValues, setLoginValues] = React.useState();
    const [loginData, setLoginData] = React.useState([
        { title: 'My Booking', Image: Images.BOTTOM_BOOKING },
        { title: 'My Favourite Salon', Image: Images.BOTTOM_BOOKING },
        { title: 'Refer & Earn', Image: Images.BOTTOM_BOOKING },
        { title: 'Contact Us', Image: Images.BOTTOM_BOOKING },
        { title: 'FeedBack', Image: Images.BOTTOM_BOOKING },
        { title: 'Reviews', Image: Images.BOTTOM_BOOKING },
        { title: 'App Version', Image: Images.BOTTOM_BOOKING },
        { title: 'Privacy Policy', Image: Images.BOTTOM_BOOKING },
        { title: 'Logout', Image: Images.BOTTOM_BOOKING },
    ])
    React.useEffect(() => {
        getLoginData()
    }, [])
    const getLoginData = async () => {
        console.log("Call api ")
        let data = await AsyncStorage.getItem('loginData');
        // console.log("Data>>",data)
        if (data) {
            setLoginValues(JSON.parse(data));
        }
    }
    const gotoPage = (item) => {
        console.log(item)
        switch (item) {
            case 'My Booking':
                navigation.navigate('UserBottomNavigtion')
                break;
            case 'My Favourite Salon':
                navigation.navigate(Routes.UserFavouriteSaloon)
                break;
            case 'Refer & Earn':
                navigation.navigate(Routes.ReferEarn)
                break;
            case 'Contact Us':
                navigation.navigate(Routes.ContactUs)
                break;
            case 'FeedBack':
                navigation.navigate(Routes.FeedBack)
                break;
            case 'App Version':
                navigation.navigate(Routes.AppVersion)
                break;
            case 'Privacy Policy':
                navigation.navigate(Routes.PrivacyPolicy)
                break;
            case 'Reviews':
                // Alert.alert('review')
                navigation.navigate(Routes.Reviews)

                break;
            case 'Logout':
                navigation.navigate(Routes.Signin)
                break;



            default:
                break;
        }
    }
    const renderItems = (item) => {
        return (
            <TouchableOpacity style={style.dataContainer} onPress={() => gotoPage(item?.item?.title)}>
                <Image source={item?.item?.Image} />
                <Text style={style.titleStyle}>{item.item.title}</Text>
            </TouchableOpacity>
        )
    }
    const onEditClick = () => {
        navigation.navigate(Routes.ProfileDetials)
    }
    const goToLoginPage = () => {
        navigation.navigate(Routes.Signin)
    }
    return (
        <SafeAreaView style={style.profileConatiner}>
            {loginValues ?
                <>
                    <UserProfileHeader data={loginValues} naigation={navigation} onEditButtonClick={onEditClick} />
                    <View style={style.listConatinet}>
                        <FlatList
                            data={loginData}
                            renderItem={renderItems}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </> :
                <NotLoginUser onloginPageClick={goToLoginPage} />
            }
        </SafeAreaView>
    )
}
export default UserProfile;