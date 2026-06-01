import React, { useState } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    Modal
} from "react-native";
import { sendChaletRequest } from '../../../../network';
import { ArrivalTypes } from "../../../../const/api";
import { styles } from "../../../../theme/style";
import axios from 'axios';
import moment from "moment";
import { BaseLayout, Header } from "@components";
import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "../../../../navigation/AppStack";
import { useTranslation } from "react-i18next";

type Props = StackScreenProps<AppStackParamList, "NewChaletsAndFarmsConfirm">;

export const NewConfirmOrder = ({ route, navigation }: Props) => {
    const { order_info, chalet, offer, date } = route.params;
    const { t } = useTranslation();
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
    };

    const sendWhatsappMsg = async (recipient: string, message: string) => {
        const formData = new FormData();
        formData.append('Token', '793312044');
        formData.append('Phones', '+9647824846025');
        formData.append('recipient', recipient);
        formData.append('Doctype', 'text');
        formData.append('Message', message);
        formData.append('account', '1');

        try {
            await axios.post('https://api2.4whatsapp.com/api/Agent_Client_', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        } catch (error: any) {
            console.log('WhatsApp error:', error?.message);
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

                const msg = `‫
                السلام عليكم ورحمه الله وبركاته

                السيد المحترم / ${userName}

                لديك طلب جديد، الرجاء الضغط على هذا الرابط لمشاهدة التفاصيل:
                ${linkUrl}

                مع تحيات إدارة تطبيق الحجز السريع بالعراق
                ‬`;

                await sendWhatsappMsg(phoneNumber, msg);
                await sendWhatsappMsg(`+964${order_info.ApplicantMobileNumber}`, msg);
                alert(t("orderDetails.successOrder"));
                navigation.replace("TabNavigator");
            } else {
                alert(t("common.errorOrder"));
            }
        } catch (error) {
            alert(t("common.errorOrder"));
        } finally {
            setLoading(false);
        }
    };

    const rows = [
        { label: t("orderDetails.ownerLabel"), value: order_info?.ApplicantName },
        { label: t("orderDetails.phoneLabel"), value: order_info?.ApplicantMobileNumber },
        { label: t("orderDetails.chaletLabel"), value: chalet.chaletName },
        { label: t("orderDetails.comingPeopleLabel"), value: ArrivalTypes.filter((item) => item.id == order_info.Arrivals)[0]?.title },
        { label: t("orderDetails.arrivalDateLabel"), value: moment(date).format('MM-DD-YYYY') },
        { label: t("orderDetails.departureDateLabel"), value: moment(date).add(1, 'days').format('MM-DD-YYYY') },
        { label: t("orderDetails.adultsCountLabel"), value: order_info?.AdultsNumber },
        { label: t("orderDetails.additionalPersonsLabel"), value: order_info?.additionalAdults },
        { label: t("newConfirmOrder.chaletPriceLabel"), value: offer?.price },
        { label: t("orderDetails.additionalPersonPriceLabel"), value: chalet?.priceForAdditionalPersons },
        { label: t("newConfirmOrder.bookingTypeLabel"), value: offer?.offerTypeName },
        { label: t("orderDetails.totalAmountLabel"), value: t("orderDetails.totalAmount", { amount: orderTotalPrice }) },
    ];

    return (
        <BaseLayout>
            <Header text={t("orderDetails.title")} goBack={() => navigation.goBack()} />

            <Modal transparent animationType="fade" visible={loading} onRequestClose={() => setLoading(false)}>
                <View style={styles.overlay}>
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#51672D" />
                        <Text style={styles.loadingText}>
                            {t("common.sendingRequest")}
                        </Text>
                    </View>
                </View>
            </Modal>

            <View style={{ paddingHorizontal: 20, marginVertical: 20 }}>
                <ScrollView showsHorizontalScrollIndicator={false}>
                    <Text style={{ fontFamily: "Bold", textAlign: "center", marginBottom: 10, color: "#000", zIndex: 10 }}>
                        {t("orderDetails.sectionTitle")}
                    </Text>

                    {rows.map((row, idx) => (
                        <View key={idx} style={{ paddingHorizontal: 20, flexDirection: "row-reverse", paddingVertical: 5, alignItems: "center", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#DDDDDD" }}>
                            <Text style={{ fontFamily: "Bold" }}>{row.label}</Text>
                            <Text style={{ fontFamily: "Regular" }}>{row.value}</Text>
                        </View>
                    ))}

                    <TouchableOpacity
                        onPress={() => { void _placeOrder(); }}
                        style={{ width: "100%", backgroundColor: "#51672D", padding: 10, borderRadius: 10, marginBottom: 50, marginTop: 20 }}>
                        <Text style={{ textAlign: "center", fontFamily: "Bold", color: "#FFF" }}>
                            {t("orderDetails.sendRequestButton")}
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </BaseLayout>
    );
};
