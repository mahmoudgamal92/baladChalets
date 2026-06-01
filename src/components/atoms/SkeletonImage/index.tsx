import React, { useState, useEffect, useRef } from "react";
import { View, Image, Animated, StyleSheet } from "react-native";

type Props = {
    uri: string;
    style?: {
        height?: number;
        width?: number | string;
        marginVertical?: number;
        borderRadius?: number;
        [key: string]: any;
    };
};

export const SkeletonImage = ({ uri, style }: Props) => {
    const [loaded, setLoaded] = useState(false);
    const pulse = useRef(new Animated.Value(0.4)).current;

    useEffect(() => {
        const anim = Animated.loop(
            Animated.sequence([
                Animated.timing(pulse, { toValue: 1, duration: 700, useNativeDriver: true }),
                Animated.timing(pulse, { toValue: 0.4, duration: 700, useNativeDriver: true }),
            ])
        );
        anim.start();
        return () => anim.stop();
    }, []);

    return (
        <View style={style}>
            {!loaded && (
                <Animated.View
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            backgroundColor: "#E0E0E0",
                            borderRadius: style?.borderRadius ?? 10,
                            opacity: pulse,
                        },
                    ]}
                />
            )}
            <Image
                source={{ uri }}
                resizeMode="cover"
                style={{ width: "100%", height: "100%", borderRadius: style?.borderRadius ?? 10 }}
                onLoad={() => setLoaded(true)}
            />
        </View>
    );
};
