import { useEffect } from "react";

import { Loader } from "../../components/Loader/Loader";
import { useTareasStore } from "../../hooks/useTareasStore";


export const TasksPage = () => {

    const { status, tareas, recibirTareas } = useTareasStore();

    useEffect( () => {
        if( status === 'checking' ) {
            recibirTareas();
        }
    }, [ status ])

    if( status === 'checking' ) {
        return (
            <Loader />
        )
    }

    return (
        <ul>
            { tareas.map( tarea => (
                <li key={ tarea._id }>
                    <h3>{ tarea.title }</h3>
                    <p>{ tarea.description }</p>
                </li>
            ))}
        </ul>
    );
}