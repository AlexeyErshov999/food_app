export const foodTypes = ['Products', 'Dishes', 'Drinks'];

export interface ICreateProductModalProps {
    visible: boolean;
    onClose: () => void;
    onSaveProduct: () => void;
}