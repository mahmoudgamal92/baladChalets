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
import { sendChaletRequest, sendWhatsappMsg } from '../../network';
import { ArrivalTypes } from "../../const/api";
import { styles } from "../../theme/style";
import { BaseLayout, Header } from "@components";

export const ConfirmOrder = ({ route, navigation }) => {
    const { order_info, chalet, filters } = route.params;
    const [loading, setLoading] = useState(false);


    function parseDate(dateString) {
        const parts = dateString.split('-');
        return new Date(parts[2], parts[0] - 1, parts[1]);
    }

    function differenceInDays(date1, date2) {
        const parsedDate1 = parseDate(date1);
        const parsedDate2 = parseDate(date2);

        if (isNaN(parsedDate1) || isNaN(parsedDate2)) {
            return NaN;
        }

        const diff = Math.abs(parsedDate2 - parsedDate1);
        let daysDifference = Math.floor(diff / (1000 * 60 * 60 * 24));
        if (daysDifference === 0) {
            daysDifference = 1;
        }
        return daysDifference;
    }

    const days_num = differenceInDays(filters.DateTo, filters.DateFrom);


    const orderTotalPrice = (chalet?.price + parseInt(order_info?.additionalAdults) * parseInt(chalet.priceForAdditionalPersons) + parseInt(chalet.commissionAmount)) * days_num;

    const params = {
        CategoryId: chalet.categoryId,
        ChaletId: chalet.chaletID,
        DateFrom: filters.DateFrom,
        DateTo: filters.DateTo,
        OfferID: chalet.offerID,
        ApplicantName: order_info.ApplicantName,
        ApplicantMobileNumber: order_info.ApplicantMobileNumber,
        Arrivals: order_info.Arrivals,
        AdultsNumber: order_info.AdultsNumber,
        PersonsNumber: order_info.PersonsNumber,
        IsOneDay: filters.IsOneDay,
        TotalPrice: orderTotalPrice
    }



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
            
                مع تحيات إدارة تطبيق مزارع و شاليهات بلد  
                \u202C`;
                await sendWhatsappMsg(phoneNumber, msg);
                await sendWhatsappMsg(`+964${order_info.ApplicantMobileNumber}`, msg);

                setLoading(false)
                alert(" تم إرسال طلبك وسيتم التواصل معك بأقرب وقت");
                navigation.replace("TabNavigator");
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
                onRequestClose={() => setLoading(false)}
            >
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
                            {filters?.DateFrom}
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
                            {filters?.DateTo}
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
                            سعر الشالية أو المنتجع
                        </Text>

                        <Text style={{ fontFamily: "Regular" }}>
                            {chalet?.price}
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
                            عدد الأيام
                        </Text>

                        <Text style={{ fontFamily: "Regular" }}>
                            {days_num} يوم
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
                        {
                            loading ? <ActivityIndicator size="small" color="#FFF" /> :
                                <Text style={{
                                    textAlign: "center",
                                    fontFamily: "Bold",
                                    color: "#FFF"
                                }}>
                                    أضغط هنا لإرسال الطلب
                                </Text>}
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </BaseLayout>
    );
}