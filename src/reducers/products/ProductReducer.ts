import { Product } from "@/models/Product";
import { ProductAction } from "./ProductAction";


export const ProductReducer = (state: Product[], action: ProductAction) => {
    switch(action.type){
        case "loaded" :{
            return action.products
        }
        case "added": {
            return [
                ...state,
                action.product
            ];
        }
        case "updated": {
            return state.map(product => {
                if(product.id === action.product.id){
                    return action.product;
                }
                return product;
            })
        }
        case "deleted": {
            return state.filter(product => product.id !== action.id)
        }
        default:
            throw Error("Unknown action")
    }
}
