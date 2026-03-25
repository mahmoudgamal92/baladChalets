import {
    Image,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    FlatList,
    Linking,
    ScrollView,
    TextInput,
    useWindowDimensions
} from "react-native";

import React, { useState, useRef, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import {
    MaterialCommunityIcons,
    AntDesign,
    Feather,
    FontAwesome,
    FontAwesome5,
    Ionicons,
    Entypo,
    EvilIcons,
    MaterialIcons
} from "@expo/vector-icons";
import Constants from 'expo-constants';
import { api } from "../../const/api";
import Modal from "react-native-modal";
import RenderHtml from 'react-native-render-html';
import { BaseLayout, Header } from "@components";

export const List = ({ route, navigation }) => {
    const { chalets, filters } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [detailsModalVisible, setDetailsModalVisible] = useState(false);
    const [chaletDescription, setChaletDescription] = useState("");

    const { width } = useWindowDimensions();

    // console.log(chalets)
    const [modalImages, setModalImages] = useState([]);

    const [avalibleChalets, setAvalibleChalets] = useState(chalets);

    const [serachText, setSearchText] = useState('');

    function filterChaletsByName(searchText) {
        setSearchText(searchText)
        const lowercasedSearchText = searchText.toLowerCase();
        setAvalibleChalets(chalets.filter(chalet =>
            chalet.chaletName.toLowerCase().includes(lowercasedSearchText)));
    }



    function sortChaletsByPrice(order) {
        const sortedChalets = [...chalets].sort((a, b) => {
            if (order === 'asc') {
                return a.price - b.price;
            } else if (order === 'desc') {
                return b.price - a.price;
            }
        });
        setAvalibleChalets(sortedChalets);
    }
    const _renderTime = (from, to) => {
        if (filters.OfferType == 1) {
            return "من: " + from + " صباحا" + " إلي : " + to + " صباحا ";
        }
        else if (filters.OfferType == 1.1) {
            return "من: " + from + " صباحا" + " إلي : " + to + " صباحا ";
        }
        else if (filters.OfferType == 2) {
            return "من: " + from + " صباحا" + " إلي : " + to + " مساءا ";
        }
        else if (filters.OfferType == 3) {
            return "من: " + from + " مساءا  " + " إلي : " + to + " صباحا ";
        }
    }
    return (
        <BaseLayout>
            <Header text="نتائج البحث" goBack={() => navigation.goBack()} />
            <Modal
                isVisible={modalVisible}
                style={{
                    //maxHeight: 200,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                <View style={{
                    backgroundColor: "#FFF",
                    width: "100%",
                    borderRadius: 20,
                    padding: 10,
                    height: 600
                }}>

                    <View style={{
                        borderBottomColor: "#DDDDDD",
                        borderBottomWidth: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                        <TouchableOpacity

                            onPress={() => setModalVisible(false)}>
                            <AntDesign name="close" size={24} color="#586261" />
                        </TouchableOpacity>

                        <Text style={{
                            fontFamily: "Bold",
                            padding: 5
                        }}>
                            الصور
                        </Text>


                    </View>
                    {modalImages.length !== 0 &&
                        <ScrollView
                            contentContainerStyle={{
                                alignItems: "center"
                            }}
                            style={{

                            }}>

                            {modalImages.map((item) =>

                                <Image source={{ uri: api.mediaURL + item.imageName }}
                                    resizeMode="cover"
                                    style={{
                                        height: 200,
                                        width: "100%",
                                        marginVertical: 10,
                                        borderRadius: 10
                                    }}
                                />
                            )
                            }

                        </ScrollView>
                    }
                </View>
            </Modal>



            <Modal
                isVisible={detailsModalVisible}
                style={{
                    //maxHeight: 200,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                <View style={{
                    backgroundColor: "#FFF",
                    width: "100%",
                    borderRadius: 20,
                    padding: 10,
                    height: 600
                }}>

                    <View style={{
                        borderBottomColor: "#DDDDDD",
                        borderBottomWidth: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                        <TouchableOpacity

                            onPress={() => setDetailsModalVisible(false)}>
                            <AntDesign name="close" size={24} color="#586261" />
                        </TouchableOpacity>

                        <Text style={{
                            fontFamily: "Bold",
                            padding: 5
                        }}>
                            التفاصيل
                        </Text>


                    </View>
                    <RenderHtml
                        contentWidth={width * 0.9}
                        source={{ html: chaletDescription }}
                    />
                </View>
            </Modal>

            <View style={{
                flexDirection: 'row-reverse',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between',
                marginVertical: 20,
                paddingHorizontal: 10
            }}>

                <View style={{
                    backgroundColor: '#3D0A48',
                    width: '45%',
                    height: 35,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 1,
                    borderRadius: 5,
                    flexDirection: 'row'
                }}>

                    <TextInput
                        onChangeText={(text) => filterChaletsByName(text)}
                        placeholder={'البحث باسم المزرعة'}
                        value={serachText}
                        style={{
                            width: '80%',
                            fontSize: 12,
                            color: '#FFF',
                            fontFamily: 'Regular',
                            paddingHorizontal: 5
                        }}
                        placeholderTextColor={'#FFF'}
                    />

                    <AntDesign name="search1" size={24} color="#FFF" />


                </View>


                <TouchableOpacity
                    onPress={() => sortChaletsByPrice('desc')}
                    style={{
                        backgroundColor: '#3D0A48',
                        width: '25%',
                        height: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        paddingHorizontal: 1,
                        borderRadius: 5
                    }}>
                    <Text style={{
                        color: '#FFF',
                        fontFamily: 'Regular',
                        fontSize: 12
                    }}>
                        الأعلي سعرا
                    </Text>
                    <Ionicons name="caret-up" size={16} color="#FFF" />

                </TouchableOpacity>


                <TouchableOpacity
                    onPress={() => sortChaletsByPrice('asc')}
                    style={{
                        backgroundColor: '#3D0A48',
                        width: '25%',
                        height: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        paddingHorizontal: 1,
                        borderRadius: 5
                    }}>
                    <Text style={{
                        color: '#FFF',
                        fontFamily: 'Regular',
                        fontSize: 12
                    }}>
                        الأقل سعرا
                    </Text>
                    <Ionicons name="caret-down" size={16} color="#FFF" />

                </TouchableOpacity>
            </View>




            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%"
                }}
                data={avalibleChalets}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>
                    <TouchableOpacity
                        style={{
                            borderWidth: 1,
                            borderColor: "#DDDDDD",
                            borderRadius: 10,
                            backgroundColor: "#FFF",
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            marginVertical: 10,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 5,
                            },
                            shadowOpacity: 0.36,
                            shadowRadius: 6.68,

                            elevation: 11,
                        }}
                    >
                        <View style={{
                            flexDirection: "row-reverse",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}>

                            <View style={{
                                width: "50%",
                                alignItems: 'flex-end'
                            }}>
                                <Text style={{
                                    fontFamily: "Bold",
                                    textAlign: 'right'
                                }}>
                                    {item.chaletName}
                                </Text>

                                {item.videoUrl !== null &&
                                    <TouchableOpacity
                                        onPress={() => Linking.openURL(item.videoUrl)}
                                        style={{
                                            backgroundColor: 'red',
                                            padding: 5,
                                            flexDirection: 'row',
                                            borderRadius: 10,
                                            alignItems: 'center'
                                        }}>

                                        <AntDesign name="youtube" size={20} color="#FFF" />
                                        <Text style={{
                                            fontFamily: "Bold",
                                            fontSize: 12,
                                            textAlign: 'right',
                                            color: '#FFF',
                                            padding: 2
                                        }}>
                                            عرض الفيديو
                                        </Text>
                                    </TouchableOpacity>
                                }

                                <Text style={{
                                    fontFamily: "Regular",
                                    color: "#00AA76",
                                    textAlign: 'right'
                                }}>
                                    نوع الحجز : {item.offerTypeName}
                                </Text>

                                <View style={{
                                    flexDirection: "row-reverse",
                                    justifyContent: 'flex-start',
                                    alignItems: "center",
                                    backgroundColor: '#3D0A48',
                                    paddingVertical: 5,
                                    borderRadius: 10,
                                    marginTop: 5,
                                    width: '100%'
                                }}>
                                    <Text style={{
                                        fontFamily: "Regular",
                                        color: "#FFF",
                                        fontSize: 12,
                                    }}>
                                        {`${'الشخص المحسوب من: '} ${item.adultsAge} ${' سنة '}`}                                    </Text>
                                </View>
                            </View>


                            <View style={{
                                width: "50%"
                            }}>

                                <View style={{
                                    flexDirection: "row-reverse",
                                    alignItems: "center",
                                    backgroundColor: "#51672D",
                                    paddingVertical: 10,
                                    padding: 5,
                                    borderRadius: 10
                                }}>

                                    <Text style={{
                                        fontFamily: "Regular",
                                        color: "#FFF",
                                        fontSize: 10,
                                    }}>

                                        {_renderTime(item.offerTimeFrom, item.offerTimeTo)}
                                    </Text>


                                </View>

                                <View style={{
                                    flexDirection: 'row-reverse',
                                    paddingTop: 5
                                }}>
                                    <Text style={{
                                        fontFamily: "Regular"
                                    }}>
                                        السعر لحد {item.adultsNumber} شخص :
                                    </Text>

                                    <Text style={{
                                        backgroundColor: 'red',
                                        color: '#FFF',
                                        fontFamily: "Regular",
                                        padding: 1, borderRadius: 5
                                    }}>
                                        {' '}{item.price} الف{' '}
                                    </Text>
                                </View>

                            </View>

                        </View>

                        <View style={{
                            flexDirection: "row-reverse",
                            marginVertical: 20,
                        }}>


                            <View style={{
                                width: "40%",
                                alignItems: "center",
                                justifyContent: "center",

                            }}>
                                <ImageBackground source={{ uri: api.mediaURL + item.mainImage }}
                                    style={{
                                        width: "100%",
                                        height: 260,
                                        borderRadius: 10,
                                        justifyContent: "flex-end",
                                    }}

                                    imageStyle={{
                                        borderRadius: 10
                                    }}
                                    resizeMode="cover">

                                    <TouchableOpacity
                                        onPress={() => {
                                            setModalImages(item.chaletGallery)
                                            setModalVisible(true)
                                        }}
                                        style={{
                                            backgroundColor: "#1D4746",
                                            padding: 5,
                                            borderRadius: 5,
                                            flexDirection: "row-reverse",
                                            alignItems: "center"
                                        }}>
                                        <FontAwesome5 name="images" size={24} color="#FFF" style={{
                                            marginHorizontal: 5
                                        }} />
                                        <Text style={{
                                            color: "#FFF",
                                            fontFamily: "Regular"
                                        }}>
                                            عرض الصور
                                        </Text>
                                    </TouchableOpacity>
                                </ImageBackground>

                                <View>

                                </View>


                            </View>

                            <View style={{
                                width: "60%",
                                paddingHorizontal: 5
                            }}>

                                <View style={{
                                    flexDirection: "row-reverse",
                                    flexWrap: "wrap",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}>
                                    <View style={{
                                        width: "33%",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                        <Text style={{
                                            fontFamily: "Bold",
                                            fontSize: 10,
                                            color: "#51672D",
                                            marginVertical: 1
                                        }}>
                                            الأشخاص الإضافيين
                                        </Text>
                                        <FontAwesome5 name="users" size={24} color="#586261" />
                                        <Text style={{
                                            fontFamily: "Regular",
                                            fontSize: 10,
                                            color: "#000",
                                            marginVertical: 1
                                        }}>
                                            {item.personsNumber}
                                        </Text>
                                    </View>

                                    <View style={{
                                        width: "33%",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                        <Text style={{
                                            fontFamily: "Bold",
                                            fontSize: 10,
                                            color: "#51672D",
                                            marginVertical: 1
                                        }}>
                                            السعر للشخص الإضافي
                                        </Text>
                                        <FontAwesome5 name="money-bill" size={24} color="#586261" />

                                        <Text style={{
                                            fontFamily: "Regular",
                                            fontSize: 10,
                                            color: "#000",
                                            marginVertical: 1
                                        }}>
                                            {item.priceForAdditionalPersons}
                                        </Text>
                                    </View>

                                    <View style={{
                                        width: "33%",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                        <Text style={{
                                            fontFamily: "Bold",
                                            fontSize: 10,
                                            color: "#51672D",
                                            marginVertical: 1
                                        }}>
                                            عدد الغرف
                                        </Text>
                                        <FontAwesome5 name="bed" size={24} color="#586261" />

                                        <Text style={{
                                            fontFamily: "Regular",
                                            fontSize: 10,
                                            color: "#000",
                                            marginVertical: 1
                                        }}>
                                            {item?.roomsNumber}
                                        </Text>
                                    </View>


                                    <View style={{
                                        width: "33%",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                        <Text style={{
                                            fontFamily: "Bold",
                                            fontSize: 10,
                                            color: "#51672D",
                                            marginVertical: 1
                                        }}>
                                            ألعاب أطفال
                                        </Text>
                                        <MaterialIcons name="child-care" size={24} color="black" />
                                        <Text style={{
                                            fontFamily: "Regular",
                                            fontSize: 10,
                                            color: "#000",
                                            marginVertical: 1
                                        }}>
                                            {item.kidsToys == true ? "يوجد" : "لا يوجد"}
                                        </Text>
                                    </View>


                                    <View style={{
                                        width: "33%",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                        <Text style={{
                                            fontFamily: "Bold",
                                            fontSize: 10,
                                            color: "#51672D",
                                            marginVertical: 1
                                        }}>
                                            مسبح كبير
                                        </Text>
                                        <FontAwesome5 name="swimmer" size={24} color="#586261" />

                                        <Text style={{
                                            fontFamily: "Regular",
                                            fontSize: 10,
                                            color: "#000",
                                            marginVertical: 1
                                        }}>
                                            {item.bigPool == true ? "يوجد" : "لا يوجد"}
                                        </Text>
                                    </View>



                                    <View style={{
                                        width: "33%",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                        <Text style={{
                                            fontFamily: "Bold",
                                            fontSize: 10,
                                            color: "#51672D",
                                            marginVertical: 1
                                        }}>
                                            فيشة + منضدة
                                        </Text>
                                        <MaterialIcons name="table-restaurant" size={24} color="#586261" />

                                        <Text style={{
                                            fontFamily: "Regular",
                                            fontSize: 10,
                                            color: "#000",
                                            marginVertical: 1
                                        }}>
                                            {item.deposit == true ? "يوجد" : "لا يوجد"}
                                        </Text>
                                    </View>







                                    <View style={{
                                        width: "33%",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                        <Text style={{
                                            fontFamily: "Bold",
                                            fontSize: 10,
                                            color: "#51672D",
                                            marginVertical: 1
                                        }}>
                                            مسبح حار
                                        </Text>
                                        <FontAwesome5 name="swimmer" size={24} color="#586261" />

                                        <Text style={{
                                            fontFamily: "Regular",
                                            fontSize: 10,
                                            color: "#000",
                                            marginVertical: 1
                                        }}>
                                            {item.hotPool == true ? "يوجد" : "لا يوجد"}
                                        </Text>
                                    </View>


                                    <View style={{
                                        width: "33%",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                        <Text style={{
                                            fontFamily: "Bold",
                                            fontSize: 10,
                                            color: "#51672D",
                                            marginVertical: 1
                                        }}>
                                            مسبح صغير
                                        </Text>
                                        <FontAwesome5 name="swimmer" size={24} color="#586261" />

                                        <Text style={{
                                            fontFamily: "Regular",
                                            fontSize: 10,
                                            color: "#000",
                                            marginVertical: 1
                                        }}>
                                            {item.smallPool == true ? "يوجد" : "لا يوجد"}
                                        </Text>
                                    </View>



                                    <View style={{
                                        width: "33%",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                        <Text style={{
                                            fontFamily: "Bold",
                                            fontSize: 10,
                                            color: "#51672D",
                                            marginVertical: 1
                                        }}>
                                            بلياردو
                                        </Text>
                                        <MaterialIcons name="table-restaurant" size={24} color="#586261" />

                                        <Text style={{
                                            fontFamily: "Regular",
                                            fontSize: 10,
                                            color: "#000",
                                            marginVertical: 1
                                        }}>
                                            {item.bathroomNumber == 1 ? "يوجد" : "لا يوجد"}
                                        </Text>
                                    </View>
                                </View>


                                <View style={{ backgroundColor: "yellow", padding: 5, borderRadius: 5, marginTop: 10 }}>
                                    <Text style={{
                                        textAlign: "center",
                                        fontFamily: "Regular",
                                        fontSize: 12
                                    }}>
                                        الدفع عن طريق {item.paymentMethod}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: "row-reverse",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}>



                            <TouchableOpacity
                                onPress={() => navigation.navigate("ChaletsAndFarmsPreOrder", {
                                    item: item,
                                    filters: filters
                                })}
                                style={{
                                    backgroundColor: "red",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: 10,
                                    paddingVertical: 5,
                                    paddingHorizontal: 20,
                                    marginTop: 10,
                                    height: 40
                                }}>
                                <Text style={{
                                    fontFamily: "Bold",
                                    color: "#FFF"
                                }}>
                                    إرسل طلب
                                </Text>

                                <AntDesign name="shoppingcart" size={26} color="#FFF" />

                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setChaletDescription(item.chaletDescription)
                                    setDetailsModalVisible(true)
                                }}
                                style={{
                                    backgroundColor: "#51672D",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: 10,
                                    paddingVertical: 5,
                                    paddingHorizontal: 10,
                                    marginTop: 10,
                                    height: 40
                                }}>
                                <Text style={{
                                    fontFamily: "Bold",
                                    color: "#FFF"
                                }}>
                                    التفاصيل
                                </Text>


                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => Linking.openURL(item.address)}

                                style={{
                                    backgroundColor: "#00AA76",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: 10,
                                    paddingVertical: 5,
                                    paddingHorizontal: 20,
                                    marginTop: 10,
                                    height: 40
                                }}>
                                <Text style={{
                                    fontFamily: "Bold",
                                    color: "#FFF"
                                }}>
                                    اللوكيشن
                                </Text>

                                <EvilIcons name="location" size={24} color="#FFF" />

                            </TouchableOpacity>
                        </View>


                    </TouchableOpacity>
                } />
        </BaseLayout>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight
    },
    header: {
        paddingTop: Constants.statusBarHeight,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 5
    },
    cats: {
        flexDirection: "row",
        marginVertical: 20
    },
    cat: {
        justifyContent: "center",
        alignItems: "center"
    },
    catItem: {
        borderWidth: 2,
        borderColor: "#FF9000",
        marginHorizontal: 10,
        borderRadius: 30,
        width: 60,
        height: 60,
        resizeMode: "contain",
    },
    catText: {
        fontFamily: "Bold",
        color: "#143656",
        marginVertical: 1,
    },

    body: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: 5
    },
    itemContent: {
        alignItems: "flex-start",
        justifyContent: "space-between",
        flexDirection: "row-reverse",
        paddingHorizontal: 10,
        paddingVertical: 5,
        height: 150,
        width: "100%"
    },
    featuredItem: {
        height: 160,
        alignItems: "flex-start",
        padding: 5,
        flexDirection: "row-reverse"
    },

    itemImg: {
        width: "50%",
        resizeMode: "cover",
        height: 160,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },

    logo: {
        width: 50,
        height: 50,
        padding: 5,
        borderRadius: 26,
        borderWidth: 1,
        borderColor: "#51672D"
    },

    itemContainer: {
        borderRadius: 15,
        marginHorizontal: 5,
        width: "100%",
        marginVertical: 1,
        backgroundColor: "#FFF",
        elevation: 5
    },
    item: {
        width: "100%"
    }
});
