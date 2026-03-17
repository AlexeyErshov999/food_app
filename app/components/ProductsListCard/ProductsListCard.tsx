import { Product } from "@/app/shared/types";
import { navigateToProduct } from "@/app/shared/utils";
import { CATEGORIES_TRANSLATIONS } from "@/app/widgets/translations";
import { FoodType } from "@/app/widgets/types";
import { Card, Layout, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";

interface HeaderProps extends Partial<ViewProps> {
  product: Product;
}

const Header = ({ product, ...props }: HeaderProps): React.ReactElement => (
  <Layout {...props} style={[props?.style, styles.header]}>
    <Text category="h6">{product.prod_name}</Text>
    <Text category="s1">
      {CATEGORIES_TRANSLATIONS[product.category as FoodType]} •{" "}
      {product.distributor}
    </Text>
  </Layout>
);

interface FooterProps extends Partial<ViewProps> {
  product: Product;
}

const Footer = ({ product, ...props }: FooterProps): React.ReactElement => (
  <Layout {...props} style={[props?.style, styles.footer]}>
    <Text>⚡ {product.calories} ккал</Text>
    <Text>⚖️ {product.weight} г</Text>
  </Layout>
);

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Layout style={styles.container}>
      <Card
        onPress={() => {
          navigateToProduct(product.id);
        }}
        status="primary"
        header={(props) => <Header product={product} {...props} />}
        footer={(props) => <Footer product={product} {...props} />}
      >
        <Layout style={{ flexDirection: "row", gap: 20 }}>
          <View>
            <Text>🥩 Белки (г):</Text>
            <Text>🫒 Жиры (г):</Text>
            <Text>🍚 Углеводы (г):</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text>{product.proteins.toFixed(1)}</Text>
            <Text>{product.fats.toFixed(1)}</Text>
            <Text>{product.carbohydrates.toFixed(1)}</Text>
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
  header: {
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
