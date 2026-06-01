import React, { useState } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    Modal
} from "react-native";
import { sendChaletRequest, sendWhatsappMsg } from '../../../network';
import { ArrivalTypes } from "../../../const/api";
import { styles } from "../../../theme/style";
import { BaseLayout, Header } from "@components";
import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "../../../navigation/AppStack";
import { useTranslation } from "react-i18next";

type Props = StackScreenProps<AppStackParamList, "ChaletsAndFarmsConfirm">;

export const ConfirmOrder = ({ route, navigation }: Props) => {
    const { order_info, chalet, filters } = route.params;
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

    function parseDate(dateString: string) {
        const parts = dateString.split('-');
        return new Date(Number(parts[2]), Number(parts[0]) - 1, Number(parts[1]));
    }

    function differenceInDays(date1: string, date2: string) {
        const parsedDate1 = parseDate(date1);
        const parsedDate2 = parseDate(date2);
        if (isNaN(parsedDate1.getTime()) || isNaN(parsedDate2.getTime())) return NaN;
        const diff = Math.abs(parsedDate2.getTime() - parsedDate1.getTime());
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        return days === 0 ? 1 : days;
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
        TotalPrice: orderTotalPrice,
    };

    const _placeOrder = async () => {
        setLoading(true);
        try {
            const response = await sendChaletRequest(params);
            if (response.success) {
                const { userName, linkUrl, phoneNumber } = response.data;
                const msg = `‫\nالسلام عليكم ورحمه الله وبركاته\n\nالسيد المحترم / ${userName}\n\nلديك طلب جديد، الرجاء الضغط على هذا الرابط لمشاهدة التفاصيل:\n${linkUrl}\n\nمع تحيات إدارة تطبيق مزارع و شاليهات بلد\n‬`;
                await sendWhatsappMsg(phoneNumber, msg);
                await sendWhatsappMsg(`+964${order_info.ApplicantMobileNumber}`, msg);
                alert(t("orderDetails.successOrderSent"));
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
        { label: t("orderDetails.comingPeopleLabel"), value: ArrivalTypes.filter((item) => item.id === order_info.Arrivals)[0]?.title },
        { label: t("orderDetails.arrivalDateLabel"), value: filters?.DateFrom },
        { label: t("orderDetails.departureDateLabel"), value: filters?.DateTo },
        { label: t("orderDetails.adultsCountLabel"), value: order_info?.AdultsNumber },
        { label: t("orderDetails.additionalPersonsLabel"), value: order_info?.additionalAdults },
        { label: t("confirmOrder.chaletPriceLabel"), value: chalet?.price },
        { label: t("orderDetails.additionalPersonPriceLabel"), value: chalet?.priceForAdditionalPersons },
        { label: t("confirmOrder.daysCountLabel"), value: t("confirmOrder.days", { count: days_num }) },
        { label: t("orderDetails.totalAmountLabel"), value: t("orderDetails.totalAmount", { amount: orderTotalPrice }) },
    ];

    return (
        <BaseLayout>
            <Header text={t("orderDetails.title")} goBack={() => navigation.goBack()} />
            <Modal transparent animationType="fade" visible={loading} onRequestClose={() => setLoading(false)}>
                <View style={styles.overlay}>
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#51672D" />
                        <Text style={styles.loadingText}>{t("common.sendingRequest")}</Text>
                    </View>
                </View>
            </Modal>

            <View style={{ paddingHorizontal: 20, marginVertical: 20 }}>
                <ScrollView showsHorizontalScrollIndicator={false}>
                    <Text style={{ fontFamily: "Bold", textAlign: "center", marginBottom: 10, color: "#000" }}>
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
                        {loading
                            ? <ActivityIndicator size="small" color="#FFF" />
                            : <Text style={{ textAlign: "center", fontFamily: "Bold", color: "#FFF" }}>{t("orderDetails.sendRequestButton")}</Text>
                        }
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </BaseLayout>
    );
};
