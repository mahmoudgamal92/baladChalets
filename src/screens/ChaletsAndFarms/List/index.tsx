import {
    Image,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    FlatList,
    Linking,
    ScrollView,
    TextInput,
    useWindowDimensions,
    Modal,
    ActivityIndicator
} from "react-native";
import React, { useState } from "react";
import {
    AntDesign,
    FontAwesome5,
    Ionicons,
    EvilIcons,
    MaterialIcons
} from "@expo/vector-icons";
import Constants from 'expo-constants';
import { api } from "../../../const/api";
import RenderHtml from 'react-native-render-html';
import { BaseLayout, Header } from "@components";
import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "../../../navigation/AppStack";
import { useTranslation } from "react-i18next";

type Props = StackScreenProps<AppStackParamList, "ChaletsAndFarmsResult">;

export const List = ({ route, navigation }: Props) => {
    const { chalets, filters } = route.params;
    const { t } = useTranslation();
    const [modalVisible, setModalVisible] = useState(false);
    const [detailsModalVisible, setDetailsModalVisible] = useState(false);
    const [chaletDescription, setChaletDescription] = useState("");
    const [modalImages, setModalImages] = useState([]);
    const [avalibleChalets, setAvalibleChalets] = useState(chalets);
    const [serachText, setSearchText] = useState('');
    const { width } = useWindowDimensions();

    function filterChaletsByName(searchText: string) {
        setSearchText(searchText);
        const lowercasedSearchText = searchText.toLowerCase();
        setAvalibleChalets(chalets.filter((chalet: any) =>
            chalet.chaletName.toLowerCase().includes(lowercasedSearchText)));
    }

    function sortChaletsByPrice(order: 'asc' | 'desc') {
        const sortedChalets = [...chalets].sort((a: any, b: any) =>
            order === 'asc' ? a.price - b.price : b.price - a.price
        );
        setAvalibleChalets(sortedChalets);
    }

    const _renderTime = (from: string, to: string) => {
        if (filters.OfferType === 2) return t('list.morningToEvening', { from, to });
        if (filters.OfferType === 3) return t('list.eveningToMorning', { from, to });
        return t('list.morningToMorning', { from, to });
    };

    const amenities = (item: any) => [
        { label: t("amenities.additionalPersons"), icon: <FontAwesome5 name="users" size={24} color="#586261" />, value: item.personsNumber },
        { label: t("amenities.additionalPersonPrice"), icon: <FontAwesome5 name="money-bill" size={24} color="#586261" />, value: item.priceForAdditionalPersons },
        { label: t("amenities.roomsCount"), icon: <FontAwesome5 name="bed" size={24} color="#586261" />, value: item?.roomsNumber },
        { label: t("amenities.kidsToys"), icon: <MaterialIcons name="child-care" size={24} color="black" />, value: item.kidsToys ? t("common.available") : t("common.notAvailable") },
        { label: t("amenities.bigPool"), icon: <FontAwesome5 name="swimmer" size={24} color="#586261" />, value: item.bigPool ? t("common.available") : t("common.notAvailable") },
        { label: t("amenities.deposit"), icon: <MaterialIcons name="table-restaurant" size={24} color="#586261" />, value: item.deposit ? t("common.available") : t("common.notAvailable") },
        { label: t("amenities.hotPool"), icon: <FontAwesome5 name="swimmer" size={24} color="#586261" />, value: item.hotPool ? t("common.available") : t("common.notAvailable") },
        { label: t("amenities.smallPool"), icon: <FontAwesome5 name="swimmer" size={24} color="#586261" />, value: item.smallPool ? t("common.available") : t("common.notAvailable") },
        { label: t("amenities.billiards"), icon: <MaterialIcons name="table-restaurant" size={24} color="#586261" />, value: item.bathroomNumber === 1 ? t("common.available") : t("common.notAvailable") },
    ];

    return (
        <BaseLayout>
            <Header text={t("common.searchResults")} goBack={() => navigation.goBack()} />

            <Modal visible={modalVisible} statusBarTranslucent>
                <View style={{ backgroundColor: "#FFF", width: "100%", borderRadius: 20, padding: 10, paddingTop: Constants.statusBarHeight + 10, flex: 1 }}>
                    <View style={{ borderBottomColor: "#DDDDDD", borderBottomWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <AntDesign name="close" size={24} color="#586261" />
                        </TouchableOpacity>
                        <Text style={{ fontFamily: "Bold", padding: 5 }}>{t("list.photos")}</Text>
                    </View>
                    {modalImages.length > 0 && (
                        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
                            {modalImages.map((item: any, idx) => (
                                <Image key={idx} source={{ uri: api.mediaURL + item.imageName }} resizeMode="cover" style={{ height: 200, width: "100%", marginVertical: 10, borderRadius: 10 }} />
                            ))}
                        </ScrollView>
                    )}
                </View>
            </Modal>

            <Modal visible={detailsModalVisible} statusBarTranslucent>
                <View style={{ backgroundColor: "#FFF", width: "100%", borderRadius: 20, padding: 10, paddingTop: Constants.statusBarHeight + 10, height: 600 }}>
                    <View style={{ borderBottomColor: "#DDDDDD", borderBottomWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <TouchableOpacity onPress={() => setDetailsModalVisible(false)}>
                            <AntDesign name="close" size={24} color="#586261" />
                        </TouchableOpacity>
                        <Text style={{ fontFamily: "Bold", padding: 5 }}>{t("common.details")}</Text>
                    </View>
                    <RenderHtml contentWidth={width * 0.9} source={{ html: chaletDescription }} />
                </View>
            </Modal>

            <View style={{ flexDirection: 'row-reverse', alignItems: 'center', width: '100%', justifyContent: 'space-between', marginVertical: 20, paddingHorizontal: 10 }}>
                <View style={{ backgroundColor: '#3D0A48', width: '45%', height: 35, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 1, borderRadius: 5, flexDirection: 'row' }}>
                    <TextInput
                        onChangeText={(text) => filterChaletsByName(text)}
                        placeholder={t("list.searchPlaceholder")}
                        value={serachText}
                        style={{ width: '80%', fontSize: 12, color: '#FFF', fontFamily: 'Regular', paddingHorizontal: 5 }}
                        placeholderTextColor={'#FFF'}
                    />
                    <AntDesign name="search" size={24} color="#FFF" />
                </View>
                <TouchableOpacity onPress={() => sortChaletsByPrice('desc')} style={{ backgroundColor: '#3D0A48', width: '25%', height: 35, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', paddingHorizontal: 1, borderRadius: 5 }}>
                    <Text style={{ color: '#FFF', fontFamily: 'Regular', fontSize: 12 }}>{t("list.sortHighestPrice")}</Text>
                    <Ionicons name="caret-up" size={16} color="#FFF" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => sortChaletsByPrice('asc')} style={{ backgroundColor: '#3D0A48', width: '25%', height: 35, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', paddingHorizontal: 1, borderRadius: 5 }}>
                    <Text style={{ color: '#FFF', fontFamily: 'Regular', fontSize: 12 }}>{t("list.sortLowestPrice")}</Text>
                    <Ionicons name="caret-down" size={16} color="#FFF" />
                </TouchableOpacity>
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ alignItems: "center", justifyContent: "center", width: "100%" }}
                data={avalibleChalets}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }: { item: any }) => (
                    <TouchableOpacity style={{ borderWidth: 1, borderColor: "#DDDDDD", borderRadius: 10, backgroundColor: "#FFF", paddingHorizontal: 10, paddingVertical: 5, marginVertical: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.36, shadowRadius: 6.68, elevation: 11 }}>
                        <View style={{ flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between" }}>
                            <View style={{ width: "50%", alignItems: 'flex-end' }}>
                                <Text style={{ fontFamily: "Bold", textAlign: 'right' }}>{item.chaletName}</Text>
                                {item.videoUrl !== null && (
                                    <TouchableOpacity onPress={() => { void Linking.openURL(item.videoUrl); }} style={{ backgroundColor: 'red', padding: 5, flexDirection: 'row', borderRadius: 10, alignItems: 'center' }}>
                                        <AntDesign name="youtube" size={20} color="#FFF" />
                                        <Text style={{ fontFamily: "Bold", fontSize: 12, textAlign: 'right', color: '#FFF', padding: 2 }}>
                                            {t("common.showVideo")}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                                <Text style={{ fontFamily: "Regular", color: "#00AA76", textAlign: 'right' }}>
                                    {t("list.bookingType", { type: item.offerTypeName })}
                                </Text>
                                <View style={{ flexDirection: "row-reverse", justifyContent: 'flex-start', alignItems: "center", backgroundColor: '#3D0A48', paddingVertical: 5, borderRadius: 10, marginTop: 5, width: '100%' }}>
                                    <Text style={{ fontFamily: "Regular", color: "#FFF", fontSize: 12 }}>
                                        {t("list.ageCounting", { age: item.adultsAge })}
                                    </Text>
                                </View>
                            </View>

                            <View style={{ width: "50%" }}>
                                <View style={{ flexDirection: "row-reverse", alignItems: "center", backgroundColor: "#51672D", paddingVertical: 10, padding: 5, borderRadius: 10 }}>
                                    <Text style={{ fontFamily: "Regular", color: "#FFF", fontSize: 10 }}>
                                        {_renderTime(item.offerTimeFrom, item.offerTimeTo)}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row-reverse', paddingTop: 5 }}>
                                    <Text style={{ fontFamily: "Regular" }}>
                                        {t("list.priceUpTo", { count: item.adultsNumber })}
                                    </Text>
                                    <Text style={{ backgroundColor: 'red', color: '#FFF', fontFamily: "Regular", padding: 1, borderRadius: 5 }}>
                                        {' '}{t("list.price", { price: item.price })}{' '}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ flexDirection: "row-reverse", marginVertical: 20 }}>
                            <View style={{ width: "40%", alignItems: "center", justifyContent: "center" }}>
                                <ImageBackground source={{ uri: api.mediaURL + item.mainImage }} style={{ width: "100%", height: 260, borderRadius: 10, justifyContent: "flex-end" }} imageStyle={{ borderRadius: 10 }} resizeMode="cover">
                                    <TouchableOpacity onPress={() => { setModalImages(item.chaletGallery); setModalVisible(true); }} style={{ backgroundColor: "#1D4746", padding: 5, borderRadius: 5, flexDirection: "row-reverse", alignItems: "center" }}>
                                        <FontAwesome5 name="images" size={24} color="#FFF" style={{ marginHorizontal: 5 }} />
                                        <Text style={{ color: "#FFF", fontFamily: "Regular" }}>{t("common.showPhotos")}</Text>
                                    </TouchableOpacity>
                                </ImageBackground>
                            </View>

                            <View style={{ width: "60%", paddingHorizontal: 5 }}>
                                <View style={{ flexDirection: "row-reverse", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
                                    {amenities(item).map((amenity, idx) => (
                                        <View key={idx} style={{ width: "33%", alignItems: "center", justifyContent: "center" }}>
                                            <Text style={{ fontFamily: "Bold", fontSize: 10, color: "#51672D", marginVertical: 1 }}>{amenity.label}</Text>
                                            {amenity.icon}
                                            <Text style={{ fontFamily: "Regular", fontSize: 10, color: "#000", marginVertical: 1 }}>{amenity.value}</Text>
                                        </View>
                                    ))}
                                </View>
                                <View style={{ backgroundColor: "yellow", padding: 5, borderRadius: 5, marginTop: 10 }}>
                                    <Text style={{ textAlign: "center", fontFamily: "Regular", fontSize: 12 }}>
                                        {t("list.paymentMethod", { method: item.paymentMethod })}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between" }}>
                            <TouchableOpacity onPress={() => navigation.navigate("ChaletsAndFarmsPreOrder", { item, filters })} style={{ backgroundColor: "red", flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: 10, paddingVertical: 5, paddingHorizontal: 20, marginTop: 10, height: 40 }}>
                                <Text style={{ fontFamily: "Bold", color: "#FFF" }}>{t("list.sendRequest")}</Text>
                                <AntDesign name="shopping-cart" size={26} color="#FFF" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setChaletDescription(item.chaletDescription); setDetailsModalVisible(true); }} style={{ backgroundColor: "#51672D", flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: 10, paddingVertical: 5, paddingHorizontal: 10, marginTop: 10, height: 40 }}>
                                <Text style={{ fontFamily: "Bold", color: "#FFF" }}>{t("common.details")}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { void Linking.openURL(item.address); }} style={{ backgroundColor: "#00AA76", flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: 10, paddingVertical: 5, paddingHorizontal: 20, marginTop: 10, height: 40 }}>
                                <Text style={{ fontFamily: "Bold", color: "#FFF" }}>{t("common.location")}</Text>
                                <EvilIcons name="location" size={24} color="#FFF" />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </BaseLayout>
    );
};
