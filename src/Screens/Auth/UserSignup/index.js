import React, { memo } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import AuthHeader from "../../../Components/AuthHeader";
import InputBoxComponent from "../../../Components/InputBoxComponent";
import { TextConstant } from '../../../Constant/TextConstant';
import { StylesContants } from "../../../Constant/StylesContants";
import { Images } from "../../../Constant/Images";
import ButtonBlue from "../../../Components/Button_Blue";
import { normalize, scaleHeight, scaleWidth } from "../../../Constant/DynamicSize";
import { FONTS } from "../../../Constant/fonts";
import { Routes } from "../../../Constant/Routes";
import { Apis, BASE_URL } from "../../../Constant/APisUrl";
import InnerTexttInput from "../../../Components/InnerTextInput";
import DropDownPicker from "react-native-dropdown-picker";
import Toast from 'react-native-simple-toast';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
const styles = StyleSheet.create({
    mainContainer: {
        width: '95%',
        alignSelf: 'center'
    },
    location_img: {
        marginVertical: scaleHeight(37)
    },
    phone_no_field: {
        flexDirection: "row",
        alignItems: "center",
    },
    inputField: {
        height: scaleHeight(50),
        borderWidth: 2,
        padding: scaleHeight(10),
        borderColor: "#CECECE",
        borderRadius: 12,
        color: "#6C6C6C",
        fontSize: normalize(16),
        paddingLeft: scaleWidth(22),
        width: scaleWidth(260)
    },
    phoneConatiner: {
        flexDirection: 'row',
    },
    sendConatiner: {
        backgroundColor: '#022A6D',
        alignItems: 'center',
        height: scaleHeight(50),
        textAlign: 'center',
        padding: scaleHeight(15),
        borderRadius: scaleHeight(12),
        top: scaleHeight(40),
        marginHorizontal: scaleWidth(8)
    },
    sendText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: FONTS.MontserratSemiBold,
        fontSize: normalize(15)
    },
    borderStyleHighLighted: {
        borderColor: "black",
    },
    underlineStyleBase: {
        width: scaleWidth(45),
        height: scaleHeight(45),
        borderWidth: 1,
        borderColor: '#CECECE',
        borderRadius: scaleWidth(12)
        // borderBottomWidth: 1,
    },
})
const UserSignup = ({ navigation }) => {
    const [selectedItem, setSelectedItem] = React.useState(null);
    const items = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
        { label: 'Transgender', value: 'Transgender' },
    ];
    const [fullName, setFullName] = React.useState();
    const [mobile, setMobile] = React.useState();
    const [otp, setOtp] = React.useState();
    const [email, setEmail] = React.useState();
    const [Address, setAddress] = React.useState();
    const [state, setState] = React.useState();
    const [city, setCity] = React.useState();
    const [zipcode, setZipCode] = React.useState();
    const [sex, setSex] = React.useState();
    const [dob, setDob] = React.useState();
    const clearAllState = () => {
        setFullName('');
        setMobile('');
        setOtp('');
        setEmail('')
        setAddress('')
        setCity('')
        setState('')
        setSex('')
        setZipCode('')
        setDob('')
    }
    const onSignupClick = async () => {
        let body = {
            signupFor: "user", // user and salon
            fullname: fullName, // for user
            countryCode: "+91", // for salon
            phone: mobile, // for salon
            email: email, // for both
            dob: dob, // for user
            gender: "1", // for user
            address: Address, // for user
            state: state, // for user
            country: "India", // for user
            zipcode: zipcode, // for user
            fcmToken: "", // for both
            otp: otp, // for both
            longitude: "31.1048",
            latitude: "77.1734"

        }
        const response = await fetch(BASE_URL + Apis.SINUP_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body), // Replace with your data
        });
        const data = await response.json();
        if (data?.message) {
            await AsyncStorage.setItem('token', data?.token);
            clearAllState()
            navigation.navigate(Routes.CreatePin)
            Toast.show(data?.message);
        } else {
            // clearAllState()
            Toast.show(data?.error)
        }
    }
    const onChangeText = (e, name) => {
        console.log("(e, name singup page", e, name)
        switch (name) {
            case 'fullName':
                setFullName(e)
                break;
            case 'Mobile':
                setMobile(e)
                break;
            case 'OTP':
                setOtp(e)
                break;
            case 'Email':
                setEmail(e)
                break;
            case 'Address':
                setAddress(e)
                break;
            case 'state':
                setState(e)
                break;
            case 'city':
                setCity(e)
                break;
            case 'zipCode':
                setZipCode(e)
                break;
            case 'DOB':
                if (e.length <= 10) {
                    if (e.length === 2 || e.length === 5) {
                        if (e.length > dob.length) {
                            e += '/';
                        }
                    }
                    setDob(e);
                }
                break;
            default:
                break;
        }
    }
    const loginWithFacebook=()=>{
    }
    const loginWithGmail=async()=>{
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo);
          } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              // User cancelled the sign-in process
              console.log('User cancelled the sign-in process');
            } else if (error.code === statusCodes.IN_PROGRESS) {
              // Sign-in process is in progress already
              console.log('Sign-in process is in progress already');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              // Play services not available or outdated on the device
              console.log('Play services not available or outdated on the device');
            } else {
              // Some other error happened
              console.error(error);
            }
          }
    }
    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: scaleWidth(10) }}>
                <AuthHeader navigation={navigation} backbutton={true} />
                <View style={styles.mainContainer}>
                    <Image style={styles.location_img} source={Images.SIGN_IN_LOCATION} />
                    <Text style={StylesContants.auth_screen_heading}>{TextConstant.SignUp_heading}</Text>
                    <Text style={StylesContants.auth_screen_subHeading}>{TextConstant.SignUp_subHeading}</Text>
                    <View style={styles.phoneConatiner}>
                        <InputBoxComponent
                            name="Mobile"
                            keyboardType="numeric"
                            value={mobile}
                            onChnageText={onChangeText}
                            label={TextConstant.Phone_number}
                            size={248}
                            placeholder={TextConstant.Phone_number}
                        />
                        <TouchableOpacity style={styles.sendConatiner}>
                            <Text style={styles.sendText}>Send</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <InputBoxComponent
                            name="OTP"
                            limit={4}
                            value={otp}
                            keyboardType="numeric"
                            onChnageText={onChangeText}
                            label={TextConstant.OTP_NUMBER}
                            size={248}
                            placeholder={TextConstant.OTP_NUMBER}
                        />
                    </View>
                </View>
                <View style={{ alignSelf: 'center', marginTop: scaleHeight(20) }}>
                    <Text style={{fontSize:normalize(12)}}> -------  Social Login -------- </Text>
                    <View style={{ flexDirection: 'row', marginTop: scaleHeight(20), alignSelf: 'center' }}>
                        <TouchableOpacity onPress={() => loginWithFacebook()}>
                            <Image source={Images.Facebook} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => loginWithGmail()}>
                        <Image 
                            style={{height:scaleHeight(35),width:scaleHeight(35),borderRadius:scaleHeight(20)}} 
                            source={require('../../../Assets/Images/download.jpeg')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default UserSignup;