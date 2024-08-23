let tags = [];

const inputTagContainer = document.querySelector('#input-tag');
const tagsContainer = document.createElement('div');
const inputTag = document.createElement('span');

inputTagContainer.addEventListener('click', event => {
	if (
		event.target.id === 'input-tag' ||
		event.target.classList.contains('tag-container')
	) {
		inputTag.focus();
	}
});

inputTag.ariaRoleDescription = 'textbox';
inputTag.contentEditable = 'true';

inputTag.classList.add('input');
inputTag.focus();

inputTagContainer.classList.add('input-tag-container');
tagsContainer.classList.add('tag-container');

inputTagContainer.appendChild(tagsContainer);
tagsContainer.appendChild(inputTag);

inputTag.addEventListener('keydown', event => {
	if (event.key === 'Enter' && inputTag.textContent !== '') {
		event.preventDefault();

		if (!existTag(inputTag.textContent)) {
			tags.push(inputTag.textContent);

			inputTag.textContent = '';

			renderTags();
		}
	} else if (
		event.key === 'Backspace' &&
		inputTag.textContent === '' &&
		tags.length > 0
	) {
		tags.pop();
		renderTags();
	}
});

const renderTags = () => {
	tagsContainer.innerHTML = '';

	const html = tags.map(tag => {
		const tagElement = document.createElement('div');
		const tagButton = document.createElement('button');

		tagElement.classList.add('tag-item');
		tagButton.textContent = 'X';

		tagButton.addEventListener('click', event => removeTag(tag));

		tagElement.appendChild(document.createTextNode(tag));
		tagElement.appendChild(tagButton);

		return tagElement;
	});

	html.forEach(element => tagsContainer.appendChild(element));

	tagsContainer.appendChild(inputTag);

	inputTag.focus();
};

const existTag = value => tags.includes(value);

const removeTag = value => {
	tags = tags.filter(tag => tag != value);

	renderTags();
};
