"use client"

import {useSession} from "next-auth/react";
import {useAuthStore} from "@/src/store/auth.store";
import {ReactNode, useEffect} from "react";
import {Session} from "next-auth";

interface AppLoaderProps {
    children: ReactNode;
    session: Session | null;
}

const AppLoader = ({children} : AppLoaderProps) => {

    const {data : session, status} = useSession()
    const {setAuthState} = useAuthStore()

    useEffect(() => {
        setAuthState(status, session)
    }, [status, session, setAuthState]);


    return <>{children}</>
}

export default AppLoader