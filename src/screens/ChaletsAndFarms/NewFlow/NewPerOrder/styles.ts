import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 20,
        marginVertical: 20,
    },
    formSection: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        marginTop: 10,
        width: "100%",
    },
    sectionTitle: {
        fontFamily: "Bold",
        textAlign: "right",
        marginBottom: 5,
        color: "#000",
    },
    fieldLabel: {
        fontFamily: "Bold",
        color: "#000",
        textAlign: "right",
        width: "100%",
        marginVertical: 5,
    },
    textInput: {
        height: 50,
        backgroundColor: "#FFF",
        width: "100%",
        borderRadius: 25,
        fontFamily: "Regular",
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#DDDDDD",
        textAlign: "right",
    },
    phoneInput: {
        borderRadius: 25,
        fontFamily: "Regular",
        textAlign: "right",
        paddingBottom: 2,
        paddingHorizontal: 10,
        height: "100%",
        width: "100%",
        color: "grey",
        backgroundColor: "#FFF",
    },
    countRow: {
        flexDirection: "row-reverse",
        alignItems: "center",
        marginTop: 20,
    },
    countLeft: {
        width: "70%",
        alignItems: "center",
        justifyContent: "center",
    },
    submitButton: {
        width: "100%",
        backgroundColor: "#51672D",
        padding: 10,
        borderRadius: 25,
        marginVertical: 20,
    },
    submitButtonText: {
        textAlign: "center",
        fontFamily: "Bold",
        color: "#FFF",
    },
});
