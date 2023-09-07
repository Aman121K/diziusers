// import { useRoute } from '@react-navigation/native';
// import React from 'react';
// import { View, Text } from 'react-native';
// const AtricalDetails = () => {
//     const route = useRoute();
//     const receivedData = route.params?.data;
//     console.log("Artical data is>>", receivedData)
//     return (
//         <View>
//             <Text>{receivedData?.item?.title}</Text>
//         </View>
//     )
// }
// export default AtricalDetails;


import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import AuthHeader from '../../../Components/AuthHeader';
import { useRoute } from '@react-navigation/native';
const AtricalDetails = ({navigation}) => {
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
export default AtricalDetails;