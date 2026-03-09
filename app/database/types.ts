export type Product = {
    id: number;
    name: string;
    weight: number;
    proteins: number;
    carbohydrates: number;
    fats: number;
    calories: number;
}

export type Dish = Product

export type Drink = Product

export type TableType = 'products' | 'dishes' | 'drinks'