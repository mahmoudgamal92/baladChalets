import React from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import moment from "moment";
import { GetAvaliableOffersByDate } from "../../../../network/index";
import { BaseLayout, Header } from "@components";
import { styles } from "./styles";
import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "../../../../navigation/AppStack";
import { useTranslation } from "react-i18next";

type Props = StackScreenProps<AppStackParamList, "MonthSelection">;

export const MonthSelection = ({ route, navigation }: Props) => {
    const { chalet } = route.params;
    const { t } = useTranslation();

    const startMonth = moment().startOf('month');
    const months = Array.from({ length: 12 }, (_, i) => {
        const currentMonth = startMonth.clone().add(i, 'months');
        return {
            name: t('monthSelection.month', { month: currentMonth.month() + 1, year: currentMonth.format("YYYY") }),
            startDate: currentMonth.format("MM-DD-YYYY"),
            endDate: currentMonth.endOf('month').format("MM-DD-YYYY")
        };
    });

    const _GetAvaliableOffersByDate = async (item: { name: string; startDate: string; endDate: string }) => {
        const offers = await GetAvaliableOffersByDate(chalet.chaletID, item);
        if (Array.isArray(offers)) {
            navigation.navigate('Offers', { chalet, offers });
        } else {
            alert(t('monthSelection.noAvailableDates'));
        }
    };

    const renderMonth = ({ item }: { item: { name: string; startDate: string; endDate: string } }) => (
        <TouchableOpacity onPress={() => { void _GetAvaliableOffersByDate(item); }} style={styles.monthItem}>
            <View style={styles.monthButton}>
                <Entypo name="calendar" size={24} color="#FFF" style={{ marginHorizontal: 5 }} />
                <Text style={styles.monthButtonText}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <BaseLayout>
            <Header text={t('monthSelection.title')} goBack={() => navigation.goBack()} />
            <View style={styles.container}>
                <Text style={styles.warningText}>
                    {t('monthSelection.warning')}
                </Text>
                <FlatList
                    data={months}
                    renderItem={renderMonth}
                    keyExtractor={(_, index) => index.toString()}
                    numColumns={2}
                />
            </View>
        </BaseLayout>
    );
};
