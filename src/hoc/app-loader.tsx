"use client"

import {useSession} from "next-auth/react";
import {useAuthStore} from "@/src/store/auth.store";
import {ReactNode, useEffect} from "react";
import {Session} from "next-auth";
import {useIngredientStore} from "@/src/store/ingredient.store";
import {useRecipeStore} from "@/src/store/recipe.store";

interface AppLoaderProps {
    children: ReactNode;
    session: Session | null;
}

const AppLoader = ({children} : AppLoaderProps) => {

    const {data : session, status} = useSession()
    const {loadIngredients} = useIngredientStore()
    const {setAuthState, isAuth} = useAuthStore()
    const {loadRecipes} = useRecipeStore()

    useEffect(() => {
        setAuthState(status, session)
    }, [status, session, setAuthState]);

    useEffect(() => {
        if (isAuth) {
            loadIngredients()
        }

    }, [isAuth, loadIngredients]);

    useEffect(() => {
        loadRecipes()
    }, [loadRecipes]);


    return <>{children}</>
}

export default AppLoader