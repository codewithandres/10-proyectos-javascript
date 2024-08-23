// Credit Card Input Formatter
// This script formats user input for credit card number, expiration date, and CVV

// DOM element selections
const inputCard = document.querySelector('#input-card');
const inputDate = document.querySelector('#input-date');
const inputCVV = document.querySelector('#input-cvv');

// Mask patterns for input formatting
const maskNumber = '####-####-####-####';
const maskDate = '##/##';
const maskCVV = '###';

// Arrays to store formatted input
let current = ''; // Unused variable, consider removing
let cardNumber = [];
let dateNumber = [];
let cvvNumber = [];

// Event listener for credit card number input
inputCard.addEventListener('keydown', (event) => {
	if (event.key === 'Tab') return;

	event.preventDefault();
	handleInput(maskNumber, event.key, cardNumber);
	inputCard.value = cardNumber.join('');
});

// Event listener for expiration date input
inputDate.addEventListener('keydown', (event) => {
	if (event.key === 'Tab') return;

	event.preventDefault();
	handleInput(maskDate, event.key, dateNumber);
	inputDate.value = dateNumber.join('');
});

// Event listener for CVV input
inputCVV.addEventListener('keydown', (event) => {
	if (event.key === 'Tab') return;

	event.preventDefault();
	handleInput(maskCVV, event.key, cvvNumber);
	inputCVV.value = cvvNumber.join('');
});

// Function to handle input formatting based on mask
const handleInput = (mask, key, arr) => {
	let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

	if (key === 'Backspace' && arr.length > 0) arr.pop();

	if (numbers.includes(key) && arr.length + 1 <= mask.length)
		if (mask[arr.length] === '-' || mask[arr.length] === '/')
			arr.push(mask[arr.length], key);
		else arr.push(key);
};
