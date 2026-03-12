import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    topRightActions: {
        flexDirection: "row",
    },
    imageContainer: {
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        paddingTop: 0,
        backgroundColor: "#FFFFFF",
    },
    imagePlaceholder: {
        width: "100%",
        height: 250,
        borderRadius: 16,
        backgroundColor: "#EDF1F7",
        justifyContent: "center",
        alignItems: "center",
    },
    infoContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        backgroundColor: "#FFFFFF",
    },
    title: {
        marginBottom: 8,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    starIcon: {
        width: 18,
        height: 18,
        marginRight: 4,
    },
    reviewCount: {
        marginLeft: 8,
    },
    price: {
        marginTop: 8,
    },
    tabView: {
        marginTop: 16,
    },
    tabContent: {
        padding: 16,
        backgroundColor: "#FFFFFF",
    },
    descriptionText: {
        marginBottom: 12,
    },
    nutritionCard: {
        backgroundColor: 'rgba(0, 0, 255, 0.03)',
        marginVertical: 8,
    },
    nutritionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
    },
    nutritionDivider: {
        backgroundColor: "#E4E9F2",
    },
    buttonContainer: {
        padding: 16,
        backgroundColor: "#FFFFFF",
    },
    buyButton: {
        borderRadius: 12,
    },
    servingInfo: {
        textAlign: "center",
        marginTop: 8,
    },
});