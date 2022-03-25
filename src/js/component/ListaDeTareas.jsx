import React from "react";
import propTypes from "prop-types";

const ListaDeTareas = ({ deleteTask, listTask }) => {
	return (
		<ul className="list-group list-group-flush">
			{listTask.map((item, index) => (
				<li
					key={index}
					className="muestraBoton list-group-item d-flex justify-content-between">
					<p className="m-0">{item.tarea}</p>
					<div
						className="botonEliminar"
						onClick={() => deleteTask(index)}>
						X
					</div>
				</li>
			))}
		</ul>
	);
};

ListaDeTareas.propTypes = {
	deleteTask: propTypes.func,
	listTask: propTypes.array,
};

export default ListaDeTareas;
