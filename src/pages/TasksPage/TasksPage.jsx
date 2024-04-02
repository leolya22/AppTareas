import { useEffect, useState } from "react";

import { Loader } from "../../components/Loader/Loader";
import { useTareasStore } from "../../hooks/useTareasStore";
import { NavBar } from "../../components/NavBar/NavBar";
import './TasksPage.css'
import { Tarea } from "../../components/Tarea/Tarea";
import { EditarTarea } from "../../components/EditarTarea/EditarTarea";


export const TasksPage = () => {

    const { status, tareas, activeTask, recibirTareas } = useTareasStore();
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
            <EditarTarea />
        )
    }

    return (
        <>
            <NavBar />
            <div className="tareas-header">
                <h1 className="tareas-title">Listado de tareas</h1>
                <div className="tareas-filtro">
                    <label htmlFor="tareas-select">Filtro de tareas: </label>
                    <select 
                        value={ selectedValue }
                        onChange={ handleChange }
                        name="tareas"
                        id="tareas-select"
                    >
                        <option value="">Todas</option>
                        <option value="completed">Completadas</option>
                        <option value="pending">Pendientes</option>
                    </select>
                </div>
            </div>
            { tareas.length == 0 && selectedValue == "" && (
                <h2 className="tareas-title">Aqui aun no hay tareas!</h2>
            )}
            { selectedValue != "" &&
                tareas.find( tarea => tarea.status == selectedValue ) == undefined && (
                    <h2 className="tareas-title">Aqui aun no hay tareas!</h2>
                )
            }
            <ul>
                { tareas.map( tarea => {
                    if( selectedValue == '' ) {
                        return (
                            <Tarea tarea={ tarea } />
                        )
                    } else if ( selectedValue == tarea.status ) {
                        return (
                            <Tarea tarea={ tarea } />
                        )
                    }
                })}
            </ul>
        </>
    );
}