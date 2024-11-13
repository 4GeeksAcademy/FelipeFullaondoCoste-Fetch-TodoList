import React, { useEffect, useState } from "react";

//create your first component
const Home = () => {

	const [inputValue, setInputValue] = useState("")
	const [listTask, setListTask] = useState([])

	const getUserTodosList = async () => {
		try {
			const response = await fetch(`https://playground.4geeks.com/todo/users/Felipe`);
			const result = await response.json()
			setListTask(result.todos)
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getUserTodosList();

	}, [])

	console.log(listTask);



	return (
		<>

			<h1 className="text-white display-1 text-center m-2 fw-bold fst-italic">Todo List </h1>

			<div className="container d-flex justify-content-center bg-light p-3 rounded" style={{ width: "40rem" }}>
				<div className="input-group input-group-lg ">
					<input value={inputValue}
						onChange={(event) => setInputValue(event.target.value)}
						type="text" className="form-control"
						placeholder="Ingrese una tarea..." />
				</div>
			</div>

			<div className="container d-flex justify-content-center bg-light p-3 rounded my-2" style={{ width: "40rem" }}>
				<ul>
					{listTask.map(task => (
						<div key={task.id}>
							<li>{task.label}</li>
						</div>
					))}
				</ul>
			</div>

		</>
	);
};

export default Home;
