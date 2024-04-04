import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Swal from "sweetalert2";

import tasksApi from "../api/tasksApi";
import {
    actualizarEstadoTareas,
    borrarError,
    guardarError,
    guardarTareas,
    setActiveTask,
    unSetActiveTask
} from "../store/tareas/tareasSlice";


export const useTareasStore = () => {
    const { status, tareas, errorMessage, activeTask } = useSelector( state => state.tareas );
    const dispatch = useDispatch();

    const tareaEffect = () => {
        useEffect( () => {
            if( errorMessage != null ) {
                Swal.fire({
                    title: 'Error',
                    text: errorMessage,
                    icon: 'error'
                })
                dispatch( borrarError() );
            } 
        }, [ errorMessage ]);
    }

    const validarEstado = ( tarea ) => {
        if( tarea.status == 'completed' ){
            Swal.fire({
                title: 'Error',
                text: 'No se puede modificar/completar una tarea que ya esta completada',
                icon: 'error'
            })
        } else {
            activarTarea( tarea._id );
        }
    }


    const recibirTareas = async () => {
        try {
            const { data } = await tasksApi.get( '/tareas' );
            dispatch( guardarTareas( data.tareas ) );
        } catch ( error ) {
            console.log( error );
            dispatch( guardarError() );
        }
    }

    const formTareasEffect = ( setError, setValue ) => {
        useEffect( () => {
            if( errorMessage != null ) {
                setError( 'title', { 
                    type: 'manual', 
                    message: errorMessage
                })
            } 
        }, [ errorMessage ]);

        useEffect( () => {
            if( activeTask != "" ) {
                const { title, description } = tareas.find( tarea => tarea._id == activeTask );
                setValue( 'title', title );
                setValue( 'description', description );
            }
        }, []);
    }

    const onChangeInput = ( clearErrors, type ) => {
        clearErrors( type );
        dispatch( borrarError() );
    }

    const activarTarea = ( id ) => {
        dispatch( setActiveTask( id ) );
    }

    const desactivarTarea = () => {
        dispatch( unSetActiveTask() );
    }

    const crearTarea = async ({ title, description }) => {
        try {
            await tasksApi.post( '/tareas/', { title, description } );
            dispatch( actualizarEstadoTareas() );
        } catch ( error ) {
            dispatch( guardarError( error.response.data.errors.title.msg ) );
        }
    }

    const editarTarea = async ({ title, description }) => {
        try {
            const { title: titleBD, description: descriptionBD } = tareas.find( tarea => tarea._id == activeTask );
            if ( title == titleBD && description == descriptionBD ) {
                return dispatch( guardarError( 'No se ha modificado ningun dato' ) );
            }
            await tasksApi.put( '/tareas/' + activeTask, { title, description } );
            dispatch( actualizarEstadoTareas() );
        } catch ( error ) {
            console.log(error);
            dispatch( guardarError( error.response.data.message ) );
        }
    }

    const completarTarea = async ( id ) => {
        try {
            await tasksApi.put( '/tareas/completar/' + id );
            dispatch( actualizarEstadoTareas() );
        } catch ( error ) {
            dispatch( guardarError( error.response.data.message ) );
        }
    }

    const eliminarTarea = async ( id ) => {
        try {
            await tasksApi.delete( '/tareas/' + id );
            dispatch( actualizarEstadoTareas() );
        } catch ( error ) {
            dispatch( guardarError( error.response.data.message ) );
        }
    }

    return {
        status,
        tareas,
        errorMessage,
        activeTask,
        recibirTareas,
        activarTarea,
        desactivarTarea,
        crearTarea,
        editarTarea,
        onChangeInput,
        formTareasEffect,
        completarTarea,
        eliminarTarea,
        tareaEffect,
        validarEstado
    }
}