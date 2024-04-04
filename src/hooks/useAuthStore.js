import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import tasksApi from "../api/tasksApi";
import { onChecking, onError, onLogin, onLogout } from "../store/auth/authSlice";
import { actualizarEstadoTareas } from "../store/tareas/tareasSlice";


export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const startLogout = () => {
        localStorage.clear();
        dispatch( onLogout() );
        dispatch( actualizarEstadoTareas() );
    }

    const formValidationEffect = ( setFormError, setValue, watch ) => {
        useEffect( () => {
            for( let error in errorMessage?.errors ) {
                setFormError( error, { 
                    type: 'manual', 
                    message: errorMessage.errors[ error ].msg
                });
            }
            for( let value in errorMessage?.values ) {
                setValue( value, errorMessage.values[ value ] );
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

    const cambiarDePagina = () => {
        dispatch( onError( null ) );
    }


    const startLogin = async ({ email, password }) => {
        dispatch( onChecking() );
        try {
            const { data } = await tasksApi.post( '/auth', { email, password } );
            localStorage.setItem( 'token', data.token );

            dispatch( onLogin({ name: data.name, id: data.uid }) );
            navigate( '/' );
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
            startLogout();
        }
    }

    const startRegister = async ({ name, email, password }) => {
        try {
            const { data } = await tasksApi.post( '/auth/new', { name, email, password } );
            localStorage.setItem( 'token', data.token );

            dispatch( onLogin({ name: data.name, id: data.uid}) );
            navigate( '/' );
            startLogout();
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
            startLogout();
        }
    }


    const checkAuthToken = async () => {
        const token = localStorage.getItem( 'token' );
        
        try {
            if( !token ) {
                dispatch( onError( null ) );
                startLogout();
            } else {
                const { data } = await tasksApi.get( '/auth/renew' );
                localStorage.setItem( 'token', data.token );
                dispatch( onLogin({ name: data.name, id: data.uid}) );
            }
        } catch ( error ) {
            localStorage.clear();
            dispatch( onError( error.response.data.message || null ) );
            startLogout();
        }
    }

    return {
        errorMessage,
        user,
        status,
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,
        formValidationEffect,
        cambiarDePagina
    }
}