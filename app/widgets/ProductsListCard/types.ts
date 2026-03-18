import { Product } from "@/app/shared/types";
import { ViewProps } from "react-native";

export interface HeaderProps extends Partial<ViewProps> {
    product: Product;
}

export interface FooterProps extends Partial<ViewProps> {
    product: Product;
}