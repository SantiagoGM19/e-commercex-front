import { Category } from "@/models/Category";
import { CategoryAction } from "./CategoryAction";

export const CategoryReducer = (state: Category[], action: CategoryAction) => {
    switch(action.type){
        case "loaded" :{
            return action.categories
        }
        case "added": {
            return [
                ...state,
                action.category
            ];
        }
        case "updated": {
            return state.map(category => {
                if(category.id === action.category.id){
                    return action.category;
                }
                return category;
            })
        }
        case "deleted": {
            return state.filter(category => category.id !== action.id)
        }
        default:
            throw Error("Unknown action")
    }
}
