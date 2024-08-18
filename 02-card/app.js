const inputCard = document.querySelector('#input-card');
const inputDate = document.querySelector('#input-date');
const inputCVV = document.querySelector('#input-cvv');

const maskNumber = '####-####-####-####';
const maskDate = '##/##';
const maskCVV = '###';
let current = '';
let cardNumber = [];
let dateNumber = [];
let cvvNumber = [];

inputCard.addEventListener('keydown', (event) => {
	if (event.key === 'Tab') return;

	event.preventDefault();
	handleInput(maskNumber, event.key, cardNumber);
	inputCard.value = cardNumber.join('');
});

inputDate.addEventListener('keydown', (event) => {
	if (event.key === 'Tab') return;

	event.preventDefault();
	handleInput(maskDate, event.key, dateNumber);
	inputDate.value = dateNumber.join('');
});

inputCVV.addEventListener('keydown', (event) => {
	if (event.key === 'Tab') return;

	event.preventDefault();
	handleInput(maskCVV, event.key, cvvNumber);
	inputCVV.value = cvvNumber.join('');
});

const handleInput = (mask, key, arr) => {
	let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

	if (key === 'Backspace' && arr.length > 0) arr.pop();

	if (numbers.includes(key) && arr.length + 1 <= mask.length)
		if (mask[arr.length] === '-' || mask[arr.length] === '/')
			arr.push(mask[arr.length], key);
		else arr.push(key);
};
