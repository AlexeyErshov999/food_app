import {DatabaseService} from "@/app/database/DatabaseService";
import {useMutation} from "@tanstack/react-query";

export const useDeleteProduct = () => {
    return useMutation({
        mutationFn: async (id: number) => {
            const db = await DatabaseService.getInstance();
            await db.deleteProductById(id);
            return {id};
        },

        onError: (err) => {
            console.error("Ошибка при удалении продукта:", err);
        },
    });
};