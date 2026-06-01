import { View, Text, Linking, Image, TouchableOpacity, Platform } from 'react-native';
import React from 'react';
import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "../../navigation/AppStack";
import { useTranslation } from "react-i18next";

type Props = StackScreenProps<AppStackParamList, "VersionUpgrade">;

export default function VersionUpgrade({ navigation }: Props) {
    const { t } = useTranslation();

    const navigateToApp = () => {
        if (Platform.OS === 'android') {
            void Linking.openURL('https://play.google.com/store/apps/details?id=com.seyahaa.seyahaa');
        } else if (Platform.OS === 'ios' || Platform.OS === 'macos') {
            void Linking.openURL('https://apps.apple.com/us/app/id6508169320');
        }
    };

    return (
        <View style={{ alignItems: "center", justifyContent: "center", flex: 1, backgroundColor: "#FFF", paddingHorizontal: 20 }}>
            <Text style={{ color: "#000", fontFamily: "Bold", fontSize: 20, marginTop: 50, marginBottom: 50 }}>
                {t("versionUpgrade.welcome")}
            </Text>
            <Text style={{ color: "#000", fontFamily: "Bold", fontSize: 20, marginTop: 10, marginBottom: 50, textAlign: 'center' }}>
                {t("versionUpgrade.attention")}
            </Text>
            <Image
                resizeMode='contain'
                source={require('../../../assets/alert.png')}
                style={{ height: 200 }}
            />
            <Text style={{ color: "#000", fontFamily: "Regular", fontSize: 20, textAlign: 'center', marginVertical: 30 }}>
                {t("versionUpgrade.newVersion")}
            </Text>
            <TouchableOpacity
                onPress={() => navigateToApp()}
                style={{ width: "100%", backgroundColor: "#51672D", padding: 10, borderRadius: 10, marginVertical: 30 }}>
                <Text style={{ textAlign: "center", fontFamily: "Bold", color: "#FFF", padding: 10 }}>
                    {t("versionUpgrade.updateButton")}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
