import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import { useAuthStore } from "../hooks/useAuthStore";
import { Loader } from "../components/Loader/Loader";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { TasksPageContainer } from "../pages/TasksPage/TasksPageContainer";


export const AppRouter = () => {
    const { status, checkAuthToken } = useAuthStore();

    useEffect( () => {
        checkAuthToken();
    }, [])

    if( status === 'checking' ) {
        return (
            <Loader />
        )
    }
    return (
        <Routes>
            { status === 'not-authenticated' 
                ? <>
                    <Route path='/*' element={ <LoginPage /> } />
                    <Route path='/register' element={ <RegisterPage /> } />
                </>
                : <Route path='/*' element={ <TasksPageContainer /> } />
            }
        </Routes>
    )
}