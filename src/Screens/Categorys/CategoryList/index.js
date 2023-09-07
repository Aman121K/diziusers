// import React from "react";
// import { View,Text } from 'react-native';
// const CategoryList = () => {
//     return (
//         <View>
//             <Text> CategoryList </Text>
//         </View>
//     )
// }
// export default CategoryList;

import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import AuthHeader from '../../../Components/AuthHeader';
import { useRoute } from '@react-navigation/native';
const CategoryList = ({navigation}) => {
    const route = useRoute();
    const receivedData = route.params?.data;
    console.log("Details data>>",receivedData)
    return (
        <SafeAreaView>
            <AuthHeader backbutton={true} navigation={navigation} />
            {/* <Text> TrendingDetails</Text> */}
        </SafeAreaView>
    )
}
export default CategoryList;