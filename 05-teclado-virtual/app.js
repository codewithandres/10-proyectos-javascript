const keys = [
	[
		['1', '!'],
		['2', '@'],
		['3', '#'],
		['4', '$'],
		['5', '%'],
		['6', '&'],
		['7', '/'],
		['8', '('],
		['9', ')'],
		['0', '='],
		["'", '?'],
		['¡', '¿'],
	],
	[
		['q', 'Q'],
		['w', 'W'],
		['e', 'E'],
		['r', 'R'],
		['t', 'T'],
		['y', 'Y'],
		['u', 'U'],
		['i', 'I'],
		['o', 'O'],
		['p', 'P'],
		['`', '^'],
		['+', '*'],
	],
	[
		['MAYUS', 'MAYUS'],
		['a', 'A'],
		['s', 'S'],
		['d', 'D'],
		['f', 'F'],
		['g', 'G'],
		['h', 'H'],
		['j', 'J'],
		['k', 'K'],
		['l', 'L'],
		['ñ', 'Ñ'],
		['¨', '{'],
		['Ç', '}'],
	],
	[
		['SHIFT', 'SHIFT'],
		['<', '>'],
		['z', 'Z'],
		['x', 'X'],
		['c', 'C'],
		['v', 'V'],
		['b', 'B'],
		['n', 'N'],
		['m', 'M'],
		[',', ';'],
		['.', ':'],
		['-', '_'],
	],
	[['SPACE', 'SPACE']],
];

let shift = false;
let mayus = false;
let current = null;

const renderKeyboard = () => {
	const keyboardContainer = document.querySelector('#keyboard-container');

	let empty = `<div class="key-empty"></div>`;

	const layers = keys.map((layer, i) => {
		return layer.map((key) => {
			if (key.at(0) === 'SHIFT')
				return `<button class="key key-shift">${key[0]}</button>`;

			if (key.at(0) === 'MAYUS')
				return `<button class="key key-mayus ${
					mayus ? 'activated' : ''
				}">${key.at(0)}</button>`;

			if (key.at(0) === 'SPACE')
				return `<button class="key key-space"></button>`;

			return `<button class="key key-normal">${
				shift
					? key.at(1)
					: mayus &&
					  key.at(0).toLowerCase().charCodeAt(0) >= 97 &&
					  key.at(0).toLowerCase().charCodeAt(0) <= 122
					? key.at(1)
					: key.at(0)
			}</button>`;
		});
	});

	layers.at(0).push(empty);
	layers.at(1).unshift(empty);

	const htmlLayers = layers.map((layer) => layer.join(''));

	keyboardContainer.innerHTML = '';

	htmlLayers.forEach((layer) => {
		keyboardContainer.innerHTML += `<div class="layer">${layer}</div>`;
	});

	document.querySelectorAll('.key').forEach((key) => {
		key.addEventListener('click', (e) => {
			if (current) {
				if (key.textContent === 'SHIFT') shift = !shift;
				else if (key.textContent === 'MAYUS') mayus = !mayus;
				else if (key.textContent === '') current.value += ' ';
				else {
					current.value += key.textContent;
					if (shift) shift = false;
				}

				current.focus();
				renderKeyboard();
			}
		});
	});

	document.querySelectorAll('input').forEach((input) => {
		input.addEventListener('focusin', (e) => (current = e.target));
	});
};

renderKeyboard();
