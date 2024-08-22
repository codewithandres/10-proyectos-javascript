let tags = [];

const inputContainer = document.querySelector('#input-tag');
const tagsContainer = document.createElement('div');
const inputTags = document.createElement('span');

inputTags.ariaRoleDescription = 'textBox';
inputTags.contentEditable = 'true';
inputTags.classList.add('input');
inputTags.focus();

inputContainer.classList.add('input-tag-container');
tagsContainer.classList.add('tag-container');

inputContainer.appendChild(tagsContainer);
tagsContainer.appendChild(inputTags);

inputContainer.addEventListener('click', event => {
	if (
		event.target.id === 'input-tag' ||
		event.target.classList.contains('tag-container')
	) {
		inputTags.focus();
	}
});

inputTags.addEventListener('keydown', event => {
	if (event.key === 'Enter' && inputTags.textContent !== '') {
		event.preventDefault();

		if (!existTags(inputTags.textContent)) {
			tags.push(inputTags.textContent);
			inputTags.textContent = '';

			renderTags();
		}
	} else if (
		event.key === 'BackSpace' &&
		inputTags.textContent === '' &&
		tags.length > 0
	) {
		tags.pop();
		renderTags();
	}
});

const renderTags = () => {
	tagsContainer.innerHTML = '';

	const html = tags.map(tag => {
		const tagElemt = document.createElement('div');
		const tagButton = document.createElement('button');

		tagElemt.classList.add('tag-item');
		tagButton.textContent = 'X';

		tagButton.addEventListener('click', event => {
			//eliminar etiqueta
			removeTags(tag);
		});
		tagElemt.appendChild(document.createTextNode(tag));
		tagElemt.appendChild(tagButton);

		return tagElemt;
	});

	html.forEach(element => {
		tagsContainer.appendChild(element);
	});

	inputContainer.appendChild(inputTags);
	inputTags.focus();
};

const existTags = value => tags.includes(value);

const removeTags = value => {
	tags = tags.filter(tag => tag !== value);
	renderTags();
};
