import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import './RegisterPage.css';
import { useAuthStore } from '../../../hooks/useAuthStore';


export const RegisterPage = () => {
    const { errorMessage } = useSelector( state => state.auth );
    const { 
        register,
        handleSubmit,
        setError: setFormError,
        formState: { errors }
    } = useForm();
    const { startRegister } = useAuthStore();

    useEffect( () => {
        errorMessage && 
        setFormError( 'email', { 
            type: 'manual',
            message: 'El email ya esta registrado'
        })
    }, [ errorMessage ]);

    const handleRegister = ({ name, email, password }) => {
        startRegister({ name, email, password })
    };

    return (
        <div className="container">
            <h1 className="texto">
                Complete el formulario para registrarse
            </h1>

            <form className="form" onSubmit={ handleSubmit( handleRegister ) }>
                <div className="formGroup">
                    <label className="label">
                        Nombre:
                    </label>
                    <input 
                        type="text" 
                        { ...register( 'name', { 
                            required: 'Ingrese su nombre', 
                            minLength: { 
                                value: 3,
                                message: 'Ingrese su nombre'
                            },
                        })}
                        className="input"
                    />
                    { errors.name && <span className="error">{ errors.name.message }</span> }
                </div>

                <div className="formGroup">
                    <label className="label">
                        Email:
                    </label>
                    <input 
                        type="text" 
                        { ...register( 'email', { required: 'El email es obligatorio' })} 
                        className="input"
                    />
                    { errors.email && <span className="error">{ errors.email.message }</span> }
                </div>

                <div className="formGroup">
                    <label className="label">
                        Contraseña:
                    </label>
                    <input 
                        type="password" 
                        { ...register( 'password', { 
                            required: 'La contraseña es obligatoria',
                            minLength: { 
                                value: 6,
                                message: 'La contraseña tiene que tener minimo 6 digitos' 
                            },
                        })} 
                        className="input"
                    />
                    { errors.password && <span className="error">{ errors.password.message }</span> }
                </div>

                <button type="submit" className="button">
                    Registrarse
                </button>
            </form>
            <br />
            <p>
                Ya esta registrado en el sitio? 
                <Link className="texto" to={ '/login' }>
                    Ir al login
                </Link>
            </p>
        </div>
    );
};