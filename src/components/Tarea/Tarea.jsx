import './Tarea.css'


export const Tarea = ({ tarea }) => {

    return (
        <div className="tarea">
            <li key={ tarea._id }>
                <h3>{ tarea.title }</h3>
                <hr />
                <p>{ tarea.description }</p>
            </li>
        </div>
    );
};