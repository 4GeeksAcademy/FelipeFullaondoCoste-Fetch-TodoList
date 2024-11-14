import React, { useState } from "react";


const API_BASE_URL = "https://playground.4geeks.com/todo/";

const TaskList = ({ listTask, deleteTask, updateTaskList }) => {

    const [editInputValue, setEditInputValue] = useState("")
    const [taskIdToEdit, setTaskIdToEdit] = useState(null);

    //Funcion para editar tareas
    const editTask = async () => {
        try {
            const editBody = {
                "label": editInputValue,
                "is_done": true
            }
            const response = await fetch(`${API_BASE_URL}todos/${taskIdToEdit}`, {
                method: "PUT",
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editBody)

            })

            if (!response.ok) {
                alert("No se puedo editar el toDo");
                return;
            }

            const updatedTask = await response.json();
            updateTaskList((prevTasks) =>
                prevTasks.map(task => (task.id === taskIdToEdit ? updatedTask : task))
            );
            setEditInputValue("");  // Limpiar input
            setTaskIdToEdit(null);   // Restablece el id

        } catch (error) {
            console.error(error);
        }
    }


    return (
        <>
            <ul className="list-group list-group-flush" style={{ width: '100%' }}>
                {listTask.map(task => (
                    <li
                        key={task.id}
                        className="list-group-item bg-light d-flex justify-content-between align-items-center"
                    >
                        {task.label}

                        <div>
                            <button
                                type="button"
                                className="btn btn-outline-secondary mx-1"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={() => {
									setTaskIdToEdit(task.id);
									setEditInputValue(task.label);
								}}
                            >
                                Editar
                            </button>

                            <button
                                type="button"
                                className="btn btn-outline-danger mx-1"
                                onClick={() => deleteTask(task.id)}
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Editar Tarea</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group input-group-lg ">
                                <input value={editInputValue}
                                    onChange={(event) => setEditInputValue(event.target.value)}
                                    type="text" className="form-control"
                                    placeholder="Modificar tarea..." />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cerrar
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-success"
                                data-bs-dismiss="modal"
                                onClick={editTask}
                            >
                                Guardar cambios
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TaskList;