import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import { useTareasStore } from "../../hooks/useTareasStore";
import { EditarTarea } from "./EditarTarea";


export const EditarTareaContainer = () => {
    const { 
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
        <EditarTarea volver={ volver } guardarTarea = { guardarTarea } onChangeInput={ onChangeInput } />
    )
}
