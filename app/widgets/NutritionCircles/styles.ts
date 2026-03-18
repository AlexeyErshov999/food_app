import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 12,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2C3E50',
        marginBottom: 20,
        marginLeft: 4,
    },
    circlesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    circleWrapper: {
        alignItems: 'center',
        width: '22%', // Для 4 элементов в ряд
    },
    circle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    circleIcon: {
        fontSize: 20,
        marginBottom: 2,
    },
    circleValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    circleUnit: {
        fontSize: 10,
        fontWeight: '500',
        opacity: 0.8,
    },
    circleLabel: {
        fontSize: 12,
        color: '#7F8C8D',
        fontWeight: '500',
        textAlign: 'center',
    },
});