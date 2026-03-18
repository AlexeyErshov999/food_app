import {Product} from "@/app/shared/types";
import {navigateToProduct} from "@/app/shared/utils";
import {CATEGORIES_TRANSLATIONS} from "@/app/widgets/translations";
import {FoodType} from "@/app/widgets/types";
import {Card, Layout, Text} from "@ui-kitten/components";
import React from "react";
import {StyleSheet, TouchableOpacity, View, ViewProps} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useAppDispatch, useAppSelector} from "@/app/store/hooks";
import {addToCart, removeFromCart} from "@/app/store/slices/cartSlice";

interface HeaderProps extends Partial<ViewProps> {
    product: Product;
}

const Header = ({product, ...props}: HeaderProps): React.ReactElement => {
    const dispatch = useAppDispatch();
    const productsInCart = useAppSelector((state) => state.cart.products);
    const isInCart = productsInCart.findIndex(item => item.id === product.id) > -1;

    const handleCartPress = () => {
        if (isInCart) {
            dispatch(removeFromCart(product.id));
        } else {
            dispatch(addToCart(product));
        }
    };

    return (
        <Layout {...props} style={[props?.style, styles.header]}>
            <View>
                <Text category="h6">{product.prod_name}</Text>
                <Text category="s1">
                    {CATEGORIES_TRANSLATIONS[product.category as FoodType]} •{" "}
                    {product.distributor}
                </Text>
            </View>
            <TouchableOpacity onPress={handleCartPress}>
                <Ionicons
                    name="basket-outline"
                    color={isInCart ? '#4CAF50' : '#2196F3'}
                    size={30}
                />
            </TouchableOpacity>
        </Layout>
    )
};

interface FooterProps extends Partial<ViewProps> {
    product: Product;
}

const Footer = ({product, ...props}: FooterProps): React.ReactElement => (
    <Layout {...props} style={[props?.style, styles.footer]}>
        <Text>⚡ {product.calories} ккал</Text>
        <Text>⚖️ {product.weight} г</Text>
    </Layout>
);

export const ProductCard = ({product}: { product: Product }) => {
    return (
        <Layout style={styles.container}>
            <Card
                onPress={() => {
                    navigateToProduct(product.id);
                }}
                style={styles.card}
                status="primary"
                header={(props) => <Header product={product} {...props} />}
                footer={(props) => <Footer product={product} {...props} />}
            >
                <Layout style={{flexDirection: "row", gap: 20}}>
                    <View>
                        <Text>🥩 Белки (г):</Text>
                        <Text>🫒 Жиры (г):</Text>
                        <Text>🍚 Углеводы (г):</Text>
                    </View>
                    <View style={{alignItems: "flex-end"}}>
                        <Text>{product.proteins}</Text>
                        <Text>{product.fats}</Text>
                        <Text>{product.carbohydrates}</Text>
                    </View>
                </Layout>
            </Card>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingInline: 16,
        paddingBlock: 5,
    },
    card: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
    },
    body: {
        gap: 4,
        paddingVertical: 8,
    },
    footer: {
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
    },
});