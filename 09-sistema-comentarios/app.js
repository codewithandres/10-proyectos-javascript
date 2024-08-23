// Crear un arreglo para almacenar las etiquetas
let tags = [];

// Seleccionar el contenedor del input de etiquetas
const inputTagContainer = document.querySelector('#input-tag');

// Crear un div para contener las etiquetas
const tagsContainer = document.createElement('div');

// Crear un span para el input de etiquetas
const inputTag = document.createElement('span');

// Agregar evento de clic al contenedor del input de etiquetas
inputTagContainer.addEventListener('click', event => {
	// Si se hace clic en el contenedor o en la etiqueta, enfocar el input
	if (
		event.target.id === 'input-tag' ||
		event.target.classList.contains('tag-container')
	) {
		inputTag.focus();
	}
});

// Configurar el input de etiquetas como un campo de texto editable
inputTag.ariaRoleDescription = 'textbox';
inputTag.contentEditable = 'true';

// Agregar clase de estilo al input de etiquetas y enfocarlo
inputTag.classList.add('input');
inputTag.focus();

// Agregar clases de estilo al contenedor del input de etiquetas y al contenedor de etiquetas
inputTagContainer.classList.add('input-tag-container');
tagsContainer.classList.add('tag-container');

// Agregar el contenedor de etiquetas al contenedor del input de etiquetas
inputTagContainer.appendChild(tagsContainer);

// Agregar el input de etiquetas al contenedor de etiquetas
tagsContainer.appendChild(inputTag);

// Agregar evento de tecla presionada al input de etiquetas
inputTag.addEventListener('keydown', event => {
	// Si se presiona Enter y el input no está vacío, agregar la etiqueta
	if (event.key === 'Enter' && inputTag.textContent !== '') {
		event.preventDefault();

		// Verificar si la etiqueta ya existe
		if (!existTag(inputTag.textContent)) {
			// Agregar la etiqueta al arreglo y limpiar el input
			tags.push(inputTag.textContent);
			inputTag.textContent = '';

			// Renderizar las etiquetas
			renderTags();
		}
	}
	// Si se presiona Backspace y el input está vacío, eliminar la última etiqueta
	else if (
		event.key === 'Backspace' &&
		inputTag.textContent === '' &&
		tags.length > 0
	) {
		tags.pop();
		renderTags();
	}
});

// Función para renderizar las etiquetas
const renderTags = () => {
	// Limpiar el contenedor de etiquetas
	tagsContainer.innerHTML = '';

	// Crear un arreglo de elementos de etiqueta
	const html = tags.map(tag => {
		const tagElement = document.createElement('div');
		const tagButton = document.createElement('button');

		// Agregar clase de estilo a la etiqueta
		tagElement.classList.add('tag-item');

		// Agregar texto de la etiqueta y botón de eliminar
		tagButton.textContent = 'X';
		tagElement.appendChild(document.createTextNode(tag));
		tagElement.appendChild(tagButton);

		// Agregar evento de clic al botón de eliminar
		tagButton.addEventListener('click', event => removeTag(tag));

		return tagElement;
	});

	// Agregar los elementos de etiqueta al contenedor de etiquetas
	html.forEach(element => tagsContainer.appendChild(element));

	// Agregar el input de etiquetas al contenedor de etiquetas
	tagsContainer.appendChild(inputTag);

	// Enfocar el input de etiquetas
	inputTag.focus();
};

// Función para verificar si una etiqueta ya existe
const existTag = value => tags.includes(value);

// Función para eliminar una etiqueta
const removeTag = value => {
	// Filtrar el arreglo de etiquetas para eliminar la etiqueta seleccionada
	tags = tags.filter(tag => tag != value);

	// Renderizar las etiquetas
	renderTags();
};
