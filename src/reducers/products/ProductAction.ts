import { Product } from "@/models/Product"

export interface LoadedProductsAction{
    type:"loaded",
    products: Product[]
}

export interface AddedProductAction{
    type: "added",
    product: Product
}

export interface UpdatedProductAction{
    type: "updated",
    product: Product
}

export interface DeletedProductAction{
    type: "deleted",
    id: number
}

export type ProductAction = 
    | LoadedProductsAction
    | AddedProductAction 
    | UpdatedProductAction 
    | DeletedProductAction