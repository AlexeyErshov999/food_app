import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Product} from "@/app/shared/types";

type NutritionCirclesProps = {
    products: Product[];
};

const NutritionCircles = ({products}: NutritionCirclesProps) => {
    // Расчет суммарных значений
    const totals = products.reduce(
        (acc, curr) => ({
            calories: acc.calories + (curr.calories || 0),
            proteins: acc.proteins + (curr.proteins || 0),
            fats: acc.fats + (curr.fats || 0),
            carbs: acc.carbs + (curr.carbohydrates || 0),
        }),
        {calories: 0, proteins: 0, fats: 0, carbs: 0}
    );

    const nutritionData = [
        {
            label: 'Калории',
            value: totals.calories,
            unit: 'ккал',
            color: '#FF6B6B',
            bgColor: '#FFE5E5',
        },
        {
            label: 'Белки',
            value: totals.proteins,
            unit: 'г',
            color: '#4ECDC4',
            bgColor: '#E5F7F5',
        },
        {
            label: 'Жиры',
            value: totals.fats,
            unit: 'г',
            color: '#FFB347',
            bgColor: '#FFF0E0',
        },
        {
            label: 'Углеводы',
            value: totals.carbs,
            unit: 'г',
            color: '#6B8CFF',
            bgColor: '#E8EEFF',
        },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Пищевая ценность</Text>
            <View style={styles.circlesContainer}>
                {nutritionData.map((item, index) => (
                    <View key={index} style={styles.circleWrapper}>
                        <View
                            style={[
                                styles.circle,
                                {backgroundColor: item.bgColor}
                            ]}
                        >
                            <Text style={[styles.circleValue, {color: item.color}]}>
                                {item.value}
                            </Text>
                            <Text style={[styles.circleUnit, {color: item.color}]}>
                                {item.unit}
                            </Text>
                        </View>
                        <Text style={styles.circleLabel}>{item.label}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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

export default NutritionCircles;