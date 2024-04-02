import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSave } from "@fortawesome/free-solid-svg-icons";

import { useTareasStore } from "../../hooks/useTareasStore";
import "./EditarTarea.css"
import { useDispatch } from "react-redux";
import { borrarError } from "../../store/tareas/tareasSlice";


export const EditarTarea = () => {
    const { 
        register, 
        handleSubmit, 
        setError, 
        formState: { errors },
        setValue,
        clearErrors
    } = useForm();
    const { activeTask, tareas, errorMessage, desactivarTarea, crearTarea, editarTarea } = useTareasStore();
    const dispatch = useDispatch();

    useEffect( () => {
        setError( 'title', { 
            type: 'manual', 
            message: errorMessage
        });
    }, [ errorMessage ])

    useEffect( () => {
        if( activeTask != "" ) {
            const { title, description } = tareas.find( tarea => tarea._id == activeTask );
            setValue( 'title', title );
            setValue( 'description', description );
        }
    }, []);

    const guardarTarea = async ({ title, description }) => {
        title = title.trim();
        description = description.trim();
        if( activeTask == "" ) {
            crearTarea({ title, description });
        } else {
            editarTarea({ title, description });
        }
    }

    const volver = () => {
        const confirmation = confirm( 'Vas a perder todos los cambios, estas seguro que queres salir?' );
        confirmation && desactivarTarea();
    }

    const onChangeInput = ( type ) => {
        clearErrors( type );
        dispatch( borrarError() );
    }

    return (
        <div className="auth-container">
            <h1 className="auth-text">
                Ingrese su tarea
            </h1>
            <form 
                className="auth-form" 
                onSubmit={ handleSubmit( guardarTarea ) }
            >
                <div className="auth-form-group">
                    <label className="auth-label">
                        Titulo:
                    </label>
                    <input 
                        type="title"
                        { ...register( 'title', { 
                                required: 'El titulo es obligatorio',
                                onChange: () => onChangeInput( 'title' )
                        })}
                        className="auth-input"
                    />
                    { errors.title && <span className="auth-error">{ errors.title.message }</span> }
                </div>
                <div className="auth-form-group">
                    <label className="auth-label">
                        Descripcion:
                    </label>
                    <input 
                        type="description"
                        { ...register( 'description' )}
                        className="auth-input"
                    />
                </div>
                <div className="tarea-buttons">
                    <button type="button" onClick={ volver } className="auth-button">
                        <FontAwesomeIcon icon={ faArrowLeft } />&nbsp;Volver
                    </button>
                    <button type="submit" className="auth-button tarea-button">
                        <FontAwesomeIcon icon={ faSave } />&nbsp;Guardar
                    </button>
                </div>
            </form>
        </div>
    )
}
