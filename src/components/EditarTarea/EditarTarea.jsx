import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

import { useTareasStore } from "../../hooks/useTareasStore";
import "./EditarTarea.css"


export const EditarTarea = () => {
    const { 
        register, 
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
        clearErrors
    } = useForm();

    const {
        activeTask,
        desactivarTarea,
        crearTarea,
        editarTarea,
        formTareasEffect,
        onChangeInput
    } = useTareasStore();

    formTareasEffect( setError, setValue );

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
        Swal.fire({
            title: 'Vas a perder todos los cambios, estas seguro que queres salir?',
            showDenyButton: true,
            confirmButtonText: 'Salir',
            denyButtonText: `Cancelar`,
            icon: 'question'
        }).then( ( result ) => {
            if ( result.isConfirmed ) {
                desactivarTarea();
                onChangeInput( clearErrors, 'title' );
            }
        })
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
