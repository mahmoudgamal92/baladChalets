import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
        width: '100%',
    },
    list: {
        width: "100%",
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
        width: '100%',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
    },
    cardHeader: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    dateBadge: {
        backgroundColor: "#FF9000",
        marginBottom: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    dateText: {
        fontFamily: 'Bold',
        width: '100%',
        textAlign: 'right',
    },
    offersRow: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        width: '100%',
    },
    offerPill: {
        backgroundColor: "#00AA76",
        padding: 5,
        borderRadius: 5,
        width: '30%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bookButton: {
        backgroundColor: 'red',
        borderRadius: 5,
        padding: 1,
    },
    pillText: {
        color: '#FFF',
        fontFamily: 'Regular',
        fontSize: 10,
    },
});
