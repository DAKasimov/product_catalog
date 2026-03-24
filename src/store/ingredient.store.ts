import {create} from 'zustand'
import {IIngredient} from "@/src/types/ingredient";
import {createIngredient, deleteIngredient, getIngredients} from "@/src/actions/ingredient";


interface IngredientState {
    ingredients: IIngredient[]
    isLoading: boolean
    error: string | null
    loadIngredients: () => Promise<void>
    addIngredient: (formData: FormData) => Promise<void>
    removeIngredient: (id: string) => Promise<void>
}

export const useIngredientStore = create<IngredientState>((set) => ({
    ingredients: [],
    isLoading: false,
    error: null,
    loadIngredients: async () => {
        try {
            const result = await getIngredients()

            if (result.success) {
                set({ingredients: result.ingredients, isLoading: false})
            } else {
                set({error: result.error, isLoading: false})
            }
        } catch (e) {
            console.log(e)
            set({error: 'Ошибка при загрузке ингредиента', isLoading: false})
        }
    },
    addIngredient: async (formData: FormData) => {
        set({isLoading: true, error: null})

        try {
            const result = await createIngredient(formData)

            if (result.success) {
                set((state) => ({
                    ingredients: [...state.ingredients, result.ingredient],
                    isLoading: false
                }))
            } else {
                set({error: result.error, isLoading: false})
            }
        } catch (error) {
            console.error(error)
            set({error: 'Ошибка при добавлении ингредиента', isLoading: false})
        }
    },
    removeIngredient: async (id: string) => {
        set({isLoading: true, error: null})
        try {
            const result = await deleteIngredient(id)
            if (result.success) {
                set((state)=>({
                    ingredients: state.ingredients.filter((ingredient) => ingredient.id !== id),
                    isLoading: false
                }))
            } else {
                set({error : result.error, isLoading: false})
            }
        } catch (error) {
            console.error(error)
            set({error: 'Ошибка при удалении ингредиента', isLoading: false})
        }
    }
}))