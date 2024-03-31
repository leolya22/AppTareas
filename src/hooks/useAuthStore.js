import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import tasksApi from "../api/tasksApi";
import { onChecking, onError, onLogin, onLogout } from "../store/auth/authSlice";


export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();
    
    const formValidationEffect = ( setFormError, setValue, watch ) => {
        useEffect( () => {
            for( let error in errorMessage?.errors ) {
                setFormError( error, { 
                    type: 'manual', 
                    message: errorMessage.errors[ error ].msg
                });
            }
            for( let value in errorMessage?.values ) {
                setValue( value, errorMessage.values[ value ] )
            }
        }, [ errorMessage ]);

        useEffect( () => {
            if( errorMessage != null ) {
                const subscription = watch( () => {
                    dispatch( onError( null ) );
                });
                return () => subscription.unsubscribe();
            }
        }, [ watch, errorMessage ]);
    }


    const startLogin = async ({ email, password }) => {
        dispatch( onChecking() );
        try {
            const { data } = await tasksApi.post( '/auth', { email, password } );
            localStorage.setItem( 'token', data.token );

            dispatch( onLogin({ name: data.name, id: data.uid }) );
        } catch ( error ) {
            dispatch( onError({
                errors: 
                    error.response.data.message?.errors 
                    || error.response.data.errors,
                values: {
                    email,
                    password
                }
            }));
            dispatch( onLogout() );
        }
    }

    const startRegister = async ({ name, email, password }) => {
        try {
            const { data } = await tasksApi.post( '/auth/new', { name, email, password } );
            localStorage.setItem( 'token', data.token );

            dispatch( onLogin({ name: data.name, id: data.uid}) );
        } catch ( error ) {
            dispatch( onError({
                errors: 
                    error.response.data.message?.errors 
                    || error.response.data.errors,
                values: {
                    name,
                    email,
                    password
                }
            }));
            dispatch( onLogout() );
        }
    }


    const checkAuthToken = async () => {
        const token = localStorage.getItem( 'token' );
        if( !token ) {
            dispatch( onError( null ) );
            return dispatch( onLogout() );
        }
        try {
            const { data } = await tasksApi.get( '/auth/renew' );
            localStorage.setItem( 'token', data.token );

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
        startLogout,
        formValidationEffect
    }
}