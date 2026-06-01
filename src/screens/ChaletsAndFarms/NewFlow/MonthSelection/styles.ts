import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginVertical: 20,
        width: '100%',
        flex: 1,
    },
    warningText: {
        color: 'red',
        fontFamily: 'Bold',
        marginVertical: 20,
    },
    monthItem: {
        width: '50%',
        padding: 10,
    },
    monthButton: {
        backgroundColor: "#00AA76",
        height: 50,
        alignItems: 'center',
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        borderRadius: 10,
    },
    monthButtonText: {
        color: '#FFF',
        fontFamily: 'Bold',
        textAlign: 'right',
        fontSize: 12,
    },
});
