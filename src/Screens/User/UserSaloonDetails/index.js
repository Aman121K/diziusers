import React from 'react';
import { View, SafeAreaView, Text, StyleSheet, ScrollView } from 'react-native';
import UserSaloonDetailsHeader from '../../../Components/UserSaloonDetailHeader';
import { scaleHeight, scaleWidth } from '../../../Constant/DynamicSize';
import SaloonuserDesign from './SaloonuserDesign';
import { Routes } from '../../../Constant/Routes';
import { Images } from '../../../Constant/Images';
import BarberRateList from '../../../Components/BarberRateList';
import { Apis, BASE_URL } from '../../../Constant/APisUrl';
const style = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
        marginTop: scaleHeight(-50),
        borderTopLeftRadius: scaleWidth(50),
        height: '90%'
    },
    barberRateDesign: {
        backgroundColor: '#FAFAFA',
        height: '100%'
    }
})
const UserSaloonDetails = ({ navigation,route }) => {
    const receivedData = route?.params?.data;
    console.log("fatat>>",receivedData?._id)
    const [barberList, setBarberList] = React.useState([
        // {
        //     barberName: 'Manish Rawat',
        //     barberContactNo: '+91+910000000',
        //     barberImage: Images.SALLON_BG_IMAGE,
        //     barberRate: '500',
        //     duration: '30 min',
        //     title: 'Hair cutting',
        //     barberStatus: 'open'
        // },
        // {
        //     barberName: 'Manish Rawat',
        //     barberContactNo: '+91+910000000',
        //     barberImage: Images.SALLON_BG_IMAGE,
        //     barberRate: '500',
        //     duration: '30 min',
        //     title: 'Hair cutting',
        //     barberStatus: 'open'
        // }
    ])
    React.useEffect(()=>{
        getBarberList()
    },[])
    const getBarberList=async()=>{
        const response = await fetch(BASE_URL + Apis.GET_BARBER_LIST, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        console.log("BarberList data>", data)
        setBarberList(data?.data)
    }
    const GalleryPage = () => {
        console.log("gallery")
        navigation.navigate(Routes.SaloonGallery)
    }
    return (
        <SafeAreaView>
            <ScrollView>
                <UserSaloonDetailsHeader navigation={navigation} galleryDesign={GalleryPage} />
                <View style={style.mainContainer}>
                    <SaloonuserDesign data={receivedData} navigation={navigation} />
                    <View style={style.barberRateDesign}>
                        <BarberRateList showHeader={true} navigation={navigation} barberList={barberList} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default UserSaloonDetails;