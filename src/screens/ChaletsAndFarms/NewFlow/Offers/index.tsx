import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import moment from "moment";
import Modal from "react-native-modal";
import { BaseLayout, Header } from "@components";
import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "../../../../navigation/AppStack";
import { useTranslation } from "react-i18next";

type Props = StackScreenProps<AppStackParamList, "Offers">;

export const Offers = ({ route, navigation }: Props) => {
    const { chalet, offers } = route.params;
    const { t } = useTranslation();

    return (
        <BaseLayout>
            <Header text={t("common.searchResults")} goBack={() => navigation.goBack()} />
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 10, width: '100%' }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ justifyContent: "center" }}
                    style={{ width: "100%" }}
                    data={offers}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <View style={{ borderWidth: 1, borderColor: "#DDDDDD", borderRadius: 10, backgroundColor: "#FFF", paddingHorizontal: 10, paddingVertical: 5, marginVertical: 10, shadowColor: "#000", width: '100%', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.36, shadowRadius: 6.68, elevation: 11 }}>
                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'flex-end' }}>
                                <View style={{ backgroundColor: "#FF9000", marginBottom: 5, paddingHorizontal: 10, borderRadius: 5 }}>
                                    <Text style={{ fontFamily: 'Bold', width: '100%', textAlign: 'right' }}>
                                        {moment(item.offerDate).format("YYYY-MM-DD")}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', width: '100%' }}>
                                    {item.avaliableOfferModels.map((itm: any, idx: number) =>
                                        <View key={idx} style={{ backgroundColor: "#00AA76", padding: 5, borderRadius: 5, width: '30%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <TouchableOpacity
                                                onPress={() => navigation.navigate("NewPreOrder", { chalet, offer: itm, date: item.offerDate })}
                                                style={{ backgroundColor: 'red', borderRadius: 5, padding: 1 }}>
                                                <Text style={{ color: '#FFF', fontFamily: 'Regular', fontSize: 10 }}>
                                                    {t("offers.sendRequest")}
                                                </Text>
                                            </TouchableOpacity>
                                            <Text style={{ color: '#FFF', fontFamily: 'Regular', fontSize: 10 }}>
                                                {itm.offerTypeName}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        </View>
                    }
                />
            </View>
        </BaseLayout>
    );
};
