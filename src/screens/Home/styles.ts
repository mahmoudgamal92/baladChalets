import { StyleSheet } from "react-native";
import Constants from 'expo-constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: Constants.statusBarHeight,
        height: 120,
        width: "100%",
        paddingHorizontal: 20,
        backgroundColor: "#51672D",
        alignItems: "center",
        justifyContent: "center",
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    loadingContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
    },
});
