import { DatabaseService } from "@/app/database/DatabaseService";
import { Product } from "@/app/shared/types";
import { useMutation } from "@tanstack/react-query";

export const useEditProduct = () => {
  return useMutation({
    mutationFn: async ({
      product,
      id,
    }: {
      product: Omit<Product, "id">;
      id: number;
    }) => {
      const db = await DatabaseService.getInstance();
      await db.editProductById(product, id);
      return { product, id };
    },

    onError: (err) => {
      console.error("Ошибка при обновлении продукта:", err);
    },
  });
};
