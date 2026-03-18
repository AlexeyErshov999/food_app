import {ProductCard} from "@/app/components/ProductsListCard/ProductsListCard";
import {DatabaseService} from "@/app/database/DatabaseService";
import {Product} from "@/app/shared/types";
import {navigateToCart} from "@/app/shared/utils";
import CreateProductModal from "@/app/widgets/CreateProductModal/CreateProductModal";
import {Ionicons} from "@expo/vector-icons";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {Button, Input, Layout, Spinner, Text} from "@ui-kitten/components";
import {useEffect, useState} from "react";
import {FlatList, TouchableOpacity, View} from "react-native";
import {ARTIFICIAL_TIMEOUT} from "../shared/constants";

export default function HomeScreen() {
    const queryClient = useQueryClient();

    const {
        data: products = [],
        isError,
        isLoading,
        error,
        isFetching,
    } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, ARTIFICIAL_TIMEOUT));
            const db = await DatabaseService.getInstance();
            return db.getAllProducts();
        },
    });

    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");

    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        if (!debouncedSearchQuery.trim()) {
            setFilteredProducts(products);
            return;
        }

        const query = debouncedSearchQuery.toLowerCase().trim();
        const filtered = (products || []).filter(
            (product) =>
                product.prod_name.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query) ||
                product.distributor.toLowerCase().includes(query),
        );

        setFilteredProducts(filtered);
    }, [debouncedSearchQuery, products]);

    const renderItem = ({item}: { item: Product }) => {
        return <ProductCard product={item}/>;
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
            <Layout
                style={{
                    flex: 1,
                    backgroundColor: "#fff",
                    position: "relative",
                }}
            >
                <Layout
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 10,
                        padding: 16,
                        backgroundColor: "transparent",
                    }}
                >
                    <Input
                        placeholder="Поиск продуктов..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        accessoryLeft={(props) => (
                            <View style={{marginLeft: -8, marginRight: -8}}>
                                <Ionicons name="search" size={25} {...props} />
                            </View>
                        )}
                        size="medium"
                        status="primary"
                        disabled={isLoading || isFetching || products.length === 0}
                        style={{flex: 1}}
                    />
                </Layout>

                {!isLoading && !isFetching ? (<FlatList
                    data={filteredProducts}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={
                        <View style={{flex: 1, backgroundColor: '#fff', height: '100%'}}></View>
                    }
                    style={{backgroundColor: '#fff'}}
                />) : (<View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Spinner size={"large"}/>
                </View>)}

                <Button
                    style={{
                        borderRadius: 50,
                        position: "absolute",
                        bottom: 50,
                        right: 20,
                        width: 68,
                        height: 68,
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 0,
                        backgroundColor: "#fff",
                        borderWidth: 4,
                        borderColor: "rgba(0, 0, 0, 0.3)",
                        boxShadow: "4px 4px 20px rgba(0, 0, 0, 0.3)",
                    }}
                    status="primary"
                    size="large"
                    accessoryRight={() => (
                        <Ionicons
                            name={"add"}
                            size={50}
                            style={{
                                color: "rgba(0, 0, 0, 0.3)",
                                textAlign: "center",
                                lineHeight: 31,
                            }}
                        />
                    )}
                    onPress={() => {
                        setIsCreateModalOpen(true);
                    }}
                    disabled={isLoading || isFetching}
                />
            </Layout>

            {/* Modals */}
            <CreateProductModal
                visible={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSaveProduct={() =>
                    queryClient.invalidateQueries({queryKey: ["products"]})
                }
            />
        </>
    );
}