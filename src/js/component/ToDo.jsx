import React, { useState } from "react";
import ListaDeTareas from "./ListaDeTareas.jsx";
import Form from "./Form.jsx";

const ToDo = () => {
	const [error, setError] = useState(false);
	const [listTask, setListTask] = useState([]);
	const [task, setTask] = useState({
		tarea: "",
	});

	const nuevaTarea = (e) => {
		setTask({
			...task,
			[e.target.name]: e.target.value,
		});
	};

	/* funcion para agregar todas las tareas guardadas a un array */
	const addTask = () => {
		if (task.tarea.trim() != "") {
			setListTask([...listTask, task]);
			setError(false);
		} else {
			setError(true);
		}
	};

	/* funcion para borrar tareas */
	const deleteTask = (id) => {
		let newListTask = listTask.filter((item, index) => index != id);
		setListTask(newListTask);
	};

	return (
		<>
			<div className="contenedor">
				<div className="card toDo col-6">
					{/* titulo de la lista de tareas */}
					<h1 className="titulo text-center py-3">Lista de tareas</h1>

					{/* input para agregar tareas nuevas */}

					<Form
						nuevaTarea={nuevaTarea}
						addTask={addTask}
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
						<div>
							<ListaDeTareas
								deleteTask={deleteTask}
								listTask={listTask}
							/>
						</div>

						<p className="fs-6 p-0 mb-2">
							{listTask.length} tareas faltantes
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default ToDo;
