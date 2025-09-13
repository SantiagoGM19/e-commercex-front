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
    const [categoryActive, setCategoryActive] = useState<Category>({id: 1, name: "All", slug: 'all'});

    const toSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

    useEffect(() => {
        //fetch to back
        //then.
        //TODO: Connect with back and dispatch data requested
        const rawCategories: Omit<Category, 'slug'>[] = [
            { id: 1, name: 'All' },
            { id: 2, name: 'Tech' },
            { id: 3, name: 'Furniture' },
            { id: 4, name: 'Music' },
            { id: 5, name: 'Clothes' },
            { id: 6, name: 'Clothes' },
            { id: 7, name: 'Clothes' },
        ];

        const slugCount: Record<string, number> = {};
        const withSlugs: Category[] = rawCategories.map(c => {
            let base = toSlug(c.name);
            if (slugCount[base] !== undefined) {
                slugCount[base] += 1;
                base = `${base}-${slugCount[base]}`;
            } else {
                slugCount[base] = 0;
            }
            return { ...c, slug: base };
        });

        dispatch({ type: 'loaded', categories: withSlugs });

        const allCat = withSlugs.find(c => c.slug === 'all');
        if (allCat) setCategoryActive(allCat);
    }, [])

    return(
        <CategoryContext.Provider value={{categories, dispatch, categoryActive, setCategoryActive}}>
            {children}
        </CategoryContext.Provider>
    )
}