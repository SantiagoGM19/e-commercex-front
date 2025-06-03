"use client"

import { Category } from "@/models/Category"
import { CategoryAction } from "@/reducers/category/CategoryAction"
import { CategoryReducer } from "@/reducers/category/CategoryReducer"
import { createContext, Dispatch, useEffect, useReducer } from "react"

export type CategoryContextType = {
    categories: Category[],
    dispatch: Dispatch<CategoryAction>
}

export const CategoryContext = createContext<CategoryContextType | null>(null);

export const CategoryContextProvider = ({children}: {children: React.ReactNode}): React.ReactNode => {
    const [categories, dispatch] = useReducer(CategoryReducer, [])

    useEffect(() => {
        //fetch to back
        //then.
        //TODO: Connect with back and dispatch data requested
        dispatch({type: "loaded", categories: [
            {
                id: 1,
                name: "Tech"
            },
            {
                id: 2,
                name: "Furniture"
            },
            {
                id: 3,
                name: "Music"
            },
            {
                id: 4,
                name: "Clothes"
            },
            {
                id: 5,
                name: "Clothes"
            },
            {
                id: 6,
                name: "Clothes"
            },
        ]})
    }, [])

    return(
        <CategoryContext.Provider value={{categories, dispatch}}>
            {children}
        </CategoryContext.Provider>
    )
}