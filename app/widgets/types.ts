import { Product } from "../shared/types";

export const FOOD_TYPES = ['product', 'dish', 'drink'] as const;
export type FoodType = typeof FOOD_TYPES[number];

export interface ICreateProductModalProps {
    visible: boolean;
    onClose: () => void;
    onSaveProduct: () => void;
}

export interface IEditProductModalProps {
    visible: boolean;
    product: Product;
    onClose: () => void;
    onProductSave: () => void;
}