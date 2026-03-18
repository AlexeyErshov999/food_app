import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { styles } from './styles';
import { NutritionCirclesProps } from './types';

const NutritionCircles = ({products}: NutritionCirclesProps) => {
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

export default NutritionCircles;