import React from "react";
import {Layout, Text} from "@ui-kitten/components";
import {IProductDescriptionProps} from "@/app/components/ProductDescription/types";

export const ProductDescription = ({
                                       description,
                                       tabContentStyle,
                                       descriptionTextStyle
                                   }: IProductDescriptionProps): React.ReactElement => (
    <Layout style={tabContentStyle}>
        <Text category="p1" style={descriptionTextStyle}>
            {description}
        </Text>
    </Layout>
);