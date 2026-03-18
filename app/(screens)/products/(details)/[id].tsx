import {styles} from "@/app/(screens)/products/(details)/styles";
import {BackButton} from "@/app/components/BackButton/BackButton";
import {ProductDescription} from "@/app/components/ProductDescription/ProductDescription";
import {ProductNutrition} from "@/app/components/ProductNutrition/ProductNutrition";
import {DatabaseService} from "@/app/database/DatabaseService";
import {ARTIFICIAL_TIMEOUT} from "@/app/shared/constants";
import {Product} from "@/app/shared/types";
import {navigateBack} from "@/app/shared/utils";
import EditProductModal from "@/app/widgets/EditProductModal/EditProductModal";
import {CATEGORIES_TRANSLATIONS} from "@/app/widgets/translations";
import {FoodType} from "@/app/widgets/types";
import {Ionicons} from "@expo/vector-icons";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {
    Button,
    Layout,
    Spinner,
    Tab,
    TabView,
    Text,
} from "@ui-kitten/components";
import {Stack, useLocalSearchParams} from "expo-router";
import React, {useEffect, useState} from "react";
import {ScrollView, TouchableOpacity, View} from "react-native";
import {useDeleteProduct} from "@/app/(screens)/products/(details)/mutation";
import {useAppDispatch, useAppSelector} from "@/app/store/hooks";
import {addToCart, removeFromCart} from "@/app/store/slices/cartSlice";

const ProductDetailsScreen = () => {
    const [db, setDb] = useState<DatabaseService | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [selectedTabIndex, setSelectedTabIndex] = React.useState<number>(0);

    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    const deleteProductMutation = useDeleteProduct();

    const {id} = useLocalSearchParams();

    const productsInCart = useAppSelector((state) => state.cart.products);
    const isInCart = productsInCart.findIndex(item => item.id === Number(id as string)) > -1;

    const {
        data: product,
        isError,
        isLoading,
        error,
        isFetching
    } = useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, ARTIFICIAL_TIMEOUT));
            const db = await DatabaseService.getInstance();
            return db.getProductById(parseInt(id as string));
        },
    });

    useEffect(() => {
        DatabaseService.getInstance().then(setDb);
    }, []);

    const handleDelete = async () => {
        navigateBack();
        await deleteProductMutation.mutateAsync(parseInt(id as string));
        await queryClient.invalidateQueries({queryKey: ['product', id]});
        await queryClient.invalidateQueries({queryKey: ['products']});
    }

    const handleAddButtonPress = () => {
        if (isInCart) {
            dispatch(removeFromCart(Number(id as string)));
        } else {
            dispatch(addToCart(product!));
        }
    };

    // TODO: подумать про нормальное отображение ошибки, если не получилось загрузить продукты
    if (isError) {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text>Ошибка загрузки: {error.message}</Text>
            </View>
        );
    }

    return (
        <>
            <Stack.Screen/>
            <Layout style={{flex: 1}}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{flex: 1}}
                    contentContainerStyle={{flexGrow: 1}}
                >
                    <View
                        style={{flexDirection: "row", justifyContent: "space-between"}}
                    >
                        <BackButton cb={navigateBack} disabled={isLoading || isFetching}/>
                        <Button
                            appearance={"ghost"}
                            status={"danger"}
                            size={"large"}
                            onPress={async () => {
                                handleDelete()
                            }}
                            disabled={isLoading || isFetching}
                        >
                            <Ionicons name="basket"/>
                            Удалить
                        </Button>
                    </View>
                    {(!isLoading && !isFetching) ? (
                            <>
                                <Layout style={styles.imageContainer}>
                                    <Layout style={styles.imagePlaceholder}>
                                        <Text category="h6" appearance="hint">
                                            Изображение товара
                                        </Text>
                                    </Layout>
                                </Layout>

                                <Layout
                                    style={[
                                        styles.infoContainer,
                                        {
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        },
                                    ]}
                                >
                                    <Text category="h5">{product?.prod_name}</Text>
                                    <TouchableOpacity onPress={() => setIsEditModalOpen(true)}>
                                        <Ionicons name="create-outline" size={30} color={"blue"}/>
                                    </TouchableOpacity>
                                </Layout>

                                <TabView
                                    selectedIndex={selectedTabIndex}
                                    onSelect={(index: number): void => setSelectedTabIndex(index)}
                                    style={styles.tabView}
                                >
                                    <Tab title="ОПИСАНИЕ">
                                        <ProductDescription
                                            description={`Категория: ${CATEGORIES_TRANSLATIONS[product?.category as FoodType]}\nОткуда: ${product?.distributor}`}
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
                            </>
                        )
                        :
                        (<View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                            <Spinner size={"large"}/>
                        </View>)}
                </ScrollView>

                <Layout style={styles.buttonContainer}>
                    <Button
                        style={styles.buyButton}
                        status={isInCart ? 'danger' : 'primary'}
                        size="large"
                        onPress={handleAddButtonPress}
                        disabled={isLoading || isFetching}
                    >
                        {isInCart ? 'УБРАТЬ ИЗ КОРЗИНЫ' : 'ДОБАВИТЬ В КОРЗИНУ'}
                    </Button>
                </Layout>
            </Layout>

            {isEditModalOpen && (
                <EditProductModal
                    visible={isEditModalOpen}
                    product={product as Product}
                    onClose={() => setIsEditModalOpen(false)}
                    onProductSave={() => {
                        queryClient.invalidateQueries({queryKey: ["product", id]});
                        queryClient.invalidateQueries({queryKey: ["products"]})
                    }}
                />
            )}
        </>
    );
};

export default ProductDetailsScreen;