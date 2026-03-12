import * as SQLite from 'expo-sqlite'
import {testData} from "@/app/database/testData";
import {Product} from "@/app/database/types";

export class DatabaseService {
    private static instance: DatabaseService;
    private db: SQLite.SQLiteDatabase;

    private constructor() {
        this.db = SQLite.openDatabaseSync("food_app.db");
    }

    public static getInstance(): DatabaseService {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }
        return DatabaseService.instance;
    }

    public async initDatabase(): Promise<void> {
        const createProductsTable = async (): Promise<void> => {
            await this.db.execAsync(`
                CREATE TABLE IF NOT EXISTS products
                (
                    id INTEGER PRIMARY KEY,
                    prod_name TEXT,
                    weight INTEGER,
                    proteins REAL,
                    carbohydrates REAL,
                    fats REAL,
                    calories REAL,
                    category TEXT,
                    distributor TEXT
                );
            `);
        };

        try {
            await createProductsTable();
        } catch (err) {
            console.error(`DatabaseService:initDatabase() failed, ${err}`);
        }
    }

    public async fillDatabaseByTestData(): Promise<void> {
        try {
            const products = await this.getAllProducts();

            if (products.length === 0) {
                for (const product of testData) {
                    await this.db.runAsync(
                        "INSERT INTO products " +
                        "(prod_name, weight,  proteins, carbohydrates, fats, calories, category, distributor) " +
                        "VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
                        product,
                    );
                }
                console.log(
                    `DatabaseService:fillDatabaseByTestData() products filled`,
                );
            }
        } catch (err) {
            console.error(
                `DatabaseService:fillDatabaseByTestData() failed:`,
                err,
            );
        }
    }

    public async getAllProducts(): Promise<Product[]> {
        try {
            const products = await this.db.getAllAsync(
                "SELECT * FROM products ORDER BY prod_name;",
            );
            return Array.isArray(products)
                ? Array.from(products as Product[])
                : [];
        } catch (err) {
            console.error(`DatabaseService:getAllProducts() failed, ${err}`);
            return [];
        }
    }

    public async getProductById(id: number): Promise<Product | []> {
        try {
            const products = await this.db.getAllAsync(
                "SELECT * FROM products WHERE id = ?;",
                [id],
            );
            return Array.isArray(products)
                ? (Array.from(products)[0] as Product)
                : [];
        } catch (err) {
            console.error(`DatabaseService:getProductById() failed, ${err}`);
            return [];
        }
    }

    public async addProduct(food: Omit<Product, "id">): Promise<void> {
        try {
            const {prod_name, weight, proteins, carbohydrates, fats, calories, category, distributor} = food;

            await this.db.runAsync(
                "INSERT INTO products " +
                "(prod_name, weight,  proteins, carbohydrates, fats, calories, category, distributor) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
                [prod_name, weight, proteins, carbohydrates, fats, calories, category, distributor],
            );
        } catch (err) {
            console.error(`DatabaseService:addProduct() failed, ${err}`);
        }
    }

    public async deleteProductById(id: number): Promise<void> {
        try {
            await this.db.runAsync(
                "DELETE FROM products WHERE id = ?;",
                [id],
            );
        } catch (err) {
            console.error(`DatabaseService:deleteProductById() failed, ${err}`);
        }
    }

    public async dropAllTables(): Promise<void> {
        try {
            await this.db.execAsync(`
            DROP TABLE IF EXISTS products;
        `);
            console.log("All tables dropped successfully");
        } catch (err) {
            console.error(`DatabaseService:dropAllTables() failed, ${err}`);
        }
    }

    public async closeDatabase(): Promise<void> {
        try {
            await this.db.closeAsync();
        } catch (err) {
            console.error(`DatabaseService:closeDatabase() failed, ${err}`);
        }
    }
}