import {useEffect, useState} from 'react';
import {Layout, Text} from "@ui-kitten/components";
import {DatabaseService} from "@/app/database/DatabaseService";
import {View} from "react-native";

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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function loadProducts(): Promise<void> {
            try {
                setLoading(true);
                const db = DatabaseService.getInstance()
                const productsFromDb = await db.getAllProducts()
                setProducts([...productsFromDb])

                // TODO: потом убрать!!! Это для теста загрузки
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (err) {
                console.error(`HomeScreen:useEffect:loadProducts failed, ${err}`)
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        }

        setLoading(true)
        loadProducts();
    }, []);

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
        <Layout style={{flex: 1, backgroundColor: '#f5f5f5'}}>
            <Text style={{fontSize: 24, marginBottom: 20, padding: 16}}>
                Products list
            </Text>

            {products.length > 0 ? (
                products.map((product) => (
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
        </Layout>
    );
}