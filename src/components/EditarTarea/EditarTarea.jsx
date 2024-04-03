import { faArrowLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import "./EditarTarea.css"

import { useTareasStore } from "../../hooks/useTareasStore";


export function EditarTarea ({ volver, guardarTarea, onChangeInput }) {
    const { 
        register, 
        handleSubmit,
        formState: { errors },
        clearErrors,
        setError,
        setValue
    } = useForm();
    const { formTareasEffect } = useTareasStore();

    formTareasEffect( setError, setValue );

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
                        type='title'
                        { ...register( 'title', { 
                                required: 'El titulo es obligatorio',
                                onChange: () => onChangeInput( clearErrors, 'title' )
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