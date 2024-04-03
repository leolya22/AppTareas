import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';

import './Tarea.css'
import { useTareasStore } from '../../hooks/useTareasStore';
import { borrarError } from '../../store/tareas/tareasSlice';


export const Tarea = ({ tarea }) => {
    const { errorMessage, activarTarea, completarTarea, eliminarTarea } = useTareasStore();
    const dispatch = useDispatch();

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

    const validarEstado = () => {
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


    return (
        <div className="tarea">
            <li>
                <div className='title'>
                    <FontAwesomeIcon
                        className='edit_button'
                        icon={ faEdit }
                        aria-label="Editar Tarea"
                        onClick={ validarEstado }
                        />
                    <h3>{ tarea.title }</h3>
                    <hr />
                </div>
                <p>
                    { tarea.description }
                </p>
                <div className='buttons'>
                    <hr />
                    <FontAwesomeIcon
                        className="complete_button"
                        icon={ faCheck }
                        aria-label="Completar Tarea"
                        onClick={ () => completarTarea( tarea._id ) }
                    />
                    <FontAwesomeIcon
                        className="borrar_button"
                        icon={ faTrashAlt }
                        aria-label="Borrar Tarea"
                        onClick={ () => eliminarTarea( tarea._id ) }
                    />
                </div>
            </li>
        </div>
    );
};