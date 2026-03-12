import {Card, Divider, Layout, Text} from "@ui-kitten/components";
import {View} from "react-native";
import {IProductNutritionProps} from "@/app/components/ProductNutrition/types";
import React from "react";

export const ProductNutrition = ({
                                     product,
                                     contentStyle,
                                     cardStyle,
                                     rowStyle,
                                     dividerStyle,
                                     infoStyle,
                                 }: IProductNutritionProps): React.ReactElement => (
    <Layout style={[contentStyle, {flex: 1}]}>
        <View style={{flex: 1}}>
            <Card style={cardStyle}>
                <View style={rowStyle}>
                    <Text category="s2">Белки</Text>
                    <Text category="s1">{product?.proteins}</Text>
                </View>
                <Divider style={dividerStyle}/>
                <View style={rowStyle}>
                    <Text category="s2">Жиры</Text>
                    <Text category="s1">{product?.fats}</Text>
                </View>
                <Divider style={dividerStyle}/>
                <View style={rowStyle}>
                    <Text category="s2">Углеводы</Text>
                    <Text category="s1">{product?.carbohydrates}</Text>
                </View>
                <View style={rowStyle}>
                    <Text category="s2">Калории</Text>
                    <Text category="s1" status="primary">
                        {product?.calories}
                    </Text>
                </View>
            </Card>

            <Text category="c2" appearance="hint" style={infoStyle}>
                * Пищевая ценность указана на 100 г продукта
            </Text>
        </View>
    </Layout>
);