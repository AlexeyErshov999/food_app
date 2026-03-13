import React from 'react';
import {Layout, Card, Text} from '@ui-kitten/components';
import {ViewProps, StyleSheet} from 'react-native';
import {Product} from "@/app/shared/types";
import {router} from "expo-router";

interface HeaderProps extends Partial<ViewProps> {
    product: Product;
}

const Header = ({product, ...props}: HeaderProps): React.ReactElement => (
    <Layout {...props} style={[props?.style, styles.header]}>
        <Text category="h6">{product.prod_name}</Text>
        <Text category="s1">{product.category} • {product.distributor}</Text>
    </Layout>
);

interface FooterProps extends Partial<ViewProps> {
    product: Product;
}

const Footer = ({product, ...props}: FooterProps): React.ReactElement => (
    <Layout {...props} style={[props?.style, styles.footer]}>
        <Text category="c1">⚡ {product.calories} ккал</Text>
        <Text category="c1">⚖️ {product.weight}г</Text>
    </Layout>
);

export const ProductCard = ({product}: { product: Product }) => {
    return (
        <Layout style={styles.container}>
            <Card
                onPress={() => {
                    router.push(`/products/${product.id}`)
                }}
                status="primary"
                header={(props) => <Header product={product} {...props} />}
                footer={(props) => <Footer product={product} {...props} />}
            >
                <Layout style={styles.body}>
                    <Text>🥩 Белки: {product.proteins}г</Text>
                    <Text>🍚 Углеводы: {product.carbohydrates}г</Text>
                    <Text>🫒 Жиры: {product.fats}г</Text>
                </Layout>
            </Card>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        padding: 16,
    },
    body: {
        gap: 4,
        paddingVertical: 8,
    },
    footer: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});