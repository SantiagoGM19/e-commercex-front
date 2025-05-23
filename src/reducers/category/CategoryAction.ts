import { Category } from "@/models/Category";

export interface LoadedCategoriesAction{
    type:"loaded",
    categories: Category[]
}

export interface AddedCategoryAction{
    type: "added",
    category: Category
}

export interface UpdatedCategoryAction{
    type: "updated",
    category: Category
}

export interface DeletedCategoryAction{
    type: "deleted",
    id: number
}

export type CategoryAction = 
    | LoadedCategoriesAction
    | AddedCategoryAction 
    | UpdatedCategoryAction 
    | DeletedCategoryAction