import { useForm } from "react-hook-form";

import { useTareasStore } from "../../hooks/useTareasStore";


export const EditarTarea = () => {
    const { 
        register, 
        handleSubmit, 
        setError, 
        formState: { errors },
        watch,
        clearErrors
    } = useForm();
    const { activeTask } = useTareasStore();

    const guardarTarea = async () => {

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
                
            </form>
        </div>
    )
}
