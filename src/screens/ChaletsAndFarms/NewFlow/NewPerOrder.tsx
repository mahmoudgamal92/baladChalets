import React, { useState } from "react";

import {
    Text,
    View,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    TextInput,
    Image
} from "react-native";
import {
    Feather,
    MaterialIcons,
    AntDesign
} from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { styles } from "../../../theme/style";
import Constants from 'expo-constants';
import { ArrivalTypes } from "../../../const/api";
import { BaseLayout, Header } from "@components";

export const NewPerOrder = ({ route, navigation }) => {
    const { chalet, offer, date } = route.params;
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [arrivals, setArrivals] = useState(0);
    const [adults, setAdults] = useState(0);
    const [additionalAdults, setAdditionalAdults] = useState(0);
    const [kids, setKids] = useState(0);

    function toEnglishNumber(strNum) {
        const arabicNumbers = "٠١٢٣٤٥٦٧٨٩".split("");
        const englishNumbers = "0123456789".split("");
        strNum = strNum.replace(
            /[٠١٢٣٤٥٦٧٨٩]/g,
            x => englishNumbers[arabicNumbers.indexOf(x)]
        );
        strNum = strNum.replace(/[^\d]/g, "");
        return strNum;
    }




    const _handleArrivals = async () => {
        // console.log('_handle Arrive');
        // console.log(offer.adultsNumber);
        // console.log(adults);
        const max_coming = parseInt(offer.adultsNumber) + parseInt(chalet.personsNumber);

        if (adults > parseInt(offer.adultsNumber)) {

            if (adults > max_coming) {
                alert("الحد الأقصي لعدد القادمون : " + max_coming);
                setAdults(0);
                setAdditionalAdults(0)
            }


            else {
                setAdults(parseInt(offer.adultsNumber));
                setAdditionalAdults(adults - parseInt(offer.adultsNumber))
                console.log("Larger");
            }
        }

        else if (adults == parseInt(offer.adultsNumber)) {
            console.log("Equal");
            setAdditionalAdults(0)
        }


        else {
            console.log("Smaller");
            setAdditionalAdults(0)
        }
    }

    const order_info = {
        ApplicantName: fullName,
        ApplicantMobileNumber: phoneNumber,
        AdultsNumber: adults,
        Arrivals: arrivals,
        additionalAdults: additionalAdults
    }




    function isValidIraqNumber(number) {
        const iraqRegex = /^07[789]\d{8}$/;
        return iraqRegex.test(number);
    }


    const _handleConfirmOrder = () => {
        if (arrivals == 0 || phoneNumber == "" || fullName == "" || adults == 0) {
            console.log(order_info);
            alert("لابد من إكمال جميع البيانات");
        }

        else if (!isValidIraqNumber(phoneNumber)) {

            alert("الرقم المدخل غير صحيح");

        }

        else {
            navigation.navigate("NewChaletsAndFarmsConfirm", {
                order_info: order_info,
                chalet: chalet,
                offer: offer,
                date: date
            })

            console.log(order_info);
        }
    }

    return (
        <BaseLayout>
            <Header text=' تأكيد الحجز' goBack={() => navigation.goBack()} />
            <ScrollView>
                <View style={{
                    paddingHorizontal: 20,
                    marginVertical: 20
                }}>
                    <View
                        style={{
                            paddingHorizontal: 5,
                            paddingVertical: 10,
                            marginTop: 10,
                            width: "100%",
                        }}>

                        <Text
                            style={{
                                fontFamily: "Bold",
                                textAlign: "right",
                                marginBottom: 5,
                                color: "#000",
                                zIndex: 10,
                            }}>
                            أدخل المعلومات التالية
                        </Text>


                        <View style={{
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Text style={{
                                fontFamily: "Bold",
                                color: "#000",
                                textAlign: "right",
                                width: "100%",
                                marginVertical: 5
                            }}>
                                الأسم ثلاثي
                            </Text>
                            <TextInput
                                placeholder="أدخل الأسم ثلاثي"
                                onChangeText={(text) => setFullName(text)}
                                style={{
                                    height: 50,
                                    backgroundColor: "#FFF",
                                    width: "100%",
                                    borderRadius: 25,
                                    fontFamily: "Regular",
                                    paddingHorizontal: 10,
                                    borderWidth: 1,
                                    borderColor: "#DDDDDD",
                                    textAlign: "right"
                                }} />
                        </View>


                        <Text style={{
                            fontFamily: "Bold",
                            color: "#000",
                            textAlign: "right",
                            width: "100%",
                            marginVertical: 5
                        }}>
                            رقم الموبايل
                        </Text>


                        <View
                            style={{
                                flexDirection: "row-reverse",
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "space-between",
                                height: 50,
                            }}
                        >
                            <TextInput
                                placeholder="أدخل رقم الهاتف"
                                keyboardType="numeric"
                                onChangeText={(text) => setPhoneNumber(toEnglishNumber(text))}

                                style={{
                                    borderRadius: 25,
                                    fontFamily: "Regular",
                                    textAlign: "right",
                                    paddingBottom: 2,
                                    paddingHorizontal: 10,
                                    height: "100%",
                                    width: "100%",
                                    color: "grey",
                                    backgroundColor: "#FFF",
                                }}
                            />
                        </View>



                        <View style={{
                        }}>



                            <Text style={{
                                fontFamily: "Bold",
                                color: "#000",
                                textAlign: "right",
                                width: "100%",
                                marginVertical: 5
                            }}>
                                الأشخاص القادمون
                            </Text>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                iconStyle={styles.iconStyle}
                                itemTextStyle={{ fontFamily: "Regular", fontSize: 12 }}
                                data={ArrivalTypes}
                                //search
                                maxHeight={300}
                                labelField="title"
                                valueField="id"
                                placeholder=" القادمون"
                                onChange={(item) => {
                                    setArrivals(item.id)
                                }}

                                renderLeftIcon={() =>
                                    <MaterialIcons
                                        style={styles.icon}
                                        name="keyboard-arrow-down"
                                        size={24}
                                        color={"grey"}
                                    />}
                                renderRightIcon={() =>
                                    <Feather
                                        style={styles.icon}
                                        color={"grey"}
                                        name="user"
                                        size={20}
                                    />}
                            />

                        </View>

                        <View style={{
                            marginVertical: 10

                        }}>
                            <Text style={{
                                fontFamily: "Bold",
                                color: "#000",
                                textAlign: "right",
                                marginVertical: 5,
                            }}>
                                {'عدد الأشخاص : من سن'} {offer.adultsAge} {'سنه'}
                            </Text>
                            <TextInput
                                onChangeText={(text) => setAdults(toEnglishNumber(text))}
                                onEndEditing={_handleArrivals}
                                value={adults.toString()}
                                keyboardType="numeric"
                                placeholder="أدخل عدد الأشخاص"
                                style={{
                                    height: 50,
                                    backgroundColor: "#FFF",
                                    borderRadius: 25,
                                    fontFamily: "Regular",
                                    paddingHorizontal: 10,
                                    borderWidth: 1,
                                    borderColor: "#DDDDDD",
                                    textAlign: "right"
                                }} />
                        </View>


                        <View style={{
                            flexDirection: "row-reverse",
                            alignItems: "center",
                            marginTop: 20,
                        }}>

                            <View style={{
                                width: "70%",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>

                                <Text style={{
                                    fontFamily: "Bold",
                                    color: "#000",
                                    textAlign: "right",
                                    width: "100%",
                                    marginVertical: 5,
                                }}>
                                    عدد الأشخاص الإضافيين (تلقائي)
                                </Text>
                                <TextInput

                                    keyboardType="numeric"
                                    editable={false}
                                    selectTextOnFocus={false}
                                    value={additionalAdults.toString()}
                                    style={{
                                        height: 50,
                                        backgroundColor: "#FFF",
                                        width: "100%",
                                        borderRadius: 25,
                                        fontFamily: "Regular",
                                        paddingHorizontal: 10,
                                        borderWidth: 1,
                                        borderColor: "#DDDDDD",
                                        textAlign: "right"
                                    }} />
                            </View>

                        </View>

                    </View>

                    <TouchableOpacity
                        onPress={() => _handleConfirmOrder()}
                        style={{
                            width: "100%",
                            backgroundColor: "#51672D",
                            padding: 10,
                            borderRadius: 25,
                            marginVertical: 20
                        }}>
                        <Text style={{
                            textAlign: "center",
                            fontFamily: "Bold",
                            color: "#FFF"
                        }}>
                            متابعة
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </BaseLayout>
    );
}