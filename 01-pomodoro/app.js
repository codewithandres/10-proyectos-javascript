// Pomodoro Timer Application
// This application implements a Pomodoro timer with task management functionality

// Global variables
const tasks = [];
let time = 0;      // Tracks the remaining time in seconds
let timer = null;  // Holds the timer interval
let breack = null; // Holds the break timer interval (typo: should be 'break')
let current = null; // Holds the ID of the current task

// DOM element selections
const buttonAdd = document.querySelector('#button-add');
const itTask = document.querySelector('#itTask');
const form = document.querySelector('#form');
const taskName = document.querySelector('.time #taskNamae');

// Event listener for form submission (adding a new task)
form.addEventListener('submit', (event) => {
	event.preventDefault();

	if (itTask.value !== '') {
		createTask(itTask.value);
		itTask.value = '';
		renderTask();
	}
});

// Function to create a new task object
const createTask = (value) => {
	const newTask = {
		id: (Math.random() * 100).toString(36).slice(3),
		title: value,
		completed: false,
	};
	tasks.unshift(newTask);
};

// Function to render tasks in the DOM
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

	// Add event listeners to start buttons
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

// Function to handle starting a task
const startButtonHandler = (id) => {
	time = 5;
	current = id;

	const taskIndex = tasks.findIndex((task) => task.id === id);

	taskName.textContent = tasks[taskIndex].title;
	renderTime();
	timer = setInterval(() => timeHandler(id), 1000);
};

// Function to handle timer countdown
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

// Function to start a break
const starBreack = () => {
	time = 3;
	taskName.textContent = 'Break';
	renderTime();
	timerBreak = setInterval(() => timerBreakHandler(), 1000);
};

// Function to handle break timer countdown
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

// Function to render the remaining time
const renderTime = () => {
	const timeDiv = document.querySelector('.time #value');
	const minutes = parseInt(time / 60);
	const seconds = parseInt(time % 60);

	timeDiv.textContent = `
        ${minutes < 10 ? '0' : ''}${minutes} : 
        ${seconds < 10 ? '0' : ''}${seconds}`;
};

// Function to mark a task as completed
const markCompleted = (id) => {
	const taskIndex = tasks.findIndex((task) => task.id === id);
	tasks[taskIndex].completed = true;
};

// Initial render of tasks
renderTask();
renderTime();
