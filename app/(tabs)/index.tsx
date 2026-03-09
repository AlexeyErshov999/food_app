import {useEffect, useState} from 'react';
import {Button, Layout, Text} from "@ui-kitten/components";
import {DatabaseService} from "@/app/database/DatabaseService";
import {Animated, View} from "react-native";
import {Dish, Drink} from "@/app/database/types";
import ScrollView = Animated.ScrollView;
import CreateProductModal from "@/app/widgets/CreateProductModal/CreateProductModal";

interface Product {
    id: number;
    name: string;
    proteins: number;
    carbohydrates: number;
    fats: number;
    calories: number;
}

export default function HomeScreen() {
    const [products, setProducts] = useState<Product[]>([]);
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [drinks, setDrinks] = useState<Drink[]>([]);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const loadData = async (): Promise<void> => {
        try {
            setLoading(true);
            const db = DatabaseService.getInstance()
            const productsFromDb = await db.getAllProducts()
            const dishesFromDb = await db.getAllDishes()
            const drinksFromDb = await db.getAllDrinks()
            setProducts([...productsFromDb])
            setDishes([...dishesFromDb])
            setDrinks([...drinksFromDb])

            // TODO: потом убрать!!! Это для теста загрузки
            await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (err) {
            console.error(`HomeScreen:useEffect:load failed, ${err}`)
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    // Закрытие модального окна с обновлением
    const handleProductSave = async (shouldRefresh?: boolean) => {
        setIsCreateModalOpen(false);
        if (shouldRefresh) {
            await loadData();
        }
    };

    // TODO: подумать про нормальное отображение ошибки, если не получилось загрузить продукты
    if (error) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Ошибка загрузки: {error.message}</Text>
            </View>
        );
    }

    // TODO: подумать про нормальную загрузку, пока продукты грузятся
    if (loading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Загрузка...</Text>
            </View>
        );
    }

    return (
        <>
            <Layout style={{flex: 1, backgroundColor: '#f5f5f5', position: 'relative'}}>
                <Text style={{fontSize: 24, marginBottom: 20, padding: 16}}>
                    Products list
                </Text>
                <ScrollView>
                    <Text style={{fontSize: 20, marginBottom: 5, padding: 5}}>
                        PRODUCTS
                    </Text>

                    {products.length > 0 ? (
                        products.map((product: Product) => (
                            <Text
                                key={product.id}
                                style={{padding: 8, fontSize: 16, borderBottomWidth: 1, borderBottomColor: '#ddd'}}
                            >
                                {product.name} - {product.calories} kcal
                            </Text>
                        ))
                    ) : (
                        <Text style={{textAlign: 'center', marginTop: 20}}>
                            No products found.
                        </Text>
                    )}

                    <Text style={{fontSize: 20, marginBottom: 5, padding: 5}}>
                        DISHES
                    </Text>

                    {dishes.length > 0 ? (
                        dishes.map((dish: Dish) => (
                            <Text
                                key={dish.id}
                                style={{padding: 8, fontSize: 16, borderBottomWidth: 1, borderBottomColor: '#ddd'}}
                            >
                                {dish.name} - {dish.calories} kcal
                            </Text>
                        ))
                    ) : (
                        <Text style={{textAlign: 'center', marginTop: 20}}>
                            No dishes found.
                        </Text>
                    )}

                    <Text style={{fontSize: 20, marginBottom: 5, padding: 5}}>
                        DRINKS
                    </Text>

                    {drinks.length > 0 ? (
                        drinks.map((drink: Drink) => (
                            <Text
                                key={drink.id}
                                style={{padding: 8, fontSize: 16, borderBottomWidth: 1, borderBottomColor: '#ddd'}}
                            >
                                {drink.name} - {drink.calories} kcal
                            </Text>
                        ))
                    ) : (
                        <Text style={{textAlign: 'center', marginTop: 20}}>
                            No drinks found.
                        </Text>
                    )}
                </ScrollView>

                <Button
                    style={{
                        borderRadius: '50%',
                        position: 'absolute',
                        bottom: 50,
                        right: 20,
                        width: 60,
                        height: 60
                    }}
                    status='primary'
                    size='large'
                    accessoryRight={(props) => (
                        <Text {...props} style={{fontSize: 30, color: 'white', lineHeight: 30}}>
                            +
                        </Text>
                    )}
                    onPress={() => {
                        setIsCreateModalOpen(true)
                    }}
                />
            </Layout>

            {/*// Modals*/}
            <CreateProductModal visible={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}
                                onSaveProduct={async () => {
                                    await handleProductSave(true)
                                }}/>
        </>
    );
}