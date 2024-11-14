// Si no funciona la app crear el usuario "Felipe" https://playground.4geeks.com/todo/docs

import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";

const API_BASE_URL = "https://playground.4geeks.com/todo/";


const Home = () => {

	const [listTask, setListTask] = useState([])
	const [inputValue, setInputValue] = useState("")



	// Funcion para mostrar la lista de todos
	const getUserTodosList = async () => {
		try {
			const response = await fetch(`${API_BASE_URL}users/Felipe`);
			const result = await response.json()
			setListTask(result.todos)
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getUserTodosList();
	}, [])


	// Funcion para guardar todos
	const saveToDo = async () => {
		if (inputValue) { // Se agrega este if para no tener tareas sin nada escrito

			try {
				const body = {
					"label": inputValue,
					"is_done": false
				}

				const response = await fetch(`${API_BASE_URL}todos/Felipe`, {
					method: "POST",
					headers: {
						accept: 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(body)
				})

				if (response.ok) {
					alert('Se agregó la tarea exitosamente!')
				}

				const result = await response.json()
				getUserTodosList(prevState => [...prevState, result])
				setInputValue("")

			} catch (error) {
				console.log(error);
			}
		}
	}


	// Function para borrar una tarea a traves del index
	const deleteTask = async (taskId) => {
		try {
			const response = await fetch(`${API_BASE_URL}todos/${taskId}`, {
				method: "DELETE",
			});

			if (response.ok) {
				await getUserTodosList();
				// Actualiza la lista de tareas en el estado
				setListTask(prevTasks => prevTasks.filter(task => task.id !== taskId));
			}

		} catch (error) {
			console.error("Error borrando task:", error);
		}
	};

	// Function para limpiar todas las tareas
	const deleteAllTasks = async () => {
		listTask.forEach((task) => {
			deleteTask(task.id)
		})
	};

	const updateTaskList = (newList) => {
		setListTask(newList);
	};

	
	return (
		<>

			<h1 className="text-white display-1 text-center m-2 fw-bold fst-italic">Todo List </h1>

			<div className="container d-flex justify-content-center bg-light p-3 rounded" style={{ width: "40rem" }}>
				<div className="input-group input-group-lg ">
					<input value={inputValue}
						onChange={(event) => setInputValue(event.target.value)}
						type="text" className="form-control"
						placeholder="Ingrese una tarea..." />
					<button type="button" className="btn btn-outline-success ms-2" onClick={saveToDo}>Añadir tarea</button>
					<button type="button" className="btn btn-outline-danger ms-2" onClick={deleteAllTasks}>Vaciar lista</button>
				</div>
			</div>

			<div className="container d-flex justify-content-center bg-light p-3 rounded my-2" style={{ width: "40rem" }}>
				<TaskList listTask={listTask} deleteTask={deleteTask} updateTaskList={updateTaskList}/>
			</div>


		</>
	);
};

export default Home;
