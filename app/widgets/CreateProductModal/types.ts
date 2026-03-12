export const FOOD_TYPES = ['product', 'dish', 'drink'] as const;
export type FoodType = typeof FOOD_TYPES[number];

export interface ICreateProductModalProps {
    visible: boolean;
    onClose: () => void;
    onSaveProduct: () => void;
}