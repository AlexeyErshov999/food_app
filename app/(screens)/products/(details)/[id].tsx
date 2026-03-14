import React, {useCallback, useEffect, useState} from "react";
import {
    ScrollView,
    View,
} from "react-native";
import {
    Layout,
    Text,
    Button,
    TabView,
    Tab, Spinner,
} from "@ui-kitten/components";
import {Stack, useLocalSearchParams} from "expo-router";
import {Product} from "@/app/shared/types"
import {DatabaseService} from "@/app/database/DatabaseService";
import {styles} from "@/app/(screens)/products/(details)/styles";
import {ProductDescription} from "@/app/components/ProductDescription/ProductDescription";
import {ProductNutrition} from "@/app/components/ProductNutrition/ProductNutrition";
import {Ionicons} from "@expo/vector-icons";
import {BackButton} from "@/app/components/BackButton/BackButton";
import {navigateBack} from "@/app/shared/utils";

const ProductDetailsScreen = () => {
    const [selectedTabIndex, setSelectedTabIndex] = React.useState<number>(0);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const [product, setProduct] = React.useState<Product | null>(
        null,
    );

    let db = DatabaseService.getInstance();
    const {id} = useLocalSearchParams();

    const loadProductById = useCallback(async (id: number): Promise<void> => {
        try {
            setLoading(true);
            const productDetails = await db.getProductById(id);
            setProduct(productDetails as Product);

            // TODO: потом убрать!!! Это для теста загрузки
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (err) {
            console.log(
                `ProductDetailsScreen:useEffect:loadProductById failed, ${err}`,
            );
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [db]);

    useEffect(() => {
        loadProductById(parseInt(id as string));
    }, [id, loadProductById]);

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <Spinner size={'large'}/>
            </View>
        );
    }

    // TODO: подумать про нормальное отображение ошибки, если не получилось загрузить продукты
    if (error) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Ошибка загрузки: {error.message}</Text>
            </View>
        );
    }

    return (
        <>
            <Stack.Screen options={{headerShown: false}}/>
            <Layout style={{flex: 1}}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{flex: 1}}
                    contentContainerStyle={{flexGrow: 1}}
                >
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <BackButton cb={navigateBack}/>
                        <Button
                            appearance={'ghost'}
                            status={'danger'}
                            size={'large'}
                            onPress={async () => {
                                await db.deleteProductById(parseInt(id as string));
                                navigateBack();
                            }}
                        >
                            <Ionicons name="basket"/>
                            Удалить
                        </Button>
                    </View>
                    <Layout style={styles.imageContainer}>
                        <Layout style={styles.imagePlaceholder}>
                            <Text category="h6" appearance="hint">
                                Изображение товара
                            </Text>
                        </Layout>
                    </Layout>

                    <Layout style={styles.infoContainer}>
                        <Text category="h5" style={styles.title}>
                            {product?.prod_name}
                        </Text>
                    </Layout>

                    <TabView
                        selectedIndex={selectedTabIndex}
                        onSelect={(index: number): void =>
                            setSelectedTabIndex(index)
                        }
                        style={styles.tabView}>
                        <Tab title="ОПИСАНИЕ">
                            <ProductDescription
                                description={`Категория: ${product?.category}\nОткуда: ${product?.distributor}`}
                                tabContentStyle={styles.tabContent}
                                descriptionTextStyle={styles.descriptionText}
                            />
                        </Tab>
                        <Tab title="ПИЩЕВАЯ ЦЕННОСТЬ">
                            <ProductNutrition
                                product={product}
                                contentStyle={styles.tabContent}
                                cardStyle={styles.nutritionCard}
                                rowStyle={styles.nutritionRow}
                                dividerStyle={styles.nutritionDivider}
                                infoStyle={styles.servingInfo}
                            />
                        </Tab>
                    </TabView>

                    <View style={{flex: 1}}/>
                </ScrollView>

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
            </Layout>
        </>
    );
};

export default ProductDetailsScreen;