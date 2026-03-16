import {Product} from "@/app/shared/types";

export interface IProductNutritionProps {
    product: Product | undefined;
    contentStyle?: { [key: string]: string | number };
    cardStyle?: { [key: string]: string | number };
    rowStyle?: { [key: string]: string | number };
    dividerStyle?: { [key: string]: string | number };
    infoStyle?: { [key: string]: string | number };
}