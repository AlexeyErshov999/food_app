import * as SQLite from 'expo-sqlite'
import {testProducts} from "@/app/database/testProducts";
import {Product} from "@/app/database/types";

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

    public async initDatabase(): Promise<void> {
        try {
            await this.db.execAsync(`
                CREATE TABLE IF NOT EXISTS products
                (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    proteins REAL,
                    carbohydrates REAL,
                    fats REAL,
                    calories REAL
                );
            `);
        } catch (err) {
            console.error(`DatabaseService:initDatabase() failed, ${err}`);
        }
    }

    public async fillDatabaseByTestData(): Promise<void> {
        try {
            const result = await this.getAllProducts();

            if (result.length === 0) {
                for (const product of testProducts) {
                    await this.db.runAsync(
                        'INSERT INTO products (name, proteins, carbohydrates, fats, calories) VALUES (?, ?, ?, ?, ?);',
                        product
                    );
                }
                console.log(`DatabaseService:fillDatabaseByTestData() products filled`);
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

    public async closeDatabase(): Promise<void> {
        try {
            await this.db.closeAsync()
        } catch (err) {
            console.error(`DatabaseService:closeDatabase() failed, ${err}`);
        }
    }
}