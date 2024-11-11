import React, { useState } from "react";


//create your first component
const Home = () => {

	const [inputValue, setInputValue] = useState("") 
	const [listTask, setListTask] = useState([])


	

	return (
		<>

			<h1 className="text-white display-1 text-center m-2 fw-bold fst-italic">Todo List </h1>

			<div className="container d-flex justify-content-center bg-light p-3 rounded" style={{ width: "40rem" }}>
				<div className="input-group input-group-lg ">
					<input 	value={inputValue}
        					onChange={(event) => setInputValue(event.target.value)} 
							type="text" className="form-control" 
							placeholder="Ingrese una tarea..."/>
				</div>

			</div>
		</>
	);
};

export default Home;
