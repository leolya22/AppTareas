import { useDispatch, useSelector } from "react-redux"

import tasksApi from "../api/tasksApi";
import { onChecking, onError, onLogin, onLogout } from "../store/auth/authSlice";


export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();


    const startLogin = async ({ email, password }) => {
        dispatch( onChecking() );
        try {
            const { data } = await tasksApi.post( '/auth', { email, password } );
            localStorage.setItem( 'token', data.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );

            dispatch( onLogin({ name: data.name, id: data.uid }) );
        } catch ( error ) {
            console.log( error );
            dispatch( onError( error.response.data.message ) );
            dispatch( onLogout() );
        }
    }


    const startRegister = async ({ name, email, password }) => {
        try {
            const { data } = await tasksApi.post( '/auth/new', { name, email, password } );
            localStorage.setItem( 'token', data.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );

            dispatch( onLogin({ name: data.name, id: data.uid}) );
        } catch ( error ) {
            dispatch( onError( error.response.data.message ) );
            dispatch( onLogout() );
        }
    }


    const checkAuthToken = async () => {
        const token = localStorage.getItem( 'token' );
        if( !token ) {
            dispatch( onError( 'No se encontro el token' ) );
            return dispatch( onLogout() );
        }
        try {
            const { data } = await tasksApi.get( '/auth/renew' );
            localStorage.setItem( 'token', data.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );

            dispatch( onLogin({ name: data.name, id: data.uid}) );
        } catch ( error ) {
            localStorage.clear();
            dispatch( onError( error.response.data.message || null ) );
            dispatch( onLogout() );
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch( onLogout() );
    }

    return {
        errorMessage,
        user,
        status,
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }
}