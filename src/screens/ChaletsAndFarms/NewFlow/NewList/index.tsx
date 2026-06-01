import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    FlatList,
    Linking,
    TextInput,
    useWindowDimensions,
    Modal
} from "react-native";
import React, { useState } from "react";
import {
    AntDesign,
    FontAwesome5,
    EvilIcons,
    MaterialIcons
} from "@expo/vector-icons";
import Constants from 'expo-constants';
import { api } from "../../../../const/api";
import RenderHtml from 'react-native-render-html';
import { BaseLayout, Header, ImagesModal } from "@components";
import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "../../../../navigation/AppStack";
import { useTranslation } from "react-i18next";

type Props = StackScreenProps<AppStackParamList, "ChaletsAndFarmsNewList">;

export const NewList = ({ route, navigation }: Props) => {
    const { chalets } = route.params;
    const { t } = useTranslation();
    const [modalVisible, setModalVisible] = useState(false);
    const [detailsModalVisible, setDetailsModalVisible] = useState(false);
    const [chaletDescription, setChaletDescription] = useState("");
    const [modalImages, setModalImages] = useState([]);
    const [serachText, setSearchText] = useState('');
    const { width } = useWindowDimensions();
    const [avalibleChalets, setAvalibleChalets] = useState(chalets);

    function filterChaletsByName(searchText: string) {
        setSearchText(searchText);
        const lowercasedSearchText = searchText.toLowerCase();
        setAvalibleChalets(chalets.filter((chalet: any) =>
            chalet.chaletName.toLowerCase().includes(lowercasedSearchText)));
    }

    return (
        <BaseLayout>
            <Header text={t("common.searchResults")} goBack={() => navigation.goBack()} />

            <ImagesModal
                visible={modalVisible}
                images={modalImages}
                onClose={() => setModalVisible(false)}
            />

            <Modal visible={detailsModalVisible} statusBarTranslucent>
                <View style={{ backgroundColor: "#FFF", width: "100%", borderRadius: 20, padding: 10, paddingTop: Constants.statusBarHeight + 10, height: 600 }}>
                    <View style={{ borderBottomColor: "#DDDDDD", borderBottomWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <TouchableOpacity onPress={() => setDetailsModalVisible(false)}>
                            <AntDesign name="close" size={24} color="#586261" />
                        </TouchableOpacity>
                        <Text style={{ fontFamily: "Bold", padding: 5 }}>
                            {t("common.details")}
                        </Text>
                    </View>
                    <RenderHtml contentWidth={width * 0.9} source={{ html: chaletDescription }} />
                </View>
            </Modal>

            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 10 }}>
                <View style={{ alignItems: 'center', width: '100%', marginVertical: 10, flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                    <View style={{ borderColor: 'grey', borderWidth: 1.5, width: '90%', height: 50, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 1, borderRadius: 5, flexDirection: 'row' }}>
                        <TextInput
                            onChangeText={(text) => filterChaletsByName(text)}
                            placeholder={t("newList.searchPlaceholder")}
                            value={serachText}
                            style={{ width: '80%', fontSize: 12, color: 'grey', fontFamily: 'Regular', paddingHorizontal: 5, textAlign: 'right' }}
                            placeholderTextColor={'grey'}
                        />
                        <AntDesign name="search" size={24} color="grey" />
                    </View>
                    <TouchableOpacity onPress={() => filterChaletsByName("")}>
                        <AntDesign name="close-circle" size={30} color="grey" />
                    </TouchableOpacity>
                </View>

                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ alignItems: "center", justifyContent: "center", width: "100%" }}
                    data={avalibleChalets}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }: { item: any }) =>
                        <TouchableOpacity style={{ borderWidth: 1, borderColor: "#DDDDDD", borderRadius: 10, backgroundColor: "#FFF", paddingHorizontal: 10, paddingVertical: 5, marginVertical: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.36, shadowRadius: 6.68, elevation: 11 }}>
                            <View style={{ flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between" }}>
                                <View style={{ width: "50%", alignItems: 'center' }}>
                                    <Text style={{ fontFamily: "Bold", textAlign: 'right' }}>{item.chaletName}</Text>
                                    {item.videoUrl !== null &&
                                        <TouchableOpacity onPress={() => { void Linking.openURL(item.videoUrl); }} style={{ backgroundColor: 'red', padding: 5, flexDirection: 'row', borderRadius: 10 }}>
                                            <AntDesign name="youtube" size={24} color="#FFF" />
                                            <Text style={{ fontFamily: "Bold", textAlign: 'right', color: '#FFF' }}>
                                                {t("common.showVideo")}
                                            </Text>
                                        </TouchableOpacity>
                                    }
                                </View>

                                <View style={{ width: "50%" }}>
                                    <View style={{ flexDirection: "row-reverse", justifyContent: 'space-between', alignItems: "center", backgroundColor: '#3D0A48', padding: 5, borderRadius: 10, width: '100%' }}>
                                        <Text style={{ fontFamily: "Regular", color: "#FFF", fontSize: 12 }}>
                                            {t("newList.ageCounting", { age: item.adultsAge })}
                                        </Text>
                                    </View>
                                    <Text style={{ fontFamily: "Regular", textAlign: 'center' }}>
                                        {t("newList.priceUpTo", { count: item.adultsNumber })}
                                    </Text>
                                    {item.shortDescription !== null &&
                                        <Text style={{ marginTop: 5, fontFamily: "Regular", textAlign: 'center', backgroundColor: "#51672D", padding: 5, borderRadius: 10, color: '#FFF', fontSize: 10 }}>
                                            {item.shortDescription}
                                        </Text>
                                    }
                                </View>
                            </View>

                            <View style={{ flexDirection: "row-reverse", marginVertical: 20 }}>
                                <View style={{ width: "40%", alignItems: "center", justifyContent: "center" }}>
                                    <ImageBackground
                                        source={{ uri: api.mediaURL + item.mainImage }}
                                        style={{ width: "100%", height: 260, borderRadius: 10, justifyContent: "flex-end" }}
                                        imageStyle={{ borderRadius: 10 }}
                                        resizeMode="cover">
                                        <TouchableOpacity
                                            onPress={() => { setModalImages(item.chaletGallery); setModalVisible(true); }}
                                            style={{ backgroundColor: "#1D4746", padding: 5, borderRadius: 5, flexDirection: "row-reverse", alignItems: "center" }}>
                                            <FontAwesome5 name="images" size={24} color="#FFF" style={{ marginHorizontal: 5 }} />
                                            <Text style={{ color: "#FFF", fontFamily: "Regular" }}>
                                                {t("common.showPhotos")}
                                            </Text>
                                        </TouchableOpacity>
                                    </ImageBackground>
                                </View>

                                <View style={{ width: "60%", paddingHorizontal: 5 }}>
                                    <View style={{ flexDirection: "row-reverse", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
                                        {[
                                            { label: t("amenities.additionalPersons"), value: item.personsNumber, icon: <FontAwesome5 name="users" size={24} color="#586261" /> },
                                            { label: t("amenities.additionalPersonPrice"), value: item.priceForAdditionalPersons, icon: <FontAwesome5 name="money-bill" size={24} color="#586261" /> },
                                            { label: t("amenities.roomsCount"), value: item?.roomsNumber, icon: <FontAwesome5 name="bed" size={24} color="#586261" /> },
                                            { label: t("amenities.kidsToys"), value: item.kidsToys ? t("common.available") : t("common.notAvailable"), icon: <MaterialIcons name="child-care" size={24} color="black" /> },
                                            { label: t("amenities.bigPool"), value: item.bigPool ? t("common.available") : t("common.notAvailable"), icon: <FontAwesome5 name="swimmer" size={24} color="#586261" /> },
                                            { label: t("amenities.deposit"), value: item.deposit ? t("common.available") : t("common.notAvailable"), icon: <MaterialIcons name="table-restaurant" size={24} color="#586261" /> },
                                            { label: t("amenities.hotPool"), value: item.hotPool ? t("common.available") : t("common.notAvailable"), icon: <FontAwesome5 name="swimmer" size={24} color="#586261" /> },
                                            { label: t("amenities.smallPool"), value: item.smallPool ? t("common.available") : t("common.notAvailable"), icon: <FontAwesome5 name="swimmer" size={24} color="#586261" /> },
                                            { label: t("amenities.billiards"), value: item.bathroomNumber == 1 ? t("common.available") : t("common.notAvailable"), icon: <MaterialIcons name="table-restaurant" size={24} color="#586261" /> },
                                        ].map((amenity, idx) => (
                                            <View key={idx} style={{ width: "33%", alignItems: "center", justifyContent: "center" }}>
                                                <Text style={{ fontFamily: "Bold", fontSize: 10, color: "#51672D", marginVertical: 1 }}>{amenity.label}</Text>
                                                {amenity.icon}
                                                <Text style={{ fontFamily: "Regular", fontSize: 10, color: "#000", marginVertical: 1 }}>{amenity.value}</Text>
                                            </View>
                                        ))}
                                    </View>

                                    <View style={{ backgroundColor: "yellow", padding: 5, borderRadius: 5, marginTop: 10 }}>
                                        <Text style={{ textAlign: "center", fontFamily: "Regular", fontSize: 12 }}>
                                            {t("newList.paymentMethod", { method: item.paymentMethod })}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between" }}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("MonthSelection", { chalet: item })}
                                    style={{ backgroundColor: "red", flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: 10, paddingVertical: 5, paddingHorizontal: 10, marginTop: 10, height: 40 }}>
                                    <Text style={{ fontFamily: "Bold", color: "#FFF", fontSize: 10 }}>
                                        {t("newList.allBookings")}
                                    </Text>
                                    <AntDesign name="shopping-cart" size={26} color="#FFF" />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => { setChaletDescription(item.chaletDescription); setDetailsModalVisible(true); }}
                                    style={{ backgroundColor: "#51672D", flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: 10, paddingVertical: 5, paddingHorizontal: 10, marginTop: 10, height: 40 }}>
                                    <Text style={{ fontFamily: "Bold", color: "#FFF", fontSize: 10 }}>
                                        {t("newList.detailsAndTimes")}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => { void Linking.openURL(item.address); }}
                                    style={{ backgroundColor: "#00AA76", flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: 10, paddingVertical: 5, paddingHorizontal: 10, marginTop: 10, height: 40 }}>
                                    <Text style={{ fontFamily: "Bold", color: "#FFF", fontSize: 10 }}>
                                        {t("common.location")}
                                    </Text>
                                    <EvilIcons name="location" size={24} color="#FFF" />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    }
                />
            </View>
        </BaseLayout>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
});
