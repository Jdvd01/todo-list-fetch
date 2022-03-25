import React from "react";
import propTypes from "prop-types";

const Form = ({ nuevaTarea, addTask, task }) => {
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
			}}>
			<input
				type="text"
				className="nuevaTarea w-100 px-3 py-1"
				placeholder="Nueva Tarea"
				name="tarea"
				value={task.tarea}
				onChange={nuevaTarea}
			/>
			<button
				type="button"
				className="botonAgregar btn-info"
				onClick={() => addTask()}>
				Agregar!
			</button>
		</form>
	);
};

Form.propTypes = {
	nuevaTarea: propTypes.func,
	addTask: propTypes.func,
	task: propTypes.object,
};

export default Form;
