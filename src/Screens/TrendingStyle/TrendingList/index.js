import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AuthHeader from '../../../Components/AuthHeader';
import SearchConatiner from '../../../Components/SearchConatiner';
import { TextConstant } from '../../../Constant/TextConstant';
import { normalize, scaleHeight, scaleWidth } from '../../../Constant/DynamicSize';
import { FONTS } from '../../../Constant/fonts';
import TrendingLists from '../../../Components/TredningList';
import { Routes } from '../../../Constant/Routes';
import { Apis, BASE_URL } from '../../../Constant/APisUrl';
const styles = StyleSheet.create({
    mainConatiner: {
    },
    trendingConatiner: {
        marginHorizontal: scaleWidth(15),
        marginTop: scaleHeight(16)
    },
    trendingText: {
        fontSize: normalize(25),
        fontFamily: FONTS.MontserratMedium,
        lineHeight: scaleHeight(31),
        color: 'black'
    },
    serachConatiner: {
        marginVertical: scaleHeight(30)
    }
})
const TrendingList = ({ navigation }) => {
    const [articalData, setArticalData] = React.useState([])
    React.useEffect(() => {
        getArticalsList()
    }, [])
    const getArticalsList = async () => {
        const response = await fetch(BASE_URL + Apis.GET_STYLES, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        console.log("Articals data>", data)
        setArticalData(data.data)
    }
    const onClick = (data) => {
        console.log("click style", data)
        navigation.navigate(Routes.TrendingDetails, { data: data })
    }
    const renderItem = (item, index) => {
        return (
            <TrendingLists data={item} onClick={onClick} />
        )
    }
    return (
        <SafeAreaView>
            <AuthHeader navigation={navigation} backbutton={true} />
            <View style={styles.trendingConatiner}>
                <View style={styles.serachConatiner}>
                    <SearchConatiner />
                </View>
                <Text style={styles.trendingText}>{TextConstant.TRENDING_STYLE}
                </Text>
                <FlatList
                    data={articalData}
                    renderItem={renderItem}

                />




            </View>
        </SafeAreaView>
    )
}
export default TrendingList;