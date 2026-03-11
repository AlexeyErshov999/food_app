import {Dish, Drink, Product} from "@/app/database/types";

export interface IProductNutritionProps {
    product: Product | Dish | Drink | null;
    contentStyle?: { [key: string]: string | number };
    cardStyle?: { [key: string]: string | number };
    rowStyle?: { [key: string]: string | number };
    dividerStyle?: { [key: string]: string | number };
    infoStyle?: { [key: string]: string | number };
}