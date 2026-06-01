import { View, Text, ActivityIndicator, Image } from 'react-native';
import React, { useEffect } from 'react';
import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "../../navigation/AppStack";
import { useTranslation } from "react-i18next";

type Props = StackScreenProps<AppStackParamList, "Splash">;

export default function Splash({ navigation }: Props) {
    const { t } = useTranslation();

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigation.replace('TabNavigator');
        }, 700);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <View style={{ alignItems: "center", justifyContent: "center", flex: 1, backgroundColor: "#51672D" }}>
            <Image
                resizeMode='contain'
                source={require('../../../assets/icon.png')}
                style={{ height: 400 }}
            />
            <Text style={{ color: "#FFF", fontFamily: "Bold", fontSize: 18, marginTop: 50, marginBottom: 20 }}>
                {t("splash.welcome")}
            </Text>
            <Text style={{ color: "#FFF", fontFamily: "Regular", fontSize: 20 }}>
                {t("splash.loading")}
            </Text>
            <ActivityIndicator size={70} color={"#FFF"} style={{ marginVertical: 50 }} />
        </View>
    );
}
