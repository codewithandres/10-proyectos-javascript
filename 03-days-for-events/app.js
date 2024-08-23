// Event Countdown Application
// This application allows users to add events and displays the number of days until each event

// Arrays to store events
let events = [];
let arr = [];

// DOM element selections
const eventName = document.querySelector('#event-name');
const eventDate = document.querySelector('#event-date');
const eventButton = document.querySelector('#event-add');
const eventContainer = document.querySelector('.event-container');

// Event listener for form submission
document.querySelector('form').addEventListener('submit', (event) => {
	event.preventDefault();
	addEvent();
});

// Function to add a new event
const addEvent = () => {
	if (eventName.value === '' || eventDate.value === '') return;

	if (dateDiff(eventDate) < 0) return;

	const newEvent = {
		id: (Math.random() * 100).toString().slice(3),
		name: eventName.value,
		date: eventDate.value,
	};

	events.unshift(newEvent);

	save(JSON.stringify(events));

	eventName.value = '';

	renderEvents();
};

// Function to calculate the number of days between two dates
const dateDiff = (date) => {
	const targetDate = new Date(date);
	const todays = new Date();

	const dateDiference = targetDate.getTime() - todays.getTime();
	const days = Math.ceil(dateDiference / (1000 * 3600 * 24));

	return days;
};

// Function to render events in the DOM
const renderEvents = () => {
	const eventsHTML = events.map((event) => {
		return `
            <div class="event">
                <div class="days">
                    <span class="days-number">${dateDiff(event.date)}</span>
                    <span class="days-text>Days</span>
                </div>

                <div class="event-name">${event.name}</div>
                <div class="event-date">${event.date}</div>

	// Add event listeners to delete buttons
                <div class="actions" >
                    <button class="button-delete" data-id="${
						event.id
					}"> Delete </button>
                </div>
            </div> 
        `;
	});

	eventContainer.innerHTML = eventsHTML.join('');

	[...document.querySelectorAll('.button-delete')].map((button) => {
		button.addEventListener('click', (event) => {
			const id = button.getAttribute('data-id');

			events = events.filter((event) => event.id !== id);
			renderEvents();
		});
	});
};

// Function to save events to local storage
const save = (data) => {
	localStorage.setItem('items', data);
};

// Function to load events from local storage
const load = () => localStorage.getItem('items');
const json = load();
try {
	arr = JSON.stringify(json); // This line might cause an error, consider using JSON.parse(json) instead
} catch (error) {
	arr = [];
}

events = arr ? [...arr] : [];

renderEvents();
events = arr ? [...arr] : []; // This line might not work as expected due to the potential error above
// Initial render of events
