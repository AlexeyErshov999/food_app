import {useCallback, useEffect, useState} from 'react';
import {Button, Layout, Spinner, Text, Input} from "@ui-kitten/components";
import {DatabaseService} from "@/app/database/DatabaseService";
import {View, FlatList, TouchableOpacity} from "react-native";
import CreateProductModal from "@/app/widgets/CreateProductModal/CreateProductModal";
import {useFocusEffect} from 'expo-router';
import {ProductCard} from "@/app/components/ProductsListCard/ProductsListCard";
import {Ionicons} from "@expo/vector-icons";
import {Product} from "@/app/shared/types";
import {navigateToCart} from "@/app/shared/utils";

export default function HomeScreen() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>('');

    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

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
        const filtered = products.filter(product =>
            product.prod_name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.distributor.toLowerCase().includes(query)
        );

        setFilteredProducts(filtered);
    }, [debouncedSearchQuery, products]);

    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            const db = DatabaseService.getInstance()
            const productsFromDb = await db.getAllProducts()
            setProducts([...productsFromDb])

            // TODO: потом убрать!!! Это для теста загрузки
            await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (err) {
            console.error(`HomeScreen:useEffect:load failed, ${err}`)
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [loadData])
    );

    // Закрытие модального окна с обновлением
    const handleProductSave = async (shouldRefresh?: boolean) => {
        setIsCreateModalOpen(false);
        if (shouldRefresh) {
            await loadData();
        }
    };

    const renderItem = ({item}: { item: Product }) => {
        return <ProductCard product={item}/>
    }

    // TODO: подумать про нормальное отображение ошибки, если не получилось загрузить продукты
    if (error) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Ошибка загрузки: {error.message}</Text>
            </View>
        );
    }

    if (loading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Spinner size={'large'}/>
            </View>
        );
    }

    return (
        <>
            <Layout
                style={{
                    flex: 1,
                    backgroundColor: "#f5f5f5",
                    position: "relative",
                }}>

                <Layout style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 10,
                    padding: 16,
                    backgroundColor: 'transparent'
                }}>
                    <Input
                        placeholder="Поиск продуктов..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        accessoryLeft={(props) => <Ionicons name={'search'} size={20} {...props} />}
                        size="medium"
                        status="primary"
                        style={{flex: 1}}
                    />
                    <TouchableOpacity onPress={navigateToCart}>
                        <Ionicons name={'cart'} size={40}/>
                    </TouchableOpacity>
                </Layout>

                <FlatList
                    data={filteredProducts}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={
                        <Layout style={{padding: 32, alignItems: 'center'}}>
                            <Text appearance="hint">
                                {searchQuery ? 'Ничего не найдено' : 'Нет продуктов'}
                            </Text>
                        </Layout>
                    }
                />

                <Button
                    style={{
                        borderRadius: 50,
                        position: "absolute",
                        bottom: 50,
                        right: 20,
                        width: 60,
                        height: 60,
                    }}
                    status="primary"
                    size="large"
                    accessoryRight={() => (
                        <Ionicons name={'add'} size={30} style={{color: 'white'}}/>
                    )}
                    onPress={() => {
                        setIsCreateModalOpen(true);
                    }}
                />
            </Layout>

            {/* Modals */}
            <CreateProductModal
                visible={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSaveProduct={async () => {
                    await handleProductSave(true);
                }}
            />
        </>
    );
}