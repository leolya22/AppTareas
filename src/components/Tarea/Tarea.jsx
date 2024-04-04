import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faCheck } from '@fortawesome/free-solid-svg-icons';

import './Tarea.css'
import { useTareasStore } from '../../hooks/useTareasStore';


export const Tarea = ({ tarea }) => {
    const { completarTarea, eliminarTarea, tareaEffect, validarEstado } = useTareasStore();

    tareaEffect();

    return (
        <div className={ tarea.status == 'completed' ? 'completed tarea': 'tarea' }>
            <li>
                <div className='title'>
                    <FontAwesomeIcon
                        className='edit_button'
                        icon={ faEdit }
                        aria-label="Editar Tarea"
                        onClick={ () => validarEstado( tarea ) }
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