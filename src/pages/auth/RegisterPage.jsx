import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useAuthStore } from '../../hooks/useAuthStore';


export const RegisterPage = () => {
    const { startRegister, formValidationEffect, cambiarDePagina } = useAuthStore();
    const { 
        register, 
        handleSubmit, 
        setError: setFormError, 
        formState: { errors },
        setValue,
        watch,
        clearErrors
    } = useForm();

    formValidationEffect( setFormError, setValue, watch );

    const handleRegister = ({ name, email, password }) => {
        startRegister({ name, email, password });
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
                                message: 'El nombre debe tener 3 digitos minimo'
                            },
                            onChange: () => clearErrors( 'name' )
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
                        type="email" 
                        { ...register( 
                            'email',
                            {
                                required: 'El email es obligatorio',
                                onChange: () => clearErrors( 'email' )
                            }
                        )} 
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
                                message: 'La contraseña tiene que tener minimo 6 digitos',
                                onChange: () => clearErrors( 'password' )
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
                <Link className="auth-text" to={ '/' } onClick={ cambiarDePagina }>
                    Ir al login
                </Link>
            </p>
        </div>
    );
};