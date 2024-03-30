import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import { useAuthStore } from '../../hooks/useAuthStore';


export const RegisterPage = () => {
    const { startRegister, errorMessage } = useAuthStore();
    const { 
        register,
        handleSubmit,
        setError: setFormError,
        formState: { errors }
    } = useForm();

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
        <div className="auth-container">
            <h1 className="auth-text">
                Complete el formulario para registrarse
            </h1>

            <form className="auth-form" onSubmit={ handleSubmit( handleRegister ) }>
                <div className="auth-form-group">
                    <label className="auth-label">
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
                        className="auth-input"
                    />
                    { errors.name && <span className="auth-error">{ errors.name.message }</span> }
                </div>

                <div className="auth-form-group">
                    <label className="auth-label">
                        Email:
                    </label>
                    <input 
                        type="text" 
                        { ...register( 'email', { required: 'El email es obligatorio' })} 
                        className="auth-input"
                    />
                    { errors.email && <span className="auth-error">{ errors.email.message }</span> }
                </div>

                <div className="auth-form-group">
                    <label className="auth-label">
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
                        className="auth-input"
                    />
                    { errors.password && <span className="auth-error">{ errors.password.message }</span> }
                </div>

                <button type="submit" className="auth-button">
                    Registrarse
                </button>
            </form>
            <br />
            <p>
                Ya esta registrado en el sitio? 
                <Link className="auth-text" to={ '/login' }>
                    Ir al login
                </Link>
            </p>
        </div>
    );
};