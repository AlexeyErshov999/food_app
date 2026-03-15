import { testData } from "@/app/database/testData";
import { Product } from "@/app/shared/types";
import * as SQLite from "expo-sqlite";

export class DatabaseService {
  private static instance: DatabaseService;
  private db: SQLite.SQLiteDatabase | null = null;

  private constructor() {}

  public static async getInstance(): Promise<DatabaseService> {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
      await DatabaseService.instance.initDb();
    }
    return DatabaseService.instance;
  }

  private async initDb(): Promise<void> {
    this.db = await SQLite.openDatabaseAsync("food_app.db");
  }

  private ensureDb(): SQLite.SQLiteDatabase {
    if (!this.db) {
      throw new Error("Database not initialized. Call getInstance() first.");
    }
    return this.db;
  }

  public async initDatabase(): Promise<void> {
    const db = this.ensureDb();
    const createProductsTable = async (): Promise<void> => {
      await db.execAsync(`
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
    const db = this.ensureDb();
    try {
      const products = await this.getAllProducts();

      if (products.length === 0) {
        for (const product of testData) {
          await db.runAsync(
            "INSERT INTO products " +
              "(prod_name, weight,  proteins, carbohydrates, fats, calories, category, distributor) " +
              "VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
            product,
          );
        }
        console.log(`DatabaseService:fillDatabaseByTestData() products filled`);
      }
    } catch (err) {
      console.error(`DatabaseService:fillDatabaseByTestData() failed:`, err);
    }
  }

  public async getAllProducts(): Promise<Product[]> {
    const db = this.ensureDb();
    try {
      const products = await db.getAllAsync(
        "SELECT * FROM products ORDER BY prod_name;",
      );
      return Array.isArray(products) ? Array.from(products as Product[]) : [];
    } catch (err) {
      console.error(`DatabaseService:getAllProducts() failed, ${err}`);
      return [];
    }
  }

  public async getProductById(id: number): Promise<Product | undefined> {
    const db = this.ensureDb();
    try {
      const products = await db.getAllAsync(
        "SELECT * FROM products WHERE id = ?;",
        [id],
      );
      return Array.isArray(products)
        ? (Array.from(products)[0] as Product)
        : undefined;
    } catch (err) {
      console.error(`DatabaseService:getProductById() failed, ${err}`);
      return undefined;
    }
  }

  public async addProduct(food: Omit<Product, "id">): Promise<void> {
    const db = this.ensureDb();
    try {
      const {
        prod_name,
        weight,
        proteins,
        carbohydrates,
        fats,
        calories,
        category,
        distributor,
      } = food;

      await db.runAsync(
        "INSERT INTO products " +
          "(prod_name, weight,  proteins, carbohydrates, fats, calories, category, distributor) " +
          "VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
        [
          prod_name,
          weight,
          proteins,
          carbohydrates,
          fats,
          calories,
          category,
          distributor,
        ],
      );
    } catch (err) {
      console.error(`DatabaseService:addProduct() failed, ${err}`);
    }
  }

  public async deleteProductById(id: number): Promise<void> {
    const db = this.ensureDb();
    try {
      await db.runAsync("DELETE FROM products WHERE id = ?;", [id]);
    } catch (err) {
      console.error(`DatabaseService:deleteProductById() failed, ${err}`);
    }
  }

  public async dropAllTables(): Promise<void> {
    const db = this.ensureDb();
    try {
      await db.execAsync(`
            DROP TABLE IF EXISTS products;
        `);
      console.log("All tables dropped successfully");
    } catch (err) {
      console.error(`DatabaseService:dropAllTables() failed, ${err}`);
    }
  }

  public async closeDatabase(): Promise<void> {
    const db = this.ensureDb();
    try {
      await db.closeAsync();
    } catch (err) {
      console.error(`DatabaseService:closeDatabase() failed, ${err}`);
    }
  }
}
