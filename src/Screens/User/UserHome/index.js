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
import SaloonContainers from "../../../Components/SaloonContainers";
import UserFavouriteSaloon from "../UserFavouriteSaloon";
import { Apis, BASE_URL } from "../../../Constant/APisUrl";
import { getStyle } from "react-native-svg/lib/typescript/xml";
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
        color: 'black'
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
        color: "black",
        margin:scaleHeight(2)
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
        // borderWidth: 1,
        // borderColor: 'white',
        padding: scaleHeight(5),
        alignItems: 'center',
        margin: scaleHeight(10),
        // backgroundColor: 'white',
        borderRadius: scaleHeight(5)
        // alignSelf: 'center'
    }
})
const UserHome = ({ navigation }) => {
    const [saloonsData, setSaloonDatas] = React.useState([])
    const [Ads, setAds] = React.useState([])
    const [stylesData, setStylesData] = React.useState([]);
    const [ArticalsData, setArticalsData] = React.useState([])
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
        // getCatogoriesApi()
        getSaloonAPis();
        getsAdsApi();
        getArticals();
        getStyles();
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
    const getSaloonAPis = async () => {
        const response = await fetch(BASE_URL + Apis.GET_ALL_SALOONS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        console.log("Saloon details>", data)
        setSaloonDatas(data?.data)
        // setSallonListData(data?.data)
    }
    const getsAdsApi = async () => {
        const response = await fetch(BASE_URL + Apis.get_ADS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        console.log("Ads details>", data)
        setAds(data?.data)
    }
    const getArticals = async () => {
        const response = await fetch(BASE_URL + Apis.GET_ARTICALS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        console.log("Articals details>", data)
        setArticalsData(data?.data)
    }
    const getStyles = async () => {
        const response = await fetch(BASE_URL + Apis.GET_STYLES, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        console.log("Styles details>", data)
        setStylesData(data?.data)
    }
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
        navigation.navigate('UserCategorriesList')
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
        navigation.navigate(Routes.TrendingDetails, { data: data?.item })
    }
    const renderItem = (item, index) => {
        return (
            <TouchableOpacity style={style.articalDesign} onPress={() => particularStyle(item)}>
                <Image source={Images.HAIRCUTTINGS} />
                <Text style={style.title}>{item?.item?.title}</Text>
            </TouchableOpacity>
        )
    }
    const gotoSaloonDetailsPage = (item) => {
        navigation.navigate(Routes.UserSaloonDetails, { data: item?.item })
    }
    const renderSaloonItem = (item, index) => {
        return (
            <SaloonContainers onClick={gotoSaloonDetailsPage} item={item} />
        )
    }
    const usersRecomendedSaloon = (item, index) => {
        return (
            <SaloonContainers onClick={gotoSaloonDetailsPage} item={item} />
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
        navigation.navigate(Routes.AtricalDetails, { data: data?.item })
    }
    const renderArtical = (item, index) => {
        return (
            <TouchableOpacity style={style.articalDesign} onPress={() => particularArtical(item)}>
                <Image source={Images.CHOTI_DESIGN} />
                <Text style={style.title}>{item?.item?.title}</Text>
            </TouchableOpacity>
        )
    }
    const renderAds = (item, index) => {
        return (
            <TouchableOpacity onPress={() => particularArtical(item)}>
                <View style={{ marginRight: scaleHeight(20), marginTop: scaleHeight(10), marginBottom: scaleHeight(50) }}>
                    <Image style={{ alignSelf: 'center', margin: scaleHeight(20) }} source={Images.Booking_Ads} />
                </View>
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
    const callCategoryListPage = () => {
        navigation.navigate(Routes.CategoryList)
    }
    const goestoSearchScreen = () => {
        navigation.navigate('Search')
    }
    const gotoFavSaloon = () => {
        navigation.navigate(Routes.UserFavouriteSaloon)
    }
    return (
        <SafeAreaView>
            <UserHeader />
            <ScrollView>
                <View style={style.locationConainer}>
                    <LocationConatiner loationDetails={currentPlaceName} locationClick={clikOnLocation} />
                </View>
                <View>
                    <TouchableOpacity style={style.categoriesConatiner} onPress={() => callCategoryListPage()}>
                        <Text style={style.categoryText}>{TextConstant.CATEGORIES}</Text>

                        <Text style={style.knowmoreText}>{TextConstant.SHOW_MORE}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexWrap: 'wrap', marginHorizontal: scaleWidth(16) }}>
                    <FlatList
                        data={stylesData}
                        renderItem={renderItemCategory}
                        numColumns={calculateColumns()}
                    />
                </View>
                <View style={style.searchConatiner}>
                    <SearchNearSaloon isComing="home"
                        onClick={goestoSearchScreen}
                        text={TextConstant.SEARCH_NEAR_SALON} />
                </View>
                <View style={style.userContainer}>
                    <UserAdsContainer onClick={gotoFavSaloon} />
                </View>
                {/* Nearest Salloon for you. */}
                <View style={{ marginLeft: scaleWidth(20) }}>
                    <View style={style.tredingContainer}>
                        <Text style={style.trendingText}>Nearest Salloon for you</Text>
                        <Text style={style.showMoreText}
                            onPress={() => goestoSearchScreen()}>{TextConstant.SHOW_MORE} </Text>
                    </View>
                    <View style={{ marginTop: scaleHeight(20) }}>
                        <FlatList
                            data={saloonsData.slice(0, 5)}
                            renderItem={renderSaloonItem}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>
                {/* Recommended Saloon for you  */}
                <View style={{ marginLeft: scaleWidth(20) }}>
                    <View style={style.tredingContainer}>
                        <Text style={style.trendingText}>Recommended Saloon for you</Text>
                        <Text style={style.showMoreText} onPress={() => gotoFavSaloon()}>{TextConstant.SHOW_MORE} </Text>
                    </View>
                    <View style={{ marginTop: scaleHeight(20) }}>
                        <FlatList
                            data={saloonsData.slice(3, 5)}
                            renderItem={usersRecomendedSaloon}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>
                {/* Trending style  */}
                <View style={{ marginLeft: scaleWidth(20) }}>
                    <View style={style.tredingContainer}>
                        <Text style={style.trendingText}>{TextConstant.TRENDING_STYLE}</Text>
                        <Text style={style.showMoreText} onPress={() => gotoListPage()}>{TextConstant.SHOW_MORE} </Text>
                    </View>
                    <View style={{ marginTop: scaleHeight(20) }}>
                        <FlatList
                            data={stylesData}
                            renderItem={renderItem}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>
                {/* Latest Articals  */}
                <View style={{ marginLeft: scaleWidth(20) }}>
                    <View style={style.tredingContainer}>
                        <Text style={style.trendingText}>Latest article's</Text>
                        <Text style={style.showMoreText} 
                        onPress={() => gotoArticalListListPage()}>{TextConstant.SHOW_MORE} </Text>
                    </View>
                    <View style={{ marginTop: scaleHeight(20) }}>
                        <FlatList
                            data={ArticalsData}
                            renderItem={renderArtical}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>
                {/* Users Ads  */}
                <View style={{ marginLeft: scaleWidth(20) }}>
                    <View style={style.tredingContainer}>
                        <Text style={style.trendingText}>Latest Ads</Text>
                        <Text style={style.showMoreText} 
                        onPress={() => gotoArticalListListPage()}>{TextConstant.SHOW_MORE} </Text>
                    </View>
                    <View style={{ marginTop: scaleHeight(20) }}>
                        <FlatList
                            data={Ads}
                            renderItem={renderAds}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
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
                <LocationBottomSheet navigation={navigation} 
                getOnlineLocationData={getOnlineLocationData} 
                cancelButtonClick={cancelButtonClick} />
            </RBSheet>
        </SafeAreaView>
    )
}
export default UserHome;