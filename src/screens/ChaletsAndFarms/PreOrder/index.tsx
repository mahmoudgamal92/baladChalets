import React, { useState } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    TextInput,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { styles } from "../../../theme/style";
import { ArrivalTypes } from "../../../const/api";
import { BaseLayout, Header } from "@components";
import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "../../../navigation/AppStack";
import { useTranslation } from "react-i18next";

type Props = StackScreenProps<AppStackParamList, "ChaletsAndFarmsPreOrder">;

export const PreOrder = ({ route, navigation }: Props) => {
    const { item, filters } = route.params;
    const { t } = useTranslation();
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [arrivals, setArrivals] = useState(0);
    const [adults, setAdults] = useState(0);
    const [additionalAdults, setAdditionalAdults] = useState(0);
    const [kids, setKids] = useState(0);

    function toEnglishNumber(strNum: string): string {
        const arabicNumbers = "٠١٢٣٤٥٦٧٨٩".split("");
        const englishNumbers = "0123456789".split("");
        return strNum
            .replace(/[٠١٢٣٤٥٦٧٨٩]/g, x => englishNumbers[arabicNumbers.indexOf(x)])
            .replace(/[^\d]/g, "");
    }

    const _handleArrivals = () => {
        const max_coming = parseInt(item.adultsNumber) + parseInt(item.personsNumber);
        if (adults > parseInt(item.adultsNumber)) {
            if (adults > max_coming) {
                alert(t("orderForm.maxPersonsAlert", { max: max_coming }));
                setAdults(0);
                setAdditionalAdults(0);
            } else {
                setAdults(parseInt(item.adultsNumber));
                setAdditionalAdults(adults - parseInt(item.adultsNumber));
            }
        } else {
            setAdditionalAdults(0);
        }
    };

    function isValidIraqNumber(number: string): boolean {
        return /^07[789]\d{8}$/.test(number);
    }

    const order_info = {
        ApplicantName: fullName,
        ApplicantMobileNumber: phoneNumber,
        AdultsNumber: adults,
        PersonsNumber: kids,
        Arrivals: arrivals,
        additionalAdults,
    };

    const _handleConfirmOrder = () => {
        if (arrivals === 0 || phoneNumber === "" || fullName === "" || adults === 0) {
            alert(t("orderForm.errorFillAll"));
        } else if (!isValidIraqNumber(phoneNumber)) {
            alert(t("orderForm.errorInvalidPhone"));
        } else {
            navigation.navigate("ChaletsAndFarmsConfirm", { order_info, chalet: item, filters });
        }
    };

    return (
        <BaseLayout>
            <Header text={t("orderForm.title")} goBack={() => navigation.goBack()} />
            <ScrollView>
                <View style={{ paddingHorizontal: 20, marginVertical: 20 }}>
                    <View style={{ paddingHorizontal: 10, paddingVertical: 10, marginTop: 10, width: "100%" }}>
                        <Text style={{ fontFamily: "Bold", textAlign: "right", marginBottom: 5, color: "#000" }}>
                            {t("orderForm.enterInfo")}
                        </Text>

                        <Text style={{ fontFamily: "Bold", color: "#000", textAlign: "right", width: "100%", marginVertical: 5 }}>
                            {t("orderForm.fullNameLabel")}
                        </Text>
                        <TextInput
                            placeholder={t("orderForm.fullNamePlaceholder")}
                            onChangeText={(text) => setFullName(text)}
                            style={{ height: 50, backgroundColor: "#FFF", width: "100%", borderRadius: 25, fontFamily: "Regular", paddingHorizontal: 10, borderWidth: 1, borderColor: "#DDDDDD", textAlign: "right" }}
                        />

                        <Text style={{ fontFamily: "Bold", color: "#000", textAlign: "right", width: "100%", marginVertical: 5 }}>
                            {t("orderForm.phoneLabel")}
                        </Text>
                        <TextInput
                            selectionColor={"#51672D"}
                            onChangeText={(text) => setPhoneNumber(toEnglishNumber(text))}
                            keyboardType="numeric"
                            placeholder={t("orderForm.phonePlaceholder")}
                            style={{ borderRadius: 25, fontFamily: "Regular", textAlign: "right", paddingHorizontal: 10, height: 50, width: "100%", color: "grey", backgroundColor: "#FFF" }}
                        />

                        <View style={{ flexDirection: "row-reverse" }}>
                            <View style={{ width: "50%" }}>
                                <Text style={{ fontFamily: "Bold", color: "#000", textAlign: "right", width: "100%", marginVertical: 5 }}>
                                    {t("orderForm.comingPeopleLabel")}
                                </Text>
                                <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    iconStyle={styles.iconStyle}
                                    itemTextStyle={{ fontFamily: "Regular", fontSize: 12 }}
                                    data={ArrivalTypes}
                                    maxHeight={300}
                                    labelField="title"
                                    valueField="id"
                                    placeholder={t("orderForm.comingPeoplePlaceholder")}
                                    onChange={(it) => setArrivals(it.id)}
                                    renderLeftIcon={() => <MaterialIcons style={styles.icon} name="keyboard-arrow-down" size={24} color={"grey"} />}
                                    renderRightIcon={() => <Feather style={styles.icon} color={"grey"} name="user" size={20} />}
                                />
                            </View>
                            <View style={{ width: "50%", alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ fontFamily: "Bold", color: "#000", textAlign: "right", fontSize: 11, width: "90%", marginVertical: 5 }}>
                                    {t("orderForm.personCountLabel", { age: item?.adultsAge })}
                                </Text>
                                <TextInput
                                    onChangeText={(text) => setAdults(Number(toEnglishNumber(text)) || 0)}
                                    onEndEditing={_handleArrivals}
                                    value={adults.toString()}
                                    keyboardType="numeric"
                                    placeholder={t("orderForm.personCountPlaceholder")}
                                    style={{ height: 50, backgroundColor: "#FFF", width: "90%", borderRadius: 25, fontFamily: "Regular", paddingHorizontal: 10, borderWidth: 1, borderColor: "#DDDDDD", textAlign: "right" }}
                                />
                            </View>
                        </View>

                        <View style={{ flexDirection: "row-reverse", alignItems: "center", marginTop: 20 }}>
                            <View style={{ width: "70%", alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ fontFamily: "Bold", color: "#000", textAlign: "right", width: "100%", marginVertical: 5 }}>
                                    {t("orderForm.additionalPersonsLabel")}
                                </Text>
                                <TextInput
                                    keyboardType="numeric"
                                    editable={false}
                                    selectTextOnFocus={false}
                                    value={additionalAdults.toString()}
                                    style={{ height: 50, backgroundColor: "#FFF", width: "100%", borderRadius: 25, fontFamily: "Regular", paddingHorizontal: 10, borderWidth: 1, borderColor: "#DDDDDD", textAlign: "right" }}
                                />
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={() => _handleConfirmOrder()}
                        style={{ width: "100%", backgroundColor: "#51672D", padding: 10, borderRadius: 25, marginVertical: 20 }}>
                        <Text style={{ textAlign: "center", fontFamily: "Bold", color: "#FFF" }}>
                            {t("orderForm.continueButton")}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </BaseLayout>
    );
};
