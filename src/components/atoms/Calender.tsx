
import React, { useState } from 'react';
import {
    Text,
    View
} from "react-native";
import { days, months, year } from "../../const/source";
import { Dropdown } from "react-native-element-dropdown";
import { styles } from "../../theme/style";

export const Calender = ({ label, title, onDateChange, plus, dropdownPosition }) => {


    const current_year = new Date().getFullYear().toString();
    const current_month = (new Date().getMonth() + 1).toString();
    const current_day = ((new Date().getDate()) + plus).toString();

    const [selectedYear, setSelectedYear] = useState(current_year);
    const [selectedMonth, setSelectedMonth] = useState(current_month);
    const [selectedDay, setSelectedDay] = useState(current_day);



    const handleMonthChange = (month) => {
        setSelectedMonth(month);
        // Notify parent component about the change
        onDateChange(selectedYear, month, selectedDay);
    };

    const handleDayChange = (day) => {
        setSelectedDay(day);
        // Notify parent component about the change
        onDateChange(selectedYear, selectedMonth, day);
    };
    return (
        <View
            style={{
                paddingVertical: 5,
                width: "100%",
            }}>
            <View style={{
                flexDirection: "row-reverse",
                alignItems: "center"
            }}>

                <Text
                    style={{
                        fontFamily: "Bold",
                        textAlign: "right",
                        marginBottom: 5,
                        color: "red",
                        zIndex: 10,
                    }}>
                    {label}  {" "}
                </Text>
                <Text
                    style={{
                        fontFamily: "Bold",
                        textAlign: "right",
                        marginBottom: 5,
                        color: "#000",
                        zIndex: 10,
                    }}>
                    {title}  {" "}
                </Text>
            </View>
            <View style={{
                flexDirection: "row-reverse",
                alignItems: "center",
                justifyContent: "space-between"
            }}>

                <View style={{
                    width: "30%",
                    alignItems: "center"
                }}>
                    <Text style={{
                        fontFamily: "Regular",
                        color: "#000",
                        marginVertical: 2,
                        textAlign: "right",
                    }}>
                        اليوم
                    </Text>
                    <Dropdown
                        dropdownPosition={dropdownPosition}
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconStyle={styles.iconStyle}
                        itemTextStyle={{ fontFamily: "Regular", fontSize: 12 }}
                        data={days}
                        value={selectedDay}
                        placeholder="1"
                        maxHeight={300}
                        labelField="title"
                        valueField="title"
                        onChange={(item) => {
                            handleDayChange(parseInt(item.title).toString())
                        }}
                    />
                </View>




                <View style={{
                    width: "30%",
                    alignItems: "center"
                }}>

                    <Text style={{
                        fontFamily: "Regular",
                        color: "#000",
                        marginVertical: 2,
                        textAlign: "right",
                    }}>
                        الشهر
                    </Text>
                    <Dropdown
                        dropdownPosition={dropdownPosition}
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconStyle={styles.iconStyle}
                        itemTextStyle={{ fontFamily: "Regular", fontSize: 12 }}
                        data={months}
                        value={selectedMonth}
                        placeholder="1"
                        maxHeight={300}
                        labelField="title"
                        valueField="title"
                        onChange={(item) => {
                            handleMonthChange(parseInt(item.title).toString())
                        }}
                    />
                </View>




                <View style={{
                    width: "30%",
                    alignItems: "center"
                }}>

                    <Text style={{
                        fontFamily: "Regular",
                        color: "#000",
                        marginVertical: 2,
                        textAlign: "right",
                    }}>
                        السنة
                    </Text>
                    <Dropdown
                        dropdownPosition={dropdownPosition}
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconStyle={styles.iconStyle}
                        itemTextStyle={{ fontFamily: "Regular", fontSize: 12 }}
                        data={year}
                        value={selectedYear}
                        maxHeight={300}
                        labelField="title"
                        valueField="title"
                        onChange={(item) => {
                        }}
                        disable
                    />
                </View>
            </View>
        </View>
    );
};