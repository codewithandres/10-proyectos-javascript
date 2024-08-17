const tasks = [];
let time = 0;
let timer = null;
let breack = null;
let current = null;

const buttonAdd = document.querySelector('#button-add');
const itTask = document.querySelector('#itTask');
const form = document.querySelector('#form');
const taskName = document.querySelector('.time #taskNamae');

form.addEventListener('submit', (event) => {
	event.preventDefault();

	if (itTask.value !== '') {
		createTask(itTask.value);
		itTask.value = '';
		renderTask();
	}
});

const createTask = (value) => {
	const newTask = {
		id: (Math.random() * 100).toString(36).slice(3),
		title: value,
		completed: false,
	};
	tasks.unshift(newTask);
};

const renderTask = () => {
	const html = tasks.map(({ title, completed, id }) => {
		return `
            <div class="task">
                <div class="competed"> ${
					completed
						? `<span class="done"> Done </span>`
						: `<button class="start-button" data-id="${id}"> start </button>`
				} </div>
                <div class="title">${title}</div>
            </div>
        `;
	});

	const tasksContainer = document.querySelector('#tasks');
	tasksContainer.innerHTML = html.join('');

	const satarButtons = [...document.querySelectorAll('.task .start-button')];

	satarButtons.map((button) => {
		button.addEventListener('click', (event) => {
			if (!timer) {
				const id = button.getAttribute('data-id');
				startButtonHandler(id);
				button.textContent = `In Progress...`;
			}
		});
	});
};

const startButtonHandler = (id) => {
	time = 5;
	current = id;

	const taskIndex = tasks.findIndex((task) => task.id === id);

	taskName.textContent = tasks[taskIndex].title;

	timer = setInterval(() => timeHandler(id), 1000);
};

const timeHandler = (id) => {
	time--;
	renderTime();

	if (time === 0) {
		clearInterval(timer);
		markCompleted(id);
		timer = null;
		renderTask();
		starBreack();
	}
};

const starBreack = () => {
	time = 3;
	taskName.textContent = 'Break';
	timerBreak = setInterval(() => timerBreakHandler(), 1000);
};

const timerBreakHandler = () => {
	time--;
	renderTime();

	if (time === 0) {
		clearInterval(timerBreak);

		current = null;
		taskName.textContent = '';
		timerBreak = null;

		renderTask();
	}
};

const renderTime = () => {
	const timeDiv = document.querySelector('.time #value');
	const minutes = parseInt(time / 60);
	const seconds = parseInt(time % 60);

	timeDiv.textContent = `
        ${minutes < 10 ? '0' : ''}${minutes} : 
        ${seconds < 10 ? '0' : ''}${seconds}`;
};

const markCompleted = (id) => {
	const taskIndex = tasks.findIndex((task) => task.id === id);
	tasks[taskIndex].completed = true;
};

renderTask();
renderTime();
