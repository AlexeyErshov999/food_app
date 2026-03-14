import {router} from "expo-router";

export const navigateBack = () => {
    router.back();
}

export const navigateToCart = () => {
    router.push(`/cart`);
}

export const navigateToProduct = (id: number) => {
    router.push(`/products/${id}`)
}