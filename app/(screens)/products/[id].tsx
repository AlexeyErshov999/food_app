import React, { FC, useEffect } from "react";
import {
    ScrollView,
    View,
    StyleSheet,
    TextStyle,
    ViewStyle,
} from "react-native";
import {
    Layout,
    Text,
    Button,
    Divider,
    TabView,
    Tab,
    Card,
} from "@ui-kitten/components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useLocalSearchParams } from "expo-router";
import { Dish, Drink, Product } from "@/app/database/types";
import { DatabaseService } from "@/app/database/DatabaseService";

// Типы для навигации
type RootStackParamList = {
    ProductDetails: undefined;
};

interface ProductDetailsScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamList, "ProductDetails">;
}

// Типы для стилей
interface Styles {
    container: ViewStyle;
    topRightActions: ViewStyle;
    imageContainer: ViewStyle;
    imagePlaceholder: ViewStyle;
    infoContainer: ViewStyle;
    title: TextStyle;
    ratingContainer: ViewStyle;
    starIcon: ViewStyle;
    reviewCount: TextStyle;
    price: TextStyle;
    tabView: ViewStyle;
    tabContent: ViewStyle;
    descriptionText: TextStyle;
    nutritionCard: ViewStyle;
    nutritionRow: ViewStyle;
    nutritionDivider: ViewStyle;
    buttonContainer: ViewStyle;
    buyButton: ViewStyle;
    servingInfo: TextStyle;
}

const ProductDetailsScreen: FC<ProductDetailsScreenProps> = ({ navigation }) => {
    // Состояние для переключения табов
    const [selectedTabIndex, setSelectedTabIndex] = React.useState<number>(0);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [product, setProduct] = React.useState<Product | Dish | Drink | null>(
        null,
    );

    const { id } = useLocalSearchParams();

    // Обработчик навигации назад
    const navigateBack = (): void => {
        navigation?.goBack();
    };

    // Интерфейс для данных пищевой ценности
    interface NutritionData {
        calories: string;
        protein: string;
        fat: string;
        carbs: string;
    }


    useEffect(() => {
        async function loadProductById(id: number) {
            try {
                setLoading(true);
                const db = DatabaseService.getInstance();
                const productDetails = await db.getProductById(id);
                setProduct(productDetails as Product);

                // TODO: потом убрать!!! Это для теста загрузки
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (err) {
                console.log(
                    `ProductDetailsScreen:useEffect:loadProductById failed, ${err}`,
                );
            } finally {
                setLoading(false);
            }
        }

        loadProductById(parseInt(id as string));
    }, []);

    // Компонент с описанием продукта
    const DescriptionTab = (): React.ReactElement => (
        <Layout style={styles.tabContent}>
            <Text category="p1" style={styles.descriptionText}>
                Это невероятно вкусный и полезный продукт, который идеально
                подойдет для здорового завтрака или перекуса. Он изготовлен из
                натуральных ингредиентов без добавления сахара и ГМО.
            </Text>
            <Text
                category="p2"
                appearance="hint"
                style={styles.descriptionText}>
                Состав: овсяные хлопья, орехи, сухофрукты, мед.
            </Text>
        </Layout>
    );

    // Компонент с пищевой ценностью
    const NutritionTab = (): React.ReactElement => (
        <Layout style={styles.tabContent}>
            <Card style={styles.nutritionCard}>
                <View style={styles.nutritionRow}>
                    <Text category="s2">Калории</Text>
                    <Text category="s1" status="primary">
                        {product?.calories}
                    </Text>
                </View>
                <Divider style={styles.nutritionDivider} />
                <View style={styles.nutritionRow}>
                    <Text category="s2">Белки</Text>
                    <Text category="s1">{product?.proteins}</Text>
                </View>
                <Divider style={styles.nutritionDivider} />
                <View style={styles.nutritionRow}>
                    <Text category="s2">Жиры</Text>
                    <Text category="s1">{product?.fats}</Text>
                </View>
                <Divider style={styles.nutritionDivider} />
                <View style={styles.nutritionRow}>
                    <Text category="s2">Углеводы</Text>
                    <Text category="s1">{product?.carbohydrates}</Text>
                </View>
            </Card>

            <Text category="c2" appearance="hint" style={styles.servingInfo}>
                * Пищевая ценность указана на 100 г продукта
            </Text>
        </Layout>
    );

    // TODO: подумать про нормальную загрузку, пока продукты грузятся
    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <Text>Загрузка...</Text>
            </View>
        );
    }

    return (
        <>
            <Divider />

            {/* Основной контент */}
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Изображение продукта */}
                <Layout style={styles.imageContainer}>
                    <Layout style={styles.imagePlaceholder}>
                        <Text category="h6" appearance="hint">
                            Изображение товара
                        </Text>
                    </Layout>
                </Layout>

                {/* Информация о продукте */}
                <Layout style={styles.infoContainer}>
                    <Text category="h5" style={styles.title}>
                        {product?.name}
                    </Text>

                    <Text category="h4" status="primary" style={styles.price}>
                        4.99 $
                    </Text>
                </Layout>

                {/* Табы */}
                <TabView
                    selectedIndex={selectedTabIndex}
                    onSelect={(index: number): void =>
                        setSelectedTabIndex(index)
                    }
                    style={styles.tabView}>
                    <Tab title="ОПИСАНИЕ">
                        <DescriptionTab />
                    </Tab>
                    <Tab title="ПИЩЕВАЯ ЦЕННОСТЬ">
                        <NutritionTab />
                    </Tab>
                </TabView>

                {/* Кнопка покупки */}
                <Layout style={styles.buttonContainer}>
                    <Button
                        style={styles.buyButton}
                        size="large"
                        onPress={(): void =>
                            console.log("Добавлено в корзину")
                        }>
                        ДОБАВИТЬ В КОРЗИНУ
                    </Button>
                </Layout>
            </ScrollView>
        </>
    );
};;

// Объект стилей с явной типизацией
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF", // background-basic-color-1
    },
    topRightActions: {
        flexDirection: "row",
    },
    imageContainer: {
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        backgroundColor: "#FFFFFF",
    },
    imagePlaceholder: {
        width: "100%",
        height: 250,
        borderRadius: 16,
        backgroundColor: "#EDF1F7", // background-basic-color-3
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
        marginVertical: 8,
    },
    nutritionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
    },
    nutritionDivider: {
        backgroundColor: "#E4E9F2", // border-basic-color-3
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

export default ProductDetailsScreen;
