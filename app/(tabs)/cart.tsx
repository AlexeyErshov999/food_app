import {Stack} from "expo-router";
import {navigateToProduct} from "@/app/shared/utils";
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from "react-native";
import {useAppDispatch, useAppSelector} from "@/app/store/hooks";
import {Card} from "@ui-kitten/components";
import {removeFromCart} from "@/app/store/slices/cartSlice";
import {Ionicons} from "@expo/vector-icons";
import NutritionCircles from "@/app/widgets/NutritionCircles/NutritionCircles";

export default function CartPage() {
    const products = useAppSelector((state) => state.cart.products);
    const dispatch = useAppDispatch();

    return (
        <>
            <Stack.Screen options={{headerShown: false}}/>
            <View style={{height: '100%'}}>
                <NutritionCircles products={products}/>
                <FlatList
                    data={products}
                    keyExtractor={(product) => product.id.toString()}
                    renderItem={(product) => {
                        return (
                            <Card
                                onPress={() => navigateToProduct(product.item.id)}
                                style={styles.card}
                            >
                                {/* Основная информация */}
                                <View style={styles.mainRow}>
                                    <View style={styles.productInfo}>
                                        <Text style={styles.productName}>{product.item.prod_name}</Text>
                                    </View>

                                    <TouchableOpacity
                                        onPress={() => dispatch(removeFromCart(product.item.id))}
                                    >
                                        <Ionicons
                                            name={'trash-bin-outline'}
                                            size={24}
                                            color="#FF3B30"
                                        />
                                    </TouchableOpacity>
                                </View>

                                {/* Пищевая ценность */}
                                <View style={styles.nutritionContainer}>
                                    <View style={styles.nutritionItem}>
                                        <Text style={styles.nutritionValue}>{product.item.proteins || 0} г</Text>
                                        <Text style={styles.nutritionLabel}>белки</Text>
                                    </View>

                                    <View style={styles.nutritionItem}>
                                        <Text style={styles.nutritionValue}>{product.item.fats || 0} г</Text>
                                        <Text style={styles.nutritionLabel}>жиры</Text>
                                    </View>

                                    <View style={styles.nutritionItem}>
                                        <Text style={styles.nutritionValue}>{product.item.carbohydrates || 0} г</Text>
                                        <Text style={styles.nutritionLabel}>углеводы</Text>
                                    </View>

                                    <View style={styles.nutritionItem}>
                                        <Text style={styles.nutritionValue}>{product.item.calories || 0}</Text>
                                        <Text style={styles.nutritionLabel}>ккал</Text>
                                    </View>

                                    <View style={styles.nutritionItem}>
                                        <Text style={styles.nutritionValue}>{product.item.weight || 0} г</Text>
                                        <Text style={styles.nutritionLabel}>вес</Text>
                                    </View>
                                </View>
                            </Card>
                        )
                    }}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 12,
        marginVertical: 6,
        padding: 12,
        borderRadius: 12,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    mainRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2E7D32',
    },
    nutritionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#F8F9FA',
        borderRadius: 10,
        padding: 12,
        marginBottom: 10,
    },
    nutritionItem: {
        alignItems: 'center',
    },
    nutritionValue: {
        fontSize: 14,
        fontWeight: '700',
        color: '#2C3E50',
    },
    nutritionLabel: {
        fontSize: 12,
        color: '#7F8C8D',
        marginTop: 2,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#ECF0F1',
        paddingTop: 8,
    },
    weight: {
        fontSize: 13,
        color: '#95A5A6',
    },
    quantity: {
        fontSize: 13,
        color: '#3498DB',
        fontWeight: '500',
    },
    carbsCircleCard: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 20,
        marginHorizontal: 16,
        marginVertical: 12,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    carbsCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#E8F5E9',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        borderWidth: 3,
        borderColor: '#81C784',
    },
    carbsCircleValue: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#2E7D32',
    },
    carbsCircleUnit: {
        fontSize: 16,
        color: '#66BB6A',
        fontWeight: '600',
    },
    carbsCircleLabel: {
        fontSize: 16,
        color: '#757575',
        fontWeight: '500',
    },
});