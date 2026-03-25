import React, { useState } from "react";

import {
    Text,
    View,
    StatusBar,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    Modal
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { sendChaletRequest } from '../../../network';
import { ArrivalTypes } from "../../../const/api";
import { styles } from "../../../theme/style";

import Constants from 'expo-constants';
import axios from 'axios';
import moment from "moment";
import { BaseLayout, Header } from "@components";

export const NewConfirmOrder = ({ route, navigation }) => {
    const { order_info, chalet, offer, date } = route.params;
    const [loading, setLoading] = useState(false);
    const orderTotalPrice = (offer?.price + parseInt(order_info?.additionalAdults) * parseInt(chalet.priceForAdditionalPersons) + parseInt(chalet.commissionAmount));

    const params = {
        CategoryId: offer.categoryId,
        ChaletId: chalet.chaletID,
        DateFrom: moment(date).format('MM-DD-YYYY'),
        DateTo: moment(date).add(1, 'days').format('MM-DD-YYYY'),
        OfferID: offer.offerID,
        ApplicantName: order_info.ApplicantName,
        ApplicantMobileNumber: order_info.ApplicantMobileNumber,
        Arrivals: order_info.Arrivals,
        AdultsNumber: order_info.AdultsNumber,
        PersonsNumber: chalet.PersonsNumber ?? 0,
        IsOneDay: true,
        TotalPrice: orderTotalPrice
    }


    const sendWhatsappMsg = async (recipient, message) => {
        const formData = new FormData();
        formData.append('Token', '793312044');
        formData.append('Phones', '+9647824846025');
        formData.append('recipient', recipient);
        formData.append('Doctype', 'text');
        formData.append('Message', message);
        formData.append('account', '1');

        try {
            const response = await axios.post('https://api2.4whatsapp.com/api/Agent_Client_', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Response status:', response.status);
            console.log('Response data:', response.data);
        } catch (error) {
            if (error.response) {
                console.log('Error status:', error.response.status);
                console.log('Error data:', error.response.data);
            } else if (error.request) {
                console.log('No response received:', error.request);
            } else {
                console.log('Error:', error.message);
            }
        }
    };


    const _placeOrder = async () => {
        setLoading(true);
        try {
            const response = await sendChaletRequest(params);

            if (response.success) {
                const userName = response.data.userName;
                const linkUrl = response.data.linkUrl;
                const phoneNumber = response.data.phoneNumber;

                let msg = `\u202B
                السلام عليكم ورحمه الله وبركاته

                السيد المحترم / ${userName}

                لديك طلب جديد، الرجاء الضغط على هذا الرابط لمشاهدة التفاصيل:
                ${linkUrl}

                مع تحيات إدارة تطبيق الحجز السريع بالعراق
                \u202C`;

                await sendWhatsappMsg(phoneNumber, msg);
                await sendWhatsappMsg(`+964${order_info.ApplicantMobileNumber}`, msg);
                setLoading(false)
                alert("تم إضافة طلبك بنجاح");
                navigation.replace("TabNavigator");
                console.log(response);
            } else {
                console.log(response);
                alert("حدث خطأ أثناء إضافة الطلب.");
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert("حدث خطأ أثناء إضافة الطلب.");
        } finally {
            setLoading(false);
        }
    };




    return (
        <BaseLayout>

            <Header text=" تفاصيل الحجز" goBack={() => navigation.goBack()} />


            <Modal
                transparent={true}
                animationType="fade"
                visible={loading}
                onRequestClose={() => setLoading(false)}>

                <View style={styles.overlay}>
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#51672D" />
                        <Text style={styles.loadingText}>
                            جار إرسال طلبك الرجاء الإنتظار  لحين الإكتمال ...
                        </Text>
                    </View>
                </View>

            </Modal>




            <View style={{
                paddingHorizontal: 20,
                marginVertical: 20
            }}>

                <ScrollView
                    showsHorizontalScrollIndicator={false}
                >
                    <View
                        style={{
                            width: "100%",
                            paddingHorizontal: 10
                        }}>

                        <Text
                            style={{
                                fontFamily: "Bold",
                                textAlign: "center",
                                marginBottom: 10,
                                color: "#000",
                                zIndex: 10,
                            }}>
                            تفاصيل الحجز
                        </Text>
                    </View>


                    <View style={{
                        paddingHorizontal: 20,
                        flexDirection: "row-reverse",
                        paddingVertical: 5,
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottomWidth: 1,
                        borderBottomColor: "#DDDDDD"
                    }}>
                        <Text style={{ fontFamily: "Bold" }}>
                            صاحب الطلب
                        </Text>

                        <Text style={{ fontFamily: "Regular" }}>
                            {order_info?.ApplicantName}
                        </Text>
                    </View>


                    <View style={{
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                        flexDirection: "row-reverse",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottomWidth: 1,
                        borderBottomColor: "#DDDDDD"
                    }}>
                        <Text style={{ fontFamily: "Bold" }}>
                            رقم الموبايل
                        </Text>

                        <Text style={{ fontFamily: "Regular" }}>
                            {order_info?.ApplicantMobileNumber}
                        </Text>
                    </View>


                    <View style={{
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                        flexDirection: "row-reverse",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottomWidth: 1,
                        borderBottomColor: "#DDDDDD"
                    }}>
                        <Text style={{ fontFamily: "Bold" }}>
                            منتجع أو شالية
                        </Text>

                        <Text style={{ fontFamily: "Regular" }}>
                            {chalet.chaletName}
                        </Text>
                    </View>





                    <View style={{
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                        flexDirection: "row-reverse",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottomWidth: 1,
                        borderBottomColor: "#DDDDDD"
                    }}>
                        <Text style={{ fontFamily: "Bold" }}>
                            القادمون
                        </Text>

                        <Text style={{ fontFamily: "Regular" }}>
                            {ArrivalTypes.filter((item) => item.id == order_info.Arrivals)[0].title}
                        </Text>
                    </View>



                    <View style={{
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                        flexDirection: "row-reverse",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottomWidth: 1,
                        borderBottomColor: "#DDDDDD"
                    }}>
                        <Text style={{ fontFamily: "Bold" }}>
                            تاريخ الوصول :
                        </Text>

                        <Text style={{ fontFamily: "Regular" }}>
                            {moment(date).format('MM-DD-YYYY')}
                        </Text>
                    </View>

                    <View style={{
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                        flexDirection: "row-reverse",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottomWidth: 1,
                        borderBottomColor: "#DDDDDD"
                    }}>
                        <Text style={{ fontFamily: "Bold" }}>
                            تاريخ المغادرة :
                        </Text>

                        <Text style={{ fontFamily: "Regular" }}>
                            {moment(date).add(1, 'days').format('MM-DD-YYYY')}

                        </Text>
                    </View>

                    <View style={{
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                        flexDirection: "row-reverse",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottomWidth: 1,
                        borderBottomColor: "#DDDDDD"
                    }}>
                        <Text style={{ fontFamily: "Bold" }}>
                            عدد البالغين
                        </Text>

                        <Text style={{ fontFamily: "Regular" }}>
                            {order_info?.AdultsNumber}
                        </Text>
                    </View>



                    <View style={{
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                        flexDirection: "row-reverse",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottomWidth: 1,
                        borderBottomColor: "#DDDDDD"
                    }}>
                        <Text style={{ fontFamily: "Bold" }}>
                            عدد الأشخاص الإضافيين
                        </Text>

                        <Text style={{ fontFamily: "Regular" }}>
                            {order_info?.additionalAdults}
                        </Text>
                    </View>
                    <View style={{
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                        flexDirection: "row-reverse",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottomWidth: 1,
                        borderBottomColor: "#DDDDDD"
                    }}>
                        <Text style={{ fontFamily: "Bold" }}>
                            السعر
                        </Text>

                        <Text style={{ fontFamily: "Regular" }}>
                            {offer?.price}
                        </Text>
                    </View>

                    <View style={{
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                        flexDirection: "row-reverse",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottomWidth: 1,
                        borderBottomColor: "#DDDDDD"
                    }}>
                        <Text style={{ fontFamily: "Bold" }}>
                            سعر الشخص الإضافي :
                        </Text>

                        <Text style={{ fontFamily: "Regular" }}>
                            {chalet?.priceForAdditionalPersons}
                        </Text>
                    </View>

                    <View style={{
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                        flexDirection: "row-reverse",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottomWidth: 1,
                        borderBottomColor: "#DDDDDD"
                    }}>
                        <Text style={{ fontFamily: "Bold" }}>
                            نوع الحجز
                        </Text>

                        <Text style={{ fontFamily: "Regular" }}>
                            {offer?.offerTypeName}
                        </Text>
                    </View>



                    <View style={{
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                        flexDirection: "row-reverse",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottomWidth: 1,
                        borderBottomColor: "#DDDDDD"
                    }}>
                        <Text style={{ fontFamily: "Bold" }}>
                            المبلغ الإجمالي :
                        </Text>

                        <Text style={{ fontFamily: "Regular" }}>
                            {orderTotalPrice} د.ع
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => _placeOrder()}

                        style={{
                            width: "100%",
                            backgroundColor: "#51672D",
                            padding: 10,
                            borderRadius: 10,
                            marginBottom: 50,
                            marginTop: 20
                        }}>
                        <Text style={{
                            textAlign: "center",
                            fontFamily: "Bold",
                            color: "#FFF"
                        }}>
                            أضغط هنا لإرسال الطلب
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </BaseLayout>
    );
}