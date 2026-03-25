import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Feather, MaterialIcons } from "@expo/vector-icons";


type HeaderProps = {
    goBack: () => void;
    text: string;
};

export const Header = ({ goBack, text }: HeaderProps) => {


    return (
        <View
            style={{
                width: "100%",
                height: 120,
                alignItems: "center",
                justifyContent: 'flex-end',
                backgroundColor: "#51672D",
                paddingBottom: 10
            }}>
            <View style={{
                flexDirection: "row-reverse",
                justifyContent: 'center',
                width: '100%'
            }}>
                <Text style={{ fontFamily: "Bold", color: "#FFF", fontSize: 20 }}>
                    {text}
                </Text>

                <TouchableOpacity
                    onPress={goBack}
                    style={{ position: "absolute", right: 20 }}
                >
                    <MaterialIcons name="arrow-forward-ios" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>

        </View>
    );
};
