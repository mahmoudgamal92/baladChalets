import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 20,
        marginVertical: 20,
    },
    titleContainer: {
        width: "100%",
        paddingHorizontal: 10,
    },
    title: {
        fontFamily: "Bold",
        textAlign: "center",
        marginBottom: 10,
        color: "#000",
    },
    row: {
        paddingHorizontal: 20,
        flexDirection: "row-reverse",
        paddingVertical: 5,
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#DDDDDD",
    },
    rowLabel: {
        fontFamily: "Bold",
    },
    rowValue: {
        fontFamily: "Regular",
    },
    submitButton: {
        width: "100%",
        backgroundColor: "#51672D",
        padding: 10,
        borderRadius: 10,
        marginBottom: 50,
        marginTop: 20,
    },
    submitButtonText: {
        textAlign: "center",
        fontFamily: "Bold",
        color: "#FFF",
    },
});
