import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Constants from "expo-constants";
import { api } from "../../const/api";
import { SkeletonImage } from "@components";

type Props = {
    visible: boolean;
    images: { imageName: string }[];
    onClose: () => void;
};

export const ImagesModal = ({ visible, images, onClose }: Props) => {
    return (
        <Modal visible={visible} statusBarTranslucent>
            <View style={{
                backgroundColor: "#FFF",
                width: "100%",
                flex: 1,
                paddingTop: Constants.statusBarHeight + 10,
                padding: 10,
            }}>
                <View style={{
                    borderBottomColor: "#DDDDDD",
                    borderBottomWidth: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingBottom: 8,
                }}>
                    <TouchableOpacity onPress={onClose}>
                        <AntDesign name="close" size={24} color="#586261" />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: "Bold", padding: 5 }}>الصور</Text>
                </View>

                {images.length !== 0 && (
                    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
                        {images.map((item, index) => (
                            <SkeletonImage
                                key={index}
                                uri={api.mediaURL + item.imageName}
                                style={{
                                    height: 200,
                                    width: "100%",
                                    marginVertical: 10,
                                    borderRadius: 10,
                                }}
                            />
                        ))}
                    </ScrollView>
                )}
            </View>
        </Modal>
    );
};
