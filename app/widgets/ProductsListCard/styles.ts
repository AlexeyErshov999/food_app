import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingInline: 16,
        paddingBlock: 5,
    },
    card: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
    },
    body: {
        gap: 4,
        paddingVertical: 8,
    },
    footer: {
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
    },
});