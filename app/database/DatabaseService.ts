import * as SQLite from 'expo-sqlite'
import {testDishes, testData, testDrinks} from "@/app/database/testData";
import {Dish, Drink, Product, TableType} from "@/app/database/types";

export class DatabaseService {
    private static instance: DatabaseService;
    private db: SQLite.SQLiteDatabase

    private constructor() {
        this.db = SQLite.openDatabaseSync('food_app.db')
    }

    public static getInstance(): DatabaseService {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }
        return DatabaseService.instance;
    }

    // TODO: name - возможно зарезервированное слово
    public async initDatabase(): Promise<void> {
        const createProductsTable = async (): Promise<void> => {
            await this.db.execAsync(`
                CREATE TABLE IF NOT EXISTS products
                (
                    id INTEGER PRIMARY KEY,
                    name TEXT,
                    weight INTEGER,
                    proteins REAL,
                    carbohydrates REAL,
                    fats REAL,
                    calories REAL
                );
            `);
        }

        // TODO: name - возможно зарезервированное слово
        const createDishesTable = async (): Promise<void> => {
            await this.db.execAsync(`
                CREATE TABLE IF NOT EXISTS dishes
                (
                    id INTEGER PRIMARY KEY,
                    name TEXT,
                    weight INTEGER,
                    proteins REAL,
                    carbohydrates REAL,
                    fats REAL,
                    calories REAL
                );
            `);
        }

        // TODO: name - возможно зарезервированное слово
        const createDrinksTable = async (): Promise<void> => {
            await this.db.execAsync(`
                CREATE TABLE IF NOT EXISTS drinks
                (
                    id INTEGER PRIMARY KEY,
                    name TEXT,
                    weight INTEGER,
                    proteins REAL,
                    carbohydrates REAL,
                    fats REAL,
                    calories REAL
                );
            `);
        }

        try {
            await createProductsTable();
            await createDishesTable();
            await createDrinksTable();
        } catch (err) {
            console.error(`DatabaseService:initDatabase() failed, ${err}`);
        }
    }

    public async fillDatabaseByTestData(): Promise<void> {
        try {
            const products = await this.getAllProducts();
            const dishes = await this.getAllDishes();
            const drinks = await this.getAllDrinks();

            if (products.length === 0) {
                for (const product of testData) {
                    await this.db.runAsync(
                        'INSERT INTO products (name, weight,  proteins, carbohydrates, fats, calories) VALUES (?, ?, ?, ?, ?, ?);',
                        product
                    );
                }
                console.log(`DatabaseService:fillDatabaseByTestData() products filled`);
            }

            if (dishes.length === 0) {
                for (const dish of testDishes) {
                    await this.db.runAsync(
                        'INSERT INTO dishes (name, weight,  proteins, carbohydrates, fats, calories) VALUES (?, ?, ?, ?, ?, ?);',
                        dish
                    );
                }
                console.log(`DatabaseService:fillDatabaseByTestData() dishes filled`);
            }

            if (drinks.length === 0) {
                for (const drink of testDrinks) {
                    await this.db.runAsync(
                        'INSERT INTO drinks (name, weight,  proteins, carbohydrates, fats, calories) VALUES (?, ?, ?, ?, ?, ?);',
                        drink
                    );
                }
                console.log(`DatabaseService:fillDatabaseByTestData() drinks filled`);
            }

        } catch (err) {
            console.error(`DatabaseService:fillDatabaseByTestData() failed:`, err);
        }
    }

    public async getAllProducts(): Promise<Product[]> {
        try {
            const products = await this.db.getAllAsync('SELECT * FROM products ORDER BY name;');
            return Array.isArray(products) ? Array.from(products as Product[]) : [];
        } catch (err) {
            console.error(`DatabaseService:getAllProducts() failed, ${err}`);
            return [];
        }
    }

    public async getAllDishes(): Promise<Dish[]> {
        try {
            const dishes = await this.db.getAllAsync('SELECT * FROM dishes ORDER BY name;');
            return Array.isArray(dishes) ? Array.from(dishes as Dish[]) : [];
        } catch (err) {
            console.error(`DatabaseService:getAllDishes() failed, ${err}`);
            return [];
        }
    }

    public async getAllDrinks(): Promise<Drink[]> {
        try {
            const drinks = await this.db.getAllAsync('SELECT * FROM drinks ORDER BY name;');
            return Array.isArray(drinks) ? Array.from(drinks as Drink[]) : [];
        } catch (err) {
            console.error(`DatabaseService:getAllDrinks() failed, ${err}`);
            return [];
        }
    }

    public async addFoodToTable(table: TableType, food: Omit<Product, 'id'> | Omit<Dish, 'id'> | Omit<Drink, 'id'>): Promise<void> {
        try {
            const {name, weight, proteins, carbohydrates, fats, calories} = food;

            await this.db.runAsync(
                `INSERT INTO ${table} (name, weight, proteins, carbohydrates, fats, calories) VALUES (?, ?, ?, ?, ?, ?);`,
                [name, weight, proteins, carbohydrates, fats, calories]
            );
        } catch (err) {
            console.error(`DatabaseService:addFoodToTable() failed, ${err}`);
        }
    }

    public async dropAllTables(): Promise<void> {
        try {
            await this.db.execAsync(`
            DROP TABLE IF EXISTS products;
            DROP TABLE IF EXISTS dishes;
            DROP TABLE IF EXISTS drinks;
        `);
            console.log('All tables dropped successfully');
        } catch (err) {
            console.error(`DatabaseService:dropAllTables() failed, ${err}`);
        }
    }

    public async closeDatabase(): Promise<void> {
        try {
            await this.db.closeAsync()
        } catch (err) {
            console.error(`DatabaseService:closeDatabase() failed, ${err}`);
        }
    }
}