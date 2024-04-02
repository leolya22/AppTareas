import { useDispatch, useSelector } from "react-redux";

import tasksApi from "../api/tasksApi";
import { actualizarEstadoTareas, guardarError, guardarTareas, setActiveTask, unSetActiveTask } from "../store/tareas/tareasSlice";


export const useTareasStore = () => {
    const { status, tareas, errorMessage, activeTask } = useSelector( state => state.tareas );
    const dispatch = useDispatch();

    const recibirTareas = async () => {
        try {
            const { data } = await tasksApi.get( '/tareas' );
            dispatch( guardarTareas( data.tareas ) );
        } catch ( error ) {
            console.log( error );
            dispatch( guardarError() );
        }
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
            dispatch( guardarError( error.response.data.errors.title.msg ) );
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
        editarTarea
    }
}