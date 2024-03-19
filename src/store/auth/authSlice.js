import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking',
        user: {},
        errorMessage: null
    },
    reducers: {
        onChecking: ( state ) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = null;
        },
        onLogin: ( state, { payload } ) => {
            state.status = 'authenticated';
            state.user = payload;
        },
        onLogout: ( state ) => {
            state.status = 'not-authenticated';
            state.user = null;
        },
        onError: ( state, { payload } ) => {
            state.user = null;
            state.errorMessage = payload;
        },
        clearErrorMessage: ( state ) => {
            state.errorMessage = null;
        }
    },
})

export const { onChecking, onLogin, onLogout, clearErrorMessage, onError } = authSlice.actions;