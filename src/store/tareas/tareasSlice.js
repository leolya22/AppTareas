import { createSlice } from '@reduxjs/toolkit';

export const tareasSlice = createSlice({
    name: 'tareas',
    initialState: {
        status: 'checking',
        tareas: [],
        activeTask: null,
        errorMessage: null
    },
    reducers: {
        guardarTareas: ( state, { payload } ) => {
            state.status = 'ready';
            state.tareas = payload;
        },
        guardarError: ( state, { payload } ) => {
            state.errorMessage = payload;
        },
        actualizarEstadoTareas: ( state ) => {
            state.status = 'checking';
            state.tareas = [];
        },
        borrarError: ( state ) => {
            state.errorMessage = null;
        },
        setActiveTask: ( state, { payload } ) => {
            state.activeTask = payload;
        },
        unSetActiveTask: ( state ) => {
            state.activeTask = null;
        }
    },
})

export const {
    guardarTareas,
    guardarError,
    actualizarEstadoTareas,
    borrarError
} = tareasSlice.actions;