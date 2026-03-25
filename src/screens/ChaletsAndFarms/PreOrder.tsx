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
    FontAwesome5
} from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { styles } from "../../theme/style";
import Constants from 'expo-constants';
import { ArrivalTypes } from "../../const/api";
import { AntDesign } from '@expo/vector-icons';
import { BaseLayout, Header } from "@components";

export const PreOrder = ({ route, navigation }) => {
    const { item, filters } = route.params;

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
        const max_coming = parseInt(item.adultsNumber) + parseInt(item.personsNumber);

        if (adults > parseInt(item.adultsNumber)) {

            if (adults > max_coming) {
                alert("الحد الأقصي لعدد القادمون : " + max_coming);
                setAdults(0);
                setAdditionalAdults(0)
            }


            else {
                setAdults(parseInt(item.adultsNumber));
                setAdditionalAdults(adults - parseInt(item.adultsNumber))
                console.log("Larger");
            }
        }

        else if (adults == parseInt(item.adultsNumber)) {
            console.log("Equal");
            setAdditionalAdults(0)
        }


        else {
            console.log("Smaller");
            setAdditionalAdults(0)
        }
    }

    function isValidIraqNumber(number) {
        const iraqRegex = /^07[789]\d{8}$/;
        return iraqRegex.test(number);
    }


    const _handleConfirmOrder = () => {
        if (arrivals == 0 || phoneNumber == "" || fullName == "" || adults == 0) {
            alert("لابد من إكمال جميع البيانات");
        }

        else if (!isValidIraqNumber(phoneNumber)) {

            alert("الرقم المدخل غير صحيح");

        }
        else {
            navigation.navigate("ChaletsAndFarmsConfirm", {
                order_info: order_info,
                chalet: item,
                filters: filters
            })
        }
    }
    const order_info = {
        ApplicantName: fullName,
        ApplicantMobileNumber: phoneNumber,
        AdultsNumber: adults,
        PersonsNumber: kids,
        Arrivals: arrivals,
        additionalAdults: additionalAdults
    }
    return (
        <BaseLayout>
            <Header text="تأكيد الحجز" goBack={() => navigation.goBack()} />

            <ScrollView>

                <View style={{
                    paddingHorizontal: 20,
                    marginVertical: 20
                }}>
                    <View
                        style={{
                            paddingHorizontal: 10,
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
                                selectionColor={"#51672D"}
                                onChangeText={(text) => setPhoneNumber(toEnglishNumber(text))}
                                keyboardType="numeric"
                                placeholder="أدخل رقم الهاتف"
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
                            flexDirection: "row-reverse"
                        }}>

                            <View style={{
                                width: "50%"
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
                                width: "50%",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <Text style={{
                                    fontFamily: "Bold",
                                    color: "#000",
                                    textAlign: "right",
                                    fontSize: 11,
                                    width: "90%",
                                    marginVertical: 5,
                                }}>
                                    {'عدد الأشخاص : من سن'} {item?.adultsAge} {'سنه'}
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
                                        width: "90%",
                                        borderRadius: 25,
                                        fontFamily: "Regular",
                                        paddingHorizontal: 10,
                                        borderWidth: 1,
                                        borderColor: "#DDDDDD",
                                        textAlign: "right"
                                    }} />
                            </View>

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
                                    value={additionalAdults.toString()} // Convert to string since the state is expected to be a string
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