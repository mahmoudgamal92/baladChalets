import {
    Text,
    View,
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
import { offerTypes } from "../../const/api";
import { Calender, AutoScrollingSlider } from "@components";
import moment from "moment";
import { GetAllChaletByFilter, getChaletsByCity } from '../../network';
import { getCatigories, getSlider } from "../../network";
import { api } from "../../const/api";
import { styles } from "./styles";
import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "../../navigation/AppStack";
import { useTranslation } from "react-i18next";

type Props = StackScreenProps<AppStackParamList, "TabNavigator">;

export default function HomePage({ navigation }: Props) {
    const { t } = useTranslation();
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
    }, []);

    const _getChalestByCity = async (city: string) => {
        setLoading(true);
        const chalets = await getChaletsByCity(city);
        if (Array.isArray(chalets)) {
            chalets.length > 0
                ? navigation.navigate("ChaletsAndFarmsNewList", { chalets })
                : alert(t('home.noOffersInCity'));
        } else {
            alert(t('home.noOffersInCity'));
        }
        setLoading(false);
    };

    function checkValidDate(date1: string, date2: string) {
        const d1 = moment(date1, 'MM-DD-YYYY').toDate();
        const d2 = moment(date2, 'MM-DD-YYYY').toDate();
        if (isNaN(d1.getTime()) || isNaN(d2.getTime())) throw new Error('Invalid date');
        return d1 < d2;
    }

    const handleEndDateChange = (year: string, month: string, day: string) => {
        setEndDate(`${month}-${day}-${year}`);
    };

    const handleStartDateChange = async (year: string, month: string, day: string) => {
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
    };

    const _applySearch = async () => {
        let params = {};
        if (startDate === "" || offerType === 0) {
            alert(t('home.fillDataCorrectly'));
            return;
        }

        if (endDate === "") {
            if (offerType === 2) {
                params = { CityId: 4, OfferType: parseInt(offerType.toString()), DateFrom: startDate, DateTo: startDate, IsOneDay };
            } else {
                const [startMonth, startDay, startYear] = startDate.split('-').map(Number);
                const nextDate = new Date(startYear, startMonth - 1, startDay + 1);
                const nextMonth = (nextDate.getMonth() + 1).toString();
                const nextDay = nextDate.getDate().toString();
                const nextYear = nextDate.getFullYear().toString();
                const dateTo = `${nextMonth}-${nextDay}-${nextYear}`;
                setEndDate(dateTo);
                params = { CityId: 4, OfferType: parseInt(offerType.toString()), DateFrom: startDate, DateTo: dateTo, IsOneDay };
            }
        } else {
            if (!checkValidDate(startDate, endDate)) {
                alert(t('home.departureMustBeAfterArrival'));
                return;
            }
            params = { CityId: 4, OfferType: parseInt(offerType.toString()), DateFrom: startDate, DateTo: endDate, IsOneDay };
        }

        setLoading(true);
        const chalets = await GetAllChaletByFilter(params);
        if (Array.isArray(chalets)) {
            chalets.length > 0
                ? navigation.navigate("ChaletsAndFarmsResult", { chalets, filters: params })
                : alert(t('home.noAvailableChalets'));
        } else {
            alert(t('home.noOffersInDate'));
        }
        setLoading(false);
    };

    const _getInfo = async () => {
        const data = await getCatigories();
        const slider_info = await getSlider();
        setSlider(slider_info);
        setCats(data);
    };

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="#51672D" />
            <View style={styles.header}>
                <View style={{ width: "100%", flexDirection: "row-reverse", justifyContent: "space-between" }}>
                    <TouchableOpacity style={{ width: "20%", justifyContent: "center", alignItems: "flex-end" }}>
                        <Image resizeMode='contain' source={require('../../assets/logo-transparent.png')} style={{ height: 80, width: 80 }} />
                    </TouchableOpacity>

                    <View style={{ width: "60%", alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontFamily: "Regular", color: "#000" }}>{t('home.inquiry')}</Text>
                        <Text style={{ fontFamily: "Regular", color: "#FFF" }}>07824846025</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => Linking.openURL('https://app.alhajz-alsarea.com/privacy.html')}
                        style={{ width: "20%", justifyContent: "center", alignItems: "flex-start" }}>
                        <Text style={{ fontFamily: "Bold", fontSize: 10, color: "#FFF" }}>privacy policy</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={{ width: "100%" }}>
                <View style={{ alignItems: "center", justifyContent: "center", width: "100%" }}>
                    <Text style={{ fontFamily: "Bold", textAlign: "right", fontSize: 15, marginVertical: 10, width: "100%", paddingHorizontal: 20, color: "#000" }}>
                        {t('home.welcome')}
                    </Text>

                    <AutoScrollingSlider slider={slider} api={api} />

                    <Modal transparent animationType="fade" visible={loading} onRequestClose={() => setLoading(false)}>
                        <View style={styles.overlay}>
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color="#51672D" />
                                <Text style={styles.loadingText}>{t('common.loadingData')}</Text>
                            </View>
                        </View>
                    </Modal>

                    <View style={{ paddingHorizontal: 20, width: '100%' }}>
                        <View style={{ paddingHorizontal: 5, marginTop: 10, width: "100%" }}>
                            <View style={{ width: "100%" }}>
                                <View style={{ flexDirection: "row-reverse", alignItems: "center" }}>
                                    <Text style={{ fontFamily: "Bold", textAlign: "right", marginBottom: 5, color: "red", zIndex: 10 }}>
                                        {t('home.firstStep')}
                                    </Text>
                                    <Text style={{ fontFamily: "Bold", textAlign: "right", marginBottom: 5, color: "#000", zIndex: 10 }}>
                                        {t('home.selectShift')}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: "row-reverse", width: "100%", alignItems: "center", justifyContent: "space-between", marginVertical: 5, backgroundColor: "#FFF", borderRadius: 20, borderColor: "#DDDDDD", borderWidth: 1, overflow: "hidden" }}>
                                    {offerTypes.map((item) => (
                                        <TouchableOpacity
                                            key={item.id}
                                            onPress={() => _handleOfferTypePress(parseFloat(item.id))}
                                            style={{ paddingVertical: 15, backgroundColor: offerType === parseFloat(item.id) ? "#51672D" : "#FFF", borderLeftColor: "#DDDDDD", borderLeftWidth: 1, width: "25%" }}>
                                            <Text style={{ fontFamily: "Regular", color: offerType === parseFloat(item.id) ? "#FFF" : "#51672D", fontSize: 11, textAlign: "center", paddingHorizontal: 5 }}>
                                                {item.title}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        </View>

                        <View style={{ paddingHorizontal: 15 }}>
                            <Calender
                                label={t('home.arrivalDateLabel')}
                                title={t('home.arrivalDateTitle')}
                                onDateChange={handleStartDateChange}
                                plus={0}
                                dropdownPosition={"bottom"}
                            />
                            {offerType === 1 && (
                                <Calender
                                    label={t('home.departureDateLabel')}
                                    title={t('home.departureDateTitle')}
                                    onDateChange={handleEndDateChange}
                                    plus={1}
                                    dropdownPosition={"top"}
                                />
                            )}
                        </View>

                        <TouchableOpacity onPress={() => _applySearch()} style={{ width: "100%", backgroundColor: "#51672D", padding: 10, borderRadius: 10, marginVertical: 5 }}>
                            {loading
                                ? <ActivityIndicator size={40} color={"#FFF"} />
                                : <Text style={{ textAlign: "center", fontFamily: "Bold", color: "#FFF" }}>{t('home.searchButton')}</Text>
                            }
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => _getChalestByCity('4')} style={{ width: "100%", backgroundColor: "red", padding: 10, borderRadius: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 40 }}>
                                <Text style={{ textAlign: "center", fontFamily: "Bold", color: "#FFF", fontSize: 12, paddingHorizontal: 10 }}>
                                    {t('home.allFarmsButton')}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
