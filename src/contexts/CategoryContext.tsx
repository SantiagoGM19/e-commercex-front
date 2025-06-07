"use client"

import { Category } from "@/models/Category"
import { CategoryAction } from "@/reducers/category/CategoryAction"
import { CategoryReducer } from "@/reducers/category/CategoryReducer"
import { 
    createContext,
    Dispatch, 
    SetStateAction, 
    useEffect, 
    useReducer, 
    useState } from "react"

export type CategoryContextType = {
    categories: Category[],
    dispatch: Dispatch<CategoryAction>
    categoryActive: Category,
    setCategoryActive: Dispatch<SetStateAction<Category>>,
}

export const CategoryContext = createContext<CategoryContextType | null>(null);

export const CategoryContextProvider = ({children}: {children: React.ReactNode}): React.ReactNode => {
    const [categories, dispatch] = useReducer(CategoryReducer, [])
    const [categoryActive, setCategoryActive] = useState({id: 1, name: "All"});

    useEffect(() => {
        //fetch to back
        //then.
        //TODO: Connect with back and dispatch data requested
        setCategoryActive({id: 1, name: "Tech"})
        dispatch({type: "loaded", categories: [
            {
                id: 1,
                name: "All"
            },
            {
                id: 2,
                name: "Tech"
            },
            {
                id: 3,
                name: "Furniture"
            },
            {
                id: 4,
                name: "Music"
            },
            {
                id: 5,
                name: "Clothes"
            },
            {
                id: 6,
                name: "Clothes"
            },
            {
                id: 7,
                name: "Clothes"
            },
        ]})
    }, [])

    return(
        <CategoryContext.Provider value={{categories, dispatch, categoryActive, setCategoryActive}}>
            {children}
        </CategoryContext.Provider>
    )
}