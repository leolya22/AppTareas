import { useDispatch, useSelector } from "react-redux";

import tasksApi from "../api/tasksApi";
import { guardarError, guardarTareas } from "../store/tareas/tareasSlice";


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

    return {
        status,
        tareas,
        errorMessage,
        activeTask,
        recibirTareas,
    }
}