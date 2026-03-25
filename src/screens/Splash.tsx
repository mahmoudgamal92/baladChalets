import { View, Text, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react';



export default function Splash({ route, navigation }) {
    useEffect(() => {
        const timeout = setTimeout(() => {
            navigation.replace('TabNavigator');
        }, 700);
    
        return () => clearTimeout(timeout);
    }, []);
    


    return (
        <View style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            backgroundColor: "#51672D"
        }}>

            <Image
                resizeMode='contain'
                source={require('./../../assets/icon.png')} style={{
                    height: 400
                }} />


            <Text style={{
                color: "#FFF",
                fontFamily: "Bold",
                fontSize: 18,
                marginTop: 50,
                marginBottom: 20
            }}>
                هلا فيك بتطبيق مزارع و شاليهات بلد  👋👋
            </Text>
            <Text style={{
                color: "#FFF",
                fontFamily: "Regular",
                fontSize: 20
            }}>
                الرجاء الإنتظار قليلا
            </Text>


            <ActivityIndicator size={70} color={"#FFF"} style={{
                marginVertical: 50,

            }} />
        </View>
    )
}