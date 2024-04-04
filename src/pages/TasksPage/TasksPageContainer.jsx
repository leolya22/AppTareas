import { useEffect, useState } from "react";

import { Loader } from "../../components/Loader/Loader";
import { useTareasStore } from "../../hooks/useTareasStore";
import { EditarTareaContainer } from "../../components/EditarTarea/EditarTareaContainer";
import { TasksPage } from "./TasksPage";


export const TasksPageContainer = () => {
    const { status, tareas, activeTask, recibirTareas, activarTarea } = useTareasStore();
    const [ selectedValue, setSelectedValue ] = useState( '' );

    const handleChange = ( event ) => {
        setSelectedValue( event.target.value );
    };

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

    if( activeTask != null ) {
        return (
            <EditarTareaContainer />
        )
    }

    return (
        <TasksPage 
            tareas = { tareas }
            activarTarea = { activarTarea }
            selectedValue = { selectedValue }
            handleChange = { handleChange }
        />
    );
}