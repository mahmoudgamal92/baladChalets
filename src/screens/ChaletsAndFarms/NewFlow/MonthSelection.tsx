import React from "react";
import moment from "moment";
import {
    Text,
    View,
    StatusBar,
    TouchableOpacity,
    FlatList
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Constants from 'expo-constants';
import Entypo from '@expo/vector-icons/Entypo';
import { GetAvaliableOffersByDate } from "../../../network/index";
import { styles } from "../../../theme/style";
import { BaseLayout, Header } from "@components";

export const MonthSelection = ({ route, navigation }) => {
    const { chalet } = route.params;
    const startMonth = moment().startOf('month');
    const months = Array.from({ length: 12 }, (_, i) => {
        const currentMonth = startMonth.clone().add(i, 'months');
        return {
            name: `الشهر ${currentMonth.month() + 1} - ${currentMonth.format("YYYY")}`,
            startDate: currentMonth.format("MM-DD-YYYY"),
            endDate: currentMonth.endOf('month').format("MM-DD-YYYY")
        };
    });

    const _GetAvaliableOffersByDate = async (item) => {
        const offers = await GetAvaliableOffersByDate(chalet.chaletID, item);

        if (Array.isArray(offers)) {
            navigation.navigate('Offers', {
                chalet: chalet,
                offers: offers
            });
        }
        else {
            alert('لا توجد اي مواعيد متاحه للحجز في هذا الشهر')
        }
    }

    const renderMonth = ({ item }) => (
        <TouchableOpacity
            onPress={() => _GetAvaliableOffersByDate(item)}
            style={{
                width: '50%',
                padding: 10,

            }}>
            <View style={{
                backgroundColor: "#00AA76",
                height: 50,
                alignItems: 'center',
                flexDirection: 'row-reverse',
                justifyContent: 'center',
                borderRadius: 10
            }}>
                <Entypo name="calendar" size={24} color="#FFF" style={{ marginHorizontal: 5 }} />
                <Text style={{
                    color: '#FFF',
                    fontFamily: 'Bold',
                    textAlign: 'right',
                    fontSize: 12
                }}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <BaseLayout>
            <Header text="  اختيار شهر" goBack={() => navigation.goBack()} />

            <View style={{
                paddingHorizontal: 20,
                marginVertical: 20,
                width: '100%',
                flex: 1
            }}>

                <Text style={{
                    color: 'red',
                    fontFamily: 'Bold',
                    marginVertical: 20
                }}>
                    * لمعرفه الحجوزات المتوفره يجب عليك اختيار شهر اولا :
                </Text>

                <FlatList
                    data={months}
                    renderItem={renderMonth}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                />

            </View>
        </BaseLayout>
    );
}
