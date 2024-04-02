import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { Loader } from "../../components/Loader/Loader";
import { useTareasStore } from "../../hooks/useTareasStore";
import { NavBar } from "../../components/NavBar/NavBar";
import { Tarea } from "../../components/Tarea/Tarea";
import { EditarTarea } from "../../components/EditarTarea/EditarTarea";
import './TasksPage.css'


export const TasksPage = () => {

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
                            <Tarea tarea={ tarea } key={ tarea._id } />
                        )
                    } else if ( selectedValue == tarea.status ) {
                        return (
                            <Tarea tarea={ tarea } key={ tarea._id } />
                        )
                    }
                })}
            </ul>
            <FontAwesomeIcon
                icon={ faPlus }
                className='add_button'
                aria-label="Agregar Tarea"
                onClick={ () => activarTarea( "" ) }
            />
        </>
    );
}