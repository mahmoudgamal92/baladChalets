import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Image,
    Modal,
    ActivityIndicator,
    Linking
} from "react-native";

import React, { useState, useEffect } from "react";
import Constants from 'expo-constants';

import { StatusBar } from 'expo-status-bar';
import { offerTypes } from "../const/api";
import { Calender, AutoScrollingSlider } from "@components";
import moment from "moment";
import { GetAllChaletByFilter, getChaletsByCity } from './../network';

import { getCatigories, getSlider } from "../network";
import { api } from "../const/api";

export default function HomePage({ route, navigation }) {
    const [cats, setCats] = useState([]);
    const [slider, setSlider] = useState([]);
    const [loading, setLoading] = useState(false);
    const currentYear = new Date().getFullYear().toString();
    const currentMonth = (new Date().getMonth() + 1).toString();
    const currentDay = new Date().getDate().toString();


    const [startDate, setStartDate] = useState(`${currentMonth}-${currentDay}-${currentYear}`);
    const [endDate, setEndDate] = useState("");
    const [offerType, setOfferType] = useState(1.1);
    const [IsOneDay, setIsOneDay] = useState(false);


    useEffect(() => {
        _getInfo();
    }, [])


    const _getChalestByCity = async (city) => {
        setLoading(true);
        const chalets = await getChaletsByCity(city);
        if (Array.isArray(chalets)) {
            chalets.length > 0 ? navigation.navigate("ChaletsAndFarmsNewList", {
                chalets: chalets,
            }) : alert('لا توجد عروض في هذه المدينه');
        }
        else {
            alert('لا توجد عروض في هذه المدينه');
        }
        setLoading(false);
        console.log(chalets);
    }


    function checkValidDate(date1, date2) {
        const d1 = moment(date1, 'MM-DD-YYYY').toDate();
        const d2 = moment(date2, 'MM-DD-YYYY').toDate();
        if (isNaN(d1) || isNaN(d2)) {
            throw new Error('Invalid date');
        }
        return d1 < d2;
    }

    const handleEndDateChange = (year, month, day) => {
        setEndDate(`${month}-${day}-${year}`);
    };

    const handleStartDateChange = async (year, month, day) => {
        setEndDate("");
        setStartDate(`${month}-${day}-${year}`);
    };


    const _handleOfferTypePress = (id: number) => {
        switch (id) {
            case 1:
                setOfferType(1);
                setIsOneDay(false);
                break;

            case 1.1:
                setEndDate("");
                setOfferType(1.1);
                setIsOneDay(true);
                break;

            case 2:
                setEndDate("");
                setOfferType(2);
                setIsOneDay(true);
                break;

            case 3:
                setEndDate("");
                setOfferType(3);
                setIsOneDay(true);
                break;

        }
    }


    const _applySearch = async () => {
        let params = {};
        // Validate Data
        if (startDate == "" || offerType == 0) {
            alert("لابد من إكمال البيانات بشكل صحيح")
        }
        else {
            if (endDate == "") {
                //Handle Morning Shift
                if (offerType == 2) {
                    params = {
                        CityId: 4,
                        OfferType: parseInt(offerType.toString()),
                        DateFrom: startDate,
                        DateTo: startDate,
                        IsOneDay: IsOneDay,
                    }
                }

                else {
                    //Handle One Day Or Night Shift
                    const [startMonth, startDay, startYear] = startDate.split('-').map(Number);
                    const nextDate = new Date(startYear, startMonth - 1, startDay + 1);
                    const nextMonth = (nextDate.getMonth() + 1).toString();
                    const nextDay = nextDate.getDate().toString();
                    const nextYear = nextDate.getFullYear().toString();
                    setEndDate(`${nextMonth}-${nextDay}-${nextYear}`);
                    params = {
                        CityId: 4,
                        OfferType: parseInt(offerType.toString()),
                        DateFrom: startDate,
                        DateTo: `${nextMonth}-${nextDay}-${nextYear}`,
                        IsOneDay: IsOneDay,
                    }
                }
            }

            else {
                //Handle Several Days
                if (!checkValidDate(startDate, endDate)) {
                    alert("تاريخ المغادرة لابد أن يكون أكبر من تاريخ الوصول");
                    return;
                }
                else {
                    params = {
                        CityId: 4,
                        OfferType: parseInt(offerType.toString()),
                        DateFrom: startDate,
                        DateTo: endDate,
                        IsOneDay: IsOneDay,

                    }
                }
            }


            // Handle Request :
            setLoading(true);
            const chalets = await GetAllChaletByFilter(params);
            if (Array.isArray(chalets)) {
                chalets.length > 0 ? navigation.navigate("ChaletsAndFarmsResult", {
                    chalets: chalets,
                    filters: params
                }) : alert("لايوجد شاليهات متاحة حاليا")
            }
            else {
                alert(" لا توجد عروض في هذا التاريخ");
            }
            setLoading(false);
        }
    }





    const _getInfo = async () => {
        const data = await getCatigories();
        const slider_info = await getSlider();
        setSlider(slider_info);
        setCats(data);
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="#51672D" />
            <View style={styles.header}>
                <View
                    style={{
                        width: "100%",
                        flexDirection: "row-reverse",
                        justifyContent: "space-between"
                    }}
                >
                    <TouchableOpacity
                        style={{
                            width: "20%",
                            justifyContent: "center",
                            alignItems: "flex-end"
                        }}
                    >

                        <Image
                            resizeMode='contain'
                            source={require('./../assets/logo-transparent.png')} style={{
                                height: 80,
                                width: 80
                            }} />
                    </TouchableOpacity>

                    <View style={{ width: "60%", alignItems: "center", justifyContent: "center" }}>
                        <Text style={{
                            fontFamily: "Regular",
                            color: "#000"
                        }}>
                            للإسنفسار + واتساب
                        </Text>

                        <Text style={{
                            fontFamily: "Regular",
                            color: "#FFF"
                        }}>
                            07824846025
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => Linking.openURL('https://app.alhajz-alsarea.com/privacy.html')}
                        style={{
                            width: "20%",
                            justifyContent: "center",
                            alignItems: "flex-start"
                        }}
                    >
                        <Text style={{
                            fontFamily: "Bold",
                            fontSize: 10,
                            color: "#FFF"
                        }}>
                            privacy policy
                        </Text>

                    </TouchableOpacity>

                </View>
            </View>

            <ScrollView style={{
                width: "100%"
            }}>
                <View style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                }}>


                    <Text style={{
                        fontFamily: "Bold",
                        textAlign: "right",
                        fontSize: 15,
                        marginVertical: 10,
                        width: "100%",
                        paddingHorizontal: 20,
                        color: "#000"
                    }}>
                        أهلا بيكم في تطبيق مزارع و شاليهات بلد
                    </Text>
                    <AutoScrollingSlider slider={slider} api={api} />

                    <Modal
                        transparent={true}
                        animationType="fade"
                        visible={loading}
                        onRequestClose={() => setLoading(false)}
                    >
                        <View style={styles.overlay}>
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color="#51672D" />
                                <Text style={styles.loadingText}>
                                    جاري التحميل ..
                                </Text>
                            </View>
                        </View>
                    </Modal>
                    <View style={{
                        paddingHorizontal: 20,
                        width: '100%'
                    }}>
                        <View
                            style={{
                                paddingHorizontal: 5,
                                marginTop: 10,
                                width: "100%",
                            }}>

                            <View style={{
                                width: "100%"
                            }}>

                                <View style={{
                                    flexDirection: "row-reverse",
                                    alignItems: "center"
                                }}>

                                    <Text
                                        style={{
                                            fontFamily: "Bold",
                                            textAlign: "right",
                                            marginBottom: 5,
                                            color: "red",
                                            zIndex: 10,
                                        }}>
                                        أول شئ : {" "}
                                    </Text>
                                    <Text
                                        style={{
                                            fontFamily: "Bold",
                                            textAlign: "right",
                                            marginBottom: 5,
                                            color: "#000",
                                            zIndex: 10,
                                        }}>
                                        تختار شيفت أو يومي
                                    </Text>
                                </View>

                                <View style={{
                                    flexDirection: "row-reverse",
                                    width: "100%",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginVertical: 5,
                                    backgroundColor: "#FFF",
                                    borderRadius: 20,
                                    borderColor: "#DDDDDD",
                                    borderWidth: 1,
                                    overflow: "hidden"
                                }}>
                                    {
                                        offerTypes.map((item) =>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    _handleOfferTypePress(parseFloat(item.id))
                                                    console.log(parseFloat(item.id));
                                                }}
                                                style={{
                                                    paddingVertical: 15,
                                                    backgroundColor: offerType == parseFloat(item.id) ? "#51672D" : "#FFF",
                                                    borderLeftColor: "#DDDDDD",
                                                    borderLeftWidth: 1,
                                                    width: "25%"
                                                }}>

                                                <Text style={{
                                                    fontFamily: "Regular",
                                                    color: offerType == parseFloat(item.id) ? "#FFF" : "#51672D",
                                                    fontSize: 11,
                                                    textAlign: "center",
                                                    paddingHorizontal: 5
                                                }}>
                                                    {item.title}
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                </View>
                            </View>
                        </View>
                        <View style={{
                            paddingHorizontal: 15,
                        }}>
                            <Calender
                                label={"تاني شئ تختار : "}
                                title={"تاريخ الوصول "}
                                onDateChange={handleStartDateChange}
                                plus={0}
                                dropdownPosition={"bottom"}
                            />

                            {offerType == 1 ?
                                <Calender
                                    label={"رابع شئ تختار : "}
                                    title={"تاريخ المغادرة "}
                                    onDateChange={handleEndDateChange}
                                    plus={1}
                                    dropdownPosition={"top"} />
                                :
                                null
                            }
                        </View>

                        <TouchableOpacity
                            onPress={() => _applySearch()}
                            style={{
                                width: "100%",
                                backgroundColor: "#51672D",
                                padding: 10,
                                borderRadius: 10,
                                marginVertical: 5
                            }}>
                            {loading == true ?

                                <ActivityIndicator size={40} color={"#FFF"} />
                                :
                                <Text style={{
                                    textAlign: "center",
                                    fontFamily: "Bold",
                                    color: "#FFF"
                                }}>
                                    إضغط هنا للبحث
                                </Text>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => _getChalestByCity('4')
                            }
                            style={{
                                width: "100%",
                                backgroundColor: "red",
                                padding: 10,
                                borderRadius: 10,
                            }}>

                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: 40
                            }}>
                                <Text style={{
                                    textAlign: "center",
                                    fontFamily: "Bold",
                                    color: "#FFF",
                                    fontSize: 12,
                                    paddingHorizontal: 10
                                }}>
                                    أو أضغط هنا لمشاهدة كل المزارع وكل الحجوزات المتوفرة
                                </Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: Constants.statusBarHeight,
        height: 120,
        width: "100%",
        paddingHorizontal: 20,
        backgroundColor: "#51672D",
        alignItems: "center",
        justifyContent: "center",
    },

    itemTitle: {
        backgroundColor: "rgba(0,0,0,0.5)",
        paddingHorizontal: 10,
        borderRadius: 5,
        color: "#FFF",
        fontFamily: "Regular",
        fontSize: 16,
        zIndex: 10000
    },
    body: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: 5
    },
    itemContent: {
        alignItems: "flex-end",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 5,
        height: 150
    },
    featuredItem: {
        height: 150,
        alignItems: "flex-start",
        padding: 5,
        flexDirection: "row-reverse"
    },
    itemImg: {
        width: "100%",
        resizeMode: "cover",
        height: 300,
        borderRadius: 10,
        overflow: "hidden",
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10
    },
    imgLayer: {
        position: "absolute",
        margin: 2.5,
        zIndex: 1000,
        width: "100%",
        height: 300,
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: 5
    },
    logo: {
        width: 50,
        height: 50,
        padding: 5,
        borderRadius: 26,
        borderWidth: 1,
        borderColor: "#000"
    },

    itemContainer: {
        borderRadius: 15,
        overflow: "hidden",
        width: "50%",
        height: 300,
        padding: 2.5,
        marginVertical: 5
    },
    item: {
        width: "100%"
    },

    cats: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 20,
        flexWrap: "wrap",
        width: "100%"
    },

    cat: {
        backgroundColor: "#FFF",
        width: "48%",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        borderRadius: 15,
        paddingHorizontal: 5,
        paddingVertical: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.3,

        elevation: 13
    },

    catItem: {
        borderRadius: 30,
        width: 60,
        height: 60,
        resizeMode: "contain"
    },

    catText: {
        marginVertical: 5,
        fontFamily: "Bold",
        color: "#143656",
        fontSize: 10,
        textAlign: "center"
    },

    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    loadingContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
    },
});
