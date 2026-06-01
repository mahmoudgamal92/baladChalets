import { StyleSheet } from "react-native";
import Constants from 'expo-constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
    },
    header: {
        paddingTop: Constants.statusBarHeight,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 5,
    },
    card: {
        borderWidth: 1,
        borderColor: "#DDDDDD",
        borderRadius: 10,
        backgroundColor: "#FFF",
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
    },
});
