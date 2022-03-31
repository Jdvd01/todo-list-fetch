import React, { useState, useEffect } from "react";
import ListaDeTareas from "./ListaDeTareas.jsx";
import Form from "./Form.jsx";

const URL_BASE = "http://assets.breatheco.de/apis/fake/todos/user";
let initialState = { label: "", done: false };

const ToDo = () => {
	const [error, setError] = useState(false);
	const [listTask, setListTask] = useState([]);
	const [task, setTask] = useState(initialState);

	//Guardar las nuevas tareas en la lista
	const nuevaTarea = (e) => {
		setTask({
			...task,
			[e.target.name]: e.target.value,
		});
	};

	// Funcion para crear el usuario con POST
	const createUser = async () => {
		try {
			let response = await fetch(`${URL_BASE}/JoseVelasquez`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify([]),
			});
			if (response.ok) {
				getTasks();
			} else {
				alert("El usuario no se ha creado");
			}
		} catch (error) {
			console.log(error);
		}
	};

	//Funcion para hacer GET a todas las tareas, o crear el usuario si no lo esta
	const getTasks = async () => {
		try {
			setError(false);
			let response = await fetch(`${URL_BASE}/JoseVelasquez`);
			let results = await response.json();
			if (response.ok) {
				setListTask(results);
			} else {
				createUser();
			}
		} catch (error) {
			console.log(error);
		}
	};

	//Funcion para agregar tareas nuevas con PUT
	const putTasks = async () => {
		try {
			if (task.label.trim() != "") {
				let response = await fetch(`${URL_BASE}/JoseVelasquez`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify([...listTask, task]),
				});
				if (response.ok) {
					getTasks();
					setError(false);
				} else {
					console.log(response.status);
				}
			} else {
				setError(true);
				return;
			}
		} catch (error) {
			console.log(error);
		}
	};

	//Funcion para borrar tareas con PUT
	const deleteTask = async (id) => {
		try {
			let newListTask = await listTask.filter(
				(item, index) => index != id
			);
			let response = await fetch(`${URL_BASE}/JoseVelasquez`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newListTask),
			});
			if (response.ok) {
				getTasks();
			} else {
				console.log(response.status);
			}
		} catch (error) {
			console.log(error);
		}
	};

	//Funcion para hacer DELETE al usuario y crear una nueva lista
	const deleteList = async () => {
		try {
			let response = await fetch(`${URL_BASE}/JoseVelasquez`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (response.ok) {
				alert(
					"Su lista se ha borrado y se ha creado una nueva lista de tareas"
				);
				getTasks();
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getTasks();
	}, []);
	return (
		<>
			<div className="contenedor">
				<div className="card toDo col-6">
					{/* titulo de la lista de tareas */}
					<h1 className="titulo text-center py-3">Lista de tareas</h1>

					{/* input para agregar tareas nuevas */}

					<Form
						nuevaTarea={nuevaTarea}
						putTasks={putTasks}
						task={task}
					/>

					<div className="lista">
						{/* si la tarea esta en blanco, lanzar un div de aviso */}
						{error && (
							<div className="alert alert-danger">
								No se aceptan tareas en blanco!
							</div>
						)}

						<h1>Tareas por hacer:</h1>
						<hr />

						{/* Este parrafo deberia salir cuando no hay tareas */}
						{listTask == "" && <p>No hay tareas</p>}

						{/* lista de tareas nuevas */}

						<ListaDeTareas
							deleteTask={deleteTask}
							listTask={listTask}
						/>

						<p className="fs-6 p-0 mb-2">
							{listTask.length} tareas faltantes
						</p>
						<button
							type="button"
							className="botonLista btn-info"
							onClick={() => deleteList()}>
							Borrar lista
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ToDo;
