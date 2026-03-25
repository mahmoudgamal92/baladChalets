// AutoScrollingSlider.js

import React, { useRef, useState, useEffect } from 'react';
import { ScrollView, View, Image, Dimensions } from 'react-native';

export const AutoScrollingSlider = ({ slider, api }) => {
    const scrollViewRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const windowWidth = Dimensions.get('window').width;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slider.length);
        }, 3000); // 2000ms = 2 seconds

        return () => clearInterval(interval); // Clear interval on component unmount
    }, [slider.length]);

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({
                x: currentIndex * windowWidth,
                animated: true,
            });
        }
    }, [currentIndex, windowWidth]);

    return (
        <ScrollView
            horizontal
            pagingEnabled
            ref={scrollViewRef}
            showsHorizontalScrollIndicator={false}
            style={{
                width: windowWidth,
                height: 130,
            }}
        >
            {slider.map((item, index) => (
                <View
                    key={index}
                    style={{
                        width: windowWidth,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Image
                        source={{ uri: api.mediaURL + item.bannerName }}
                        resizeMode="cover"
                        style={{
                            width: windowWidth * 0.95,
                            height: 120,
                            borderRadius: 10,
                        }}
                    />
                </View>
            ))}
        </ScrollView>
    );
};
