import { Link } from 'react-router-dom';

import './Tarea.css'


export const Tarea = ({ tarea }) => {

    return (
        <div className="tarea">
            <li key={ tarea._id }>
                <div className='title'>
                    <h3>{ tarea.title }</h3>
                    <hr />
                </div>
                <p>
                    { tarea.description }
                </p>
                <div className='buttons'>
                    <hr />
                    <div className='vertical-buttons'>
                        <Link to='' className="edit_button">Editar</Link>
                        <span className="complete_button">Completar</span>
                    </div>
                    <span className="borrar_button">Borrar</span>
                </div>
            </li>
        </div>
    );
};