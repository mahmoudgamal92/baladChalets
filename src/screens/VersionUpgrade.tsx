import { View, Text, Linking, Image, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect, useState } from 'react';

export default function VersionUpgrade({ route, navigation }) {
    const navigateToApp = () => {
        if (Platform.OS == 'android') {
            Linking.openURL('https://play.google.com/store/apps/details?id=com.seyahaa.seyahaa');
        }

        else if (Platform.OS == 'ios' || Platform.OS == 'macos') {
            Linking.openURL('https://apps.apple.com/us/app/id6508169320');
        }

    }
    return (
        <View style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            backgroundColor: "#FFF",
            paddingHorizontal: 20
        }}>
            <Text style={{
                color: "#000",
                fontFamily: "Bold",
                fontSize: 20,
                marginTop: 50,
                marginBottom: 50
            }}>
                هلا فيك بتطبيق مزارع و شاليهات بلد   👋👋
            </Text>

            <Text style={{
                color: "#000",
                fontFamily: "Bold",
                fontSize: 20,
                marginTop: 10,
                marginBottom: 50,
                textAlign: 'center',

            }}>
                الرجاء الإنتباه
            </Text>
            <Image
                resizeMode='contain'
                source={require('./../../assets/alert.png')} style={{
                    height: 200,
                }} />



            <Text style={{
                color: "#000",
                fontFamily: "Regular",
                fontSize: 20,
                textAlign: 'center',
                marginVertical: 30
            }}>
                لقد تم رفع إصدار جديد من تطبيق الحجز السريع , الرجاء تحديث التطبيق من المتجر
            </Text>





            <TouchableOpacity
                onPress={() => navigateToApp()}
                style={{
                    width: "100%",
                    backgroundColor: "#51672D",
                    padding: 10,
                    borderRadius: 10,
                    marginVertical: 30
                }}>

                <Text style={{
                    textAlign: "center",
                    fontFamily: "Bold",
                    color: "#FFF",
                    padding: 10
                }}>
                    إضغط هنا للتحديث
                </Text>
            </TouchableOpacity>


        </View>
    )
}