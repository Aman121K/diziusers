import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, PermissionsAndroid, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import UserHeader from "../../../Components/UserHeader";
import LocationConatiner from "../../../Components/LocationConatiner";
import { normalize, scaleHeight, scaleWidth } from "../../../Constant/DynamicSize";
import { TextConstant } from "../../../Constant/TextConstant";
import { FONTS } from "../../../Constant/fonts";
import { Images } from "../../../Constant/Images";
import SearchNearSaloon from "../../../Components/SearchNearSaloon";
import UserAdsContainer from "../../../Components/UserAdsContainer";
import LocationBottomSheet from "../../../Components/LocationBottomSheet";
import RBSheet from "react-native-raw-bottom-sheet";
import Geolocation from '@react-native-community/geolocation';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { getLocationName } from "../../../Utils";
import { Routes } from "../../../Constant/Routes";
const { width } = Dimensions.get('window');
const itemWidth = 50;
const style = StyleSheet.create({
    mainConatiner: {

    },
    locationConainer: {
        marginTop: scaleHeight(9.5)
    },
    categoriesConatiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: scaleWidth(16),
        alignItems: 'center'
    },
    categoryText: {
        fontSize: normalize(16),
        fontFamily: FONTS.MontserratSemiBold,
        color:'black'
    },
    knowmoreText: {
        fontFamily: FONTS.MontserratRegular,
        fontSize: normalize(12),
        color: '#022A6D'
    },
    itemConatiner: {
        width: 100,
        alignSelf: 'center'
    },
    title: {
        fontSize: normalize(12),
        fontWeight: '500',
        lineHeight: scaleHeight(15),
        color: "black"
    },
    searchConatiner: {
        marginTop: scaleHeight(20)
    },
    userContainer: {
        marginTop: scaleHeight(20)
    },
    trendingText: {
        fontSize: normalize(15),
        fontFamily: FONTS.MontserratBold,
        color: 'black'
    },
    ImageConatiner: {
        marginHorizontal: scaleWidth(18),
        marginTop: scaleHeight(8)
    },
    imageStyle: {
        height: 100,
        width: 100
    },
    adsText: {
        fontSize: normalize(16),
        fontFamily: FONTS.MontserratBold,
        color: 'black'
    },
    showMoreText: {
        fontFamily: FONTS.MontserratMedium,
        color: '#022A6D'
    },
    tredingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: scaleHeight(24)
    },
    articalDesign: {
        borderWidth: 1,
        borderColor: 'white',
        padding: scaleHeight(5),
        alignItems: 'center',
        margin: scaleHeight(10),
        backgroundColor: 'white',
        borderRadius: scaleHeight(5)
        // alignSelf: 'center'
    }
})
const UserHome = ({ navigation }) => {
    const [crausalData, setCrasualData] = React.useState([
        {
            title: 'First'
        },
        {
            title: 'second'
        },
        {
            title: 'third'
        },
        {
            title: 'third'
        },
        {
            title: 'third'
        }
    ])
    const refRBSheet = React.useRef();
    const [location, setLocation] = React.useState(null);
    const [currentPlaceName, setCurrentPlaceName] = React.useState();
    const [
        currentLongitude,
        setCurrentLongitude
    ] = useState('...');
    const [
        currentLatitude,
        setCurrentLatitude
    ] = useState('...');
    const [
        locationStatus,
        setLocationStatus
    ] = useState('');
    useEffect(() => {
        const requestLocationPermission = async () => {
            if (Platform.OS === 'ios') {
                getOneTimeLocation();
                subscribeLocationLocation();
            } else {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: 'Location Access Required',
                            message: 'This App needs to Access your location',
                        },
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        //To Check, If Permission is granted
                        getOneTimeLocation();
                        subscribeLocationLocation();
                    } else {
                        setLocationStatus('Permission Denied');
                    }
                } catch (err) {
                    console.warn(err);
                }
            }
        };
        requestLocationPermission();
        return () => {
            Geolocation.clearWatch(watchID);
        };
    }, []);

    const getOneTimeLocation = () => {
        setLocationStatus('Getting Location ...');
        Geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
                setLocationStatus('You are Here');

                //getting the Longitude from the location json
                const currentLongitude =
                    JSON.stringify(position.coords.longitude);

                //getting the Latitude from the location json
                const currentLatitude =
                    JSON.stringify(position.coords.latitude);

                //Setting Longitude state
                setCurrentLongitude(currentLongitude);

                //Setting Longitude state
                setCurrentLatitude(currentLatitude);
                getLocationName(currentLatitude, currentLongitude)
                    .then((placeName) => {
                        if (placeName) {
                            setCurrentPlaceName(placeName)
                            console.log('Place name vikas:', placeName);

                        } else {
                            console.log('Unable to fetch place name.');
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                // console.log('current place is...',getLocationName(currentLatitude,currentLongitude))
                // const currentPlace=getLocationName(currentLatitude,currentLongitude);
                // console.log("Vikas your device is here >>",currentPlace)
            },
            (error) => {
                setLocationStatus(error.message);
            },
            {
                enableHighAccuracy: false,
                timeout: 30000,
                maximumAge: 1000
            },
        );
    };
    const subscribeLocationLocation = () => {
        watchID = Geolocation.watchPosition(
            (position) => {
                //Will give you the location on location change

                setLocationStatus('You are Here');
                console.log(position);

                //getting the Longitude from the location json        
                const currentLongitude =
                    JSON.stringify(position.coords.longitude);

                //getting the Latitude from the location json
                const currentLatitude =
                    JSON.stringify(position.coords.latitude);

                //Setting Longitude state
                setCurrentLongitude(currentLongitude);

                //Setting Latitude state
                setCurrentLatitude(currentLatitude);
                const currentPlace = getLocationName(currentLatitude, currentLongitude);
                console.log("Vikas your device is here >>", currentPlace)
            },
            (error) => {
                setLocationStatus(error.message);
            },
            {
                enableHighAccuracy: false,
                maximumAge: 1000
            },
        );
    };
    const openCategory = () => {
    }
    const [categoryList, setCategoryList] = React.useState([
        {
            title: 'Hairs cuting',
            Images: Images.HAIRCUTTINGS
        },
        {
            title: 'Hairs cuting',
            Images: Images.HAIRCUTTINGS
        },
        {
            title: 'Hairs cuting',
            Images: Images.HAIRCUTTINGS
        },
        {
            title: 'Hairs cuting',
            Images: Images.HAIRCUTTINGS
        },


    ])
    const particularStyle = (data) => {
        navigation.navigate(Routes.TrendingDetails, { data: data })
    }
    const renderItem = (item, index) => {
        return (
            <TouchableOpacity style={style.articalDesign} onPress={() => particularStyle(item)}>
                <Image source={Images.HAIRCUTTINGS} />
                <Text style={style.title}>{item?.item?.title}</Text>
            </TouchableOpacity>
        )
    }
    const renderItemCategory = (item, index) => {
        return (
            <TouchableOpacity style={style.articalDesign} onPress={() => particularStyle(item)}>
                <Image source={Images.HAIRCUTTINGS} />
                <Text style={style.title}>{item?.item?.title}</Text>
            </TouchableOpacity>
        )
    }
    const particularArtical = (data) => {
        navigation.navigate(Routes.AtricalDetails, { data: data })
    }
    const renderArtical = (item, index) => {
        return (
            <TouchableOpacity style={style.articalDesign} onPress={() => particularArtical(item)}>
                {/* <View key={index} style={style.itemConatiner}> */}
                <Image source={Images.CHOTI_DESIGN} />
                <Text style={style.title}>{item?.item?.title}</Text>
                {/* </View> */}
            </TouchableOpacity>
        )
    }
    React.useLayoutEffect(() => {
        refRBSheet.current.open()
    }, [])
    const calculateColumns = () => Math.floor(width / itemWidth);
    const cancelButtonClick = () => {
        refRBSheet.current.close()
    }
    const clikOnLocation = () => {
        refRBSheet.current.open()
    }
    const getOnlineLocationData = () => {

    }
    const gotoListPage = () => {
        navigation.navigate(Routes.TrendingList)
    }
    const gotoArticalListListPage = () => {
        navigation.navigate(Routes.ArticalList)
    }
    const callCategoryListPage=()=>{
        console.log("Hello Category")
        navigation.navigate(Routes.CategoryList)
    }
    return (
        <SafeAreaView>
            <UserHeader />
            <ScrollView>
                <View style={style.locationConainer}>
                    <LocationConatiner loationDetails={currentPlaceName} locationClick={clikOnLocation} />
                </View>
                <View>
                <TouchableOpacity style={style.categoriesConatiner} onPress={()=>callCategoryListPage()}>
                    <Text style={style.categoryText}>{TextConstant.CATEGORIES}</Text>
                   
                        <Text style={style.knowmoreText} onPress={() => openCategory()}>{TextConstant.SHOW_MORE}</Text>
                        </TouchableOpacity>
                </View>
                <View style={{ flexWrap: 'wrap', marginHorizontal: scaleWidth(16) }}>
                    <FlatList
                        data={categoryList}
                        renderItem={renderItemCategory}
                        numColumns={calculateColumns()}
                    />
                </View>
                <View style={style.searchConatiner}>
                    <SearchNearSaloon text={TextConstant.SEARCH_NEAR_SALON} />
                </View>
                <View style={style.userContainer}>
                    <UserAdsContainer />
                </View>
                <View style={{ marginLeft: scaleWidth(20) }}>
                    <View style={style.tredingContainer}>
                        <Text style={style.trendingText}>{TextConstant.TRENDING_STYLE}</Text>
                        <Text style={style.showMoreText} onPress={() => gotoListPage()}>{TextConstant.SHOW_MORE} </Text>
                    </View>
                    <View style={{ marginTop: scaleHeight(20) }}>
                        <FlatList
                            data={crausalData}
                            renderItem={renderItem}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>
                <View style={{ marginLeft: scaleWidth(20) }}>
                    <View style={style.tredingContainer}>
                        <Text style={style.trendingText}>Latest article's</Text>
                        <Text style={style.showMoreText} onPress={() => gotoArticalListListPage()}>{TextConstant.SHOW_MORE} </Text>
                    </View>
                    <View style={{ marginTop: scaleHeight(20) }}>
                        <FlatList
                            data={crausalData}
                            renderItem={renderArtical}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>
                <View style={{ marginLeft: scaleWidth(20), marginTop: scaleHeight(10) }}>
                    <Text style={style.adsText}>Ads</Text>
                    <Image style={{ alignSelf: 'center' }} source={Images.Booking_Ads} />
                </View>
            </ScrollView>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                    wrapper: {
                    },
                    container: {
                        height: Platform.OS === 'ios' ? scaleHeight(450) : scaleHeight(450),
                        borderTopRightRadius: scaleHeight(10),
                        borderTopLeftRadius: scaleHeight(10)
                    },
                    draggableIcon: {
                        backgroundColor: ""
                    },

                }}
            >
                <LocationBottomSheet navigation={navigation} getOnlineLocationData={getOnlineLocationData} cancelButtonClick={cancelButtonClick} />
            </RBSheet>
        </SafeAreaView>
    )
}
export default UserHome;