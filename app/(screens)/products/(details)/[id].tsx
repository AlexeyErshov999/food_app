import { styles } from "@/app/(screens)/products/(details)/styles";
import { BackButton } from "@/app/components/BackButton/BackButton";
import { ProductDescription } from "@/app/components/ProductDescription/ProductDescription";
import { ProductNutrition } from "@/app/components/ProductNutrition/ProductNutrition";
import { DatabaseService } from "@/app/database/DatabaseService";
import { ARTIFICIAL_TIMEOUT } from "@/app/shared/constants";
import { navigateBack } from "@/app/shared/utils";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import {
    Button,
    Layout,
    Spinner,
    Tab,
    TabView,
    Text,
} from "@ui-kitten/components";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

const ProductDetailsScreen = () => {
  const [db, setDb] = useState<DatabaseService | null>(null);
  const [selectedTabIndex, setSelectedTabIndex] = React.useState<number>(0);

  const { id } = useLocalSearchParams();

  const {
    data: product,
    isError,
    isLoading,
    error,
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

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner size={"large"} />
      </View>
    );
  }

  // TODO: подумать про нормальное отображение ошибки, если не получилось загрузить продукты
  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Ошибка загрузки: {error.message}</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen />
      <Layout style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <BackButton cb={navigateBack} />
            <Button
              appearance={"ghost"}
              status={"danger"}
              size={"large"}
              onPress={async () => {
                if (!db) return;
                await db.deleteProductById(parseInt(id as string));
                navigateBack();
              }}
            >
              <Ionicons name="basket" />
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
            onSelect={(index: number): void => setSelectedTabIndex(index)}
            style={styles.tabView}
          >
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

          <View style={{ flex: 1 }} />
        </ScrollView>

        <Layout style={styles.buttonContainer}>
          <Button
            style={styles.buyButton}
            size="large"
            onPress={(): void => console.log("Добавлено в корзину")}
          >
            ДОБАВИТЬ В КОРЗИНУ
          </Button>
        </Layout>
      </Layout>
    </>
  );
};

export default ProductDetailsScreen;
