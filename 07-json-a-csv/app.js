const jsonForm = document.querySelector('#jsonform');
const cssvForm = document.querySelector('#csvform');
const buttonConvert = document.querySelector('#bConvert');

buttonConvert.addEventListener('click', event => converJSOtoCVS());

const converJSOtoCVS = () => {
	let json;
	let keys = [];
	let values = [];

	try {
		json = JSON.parse(jsonForm.value);
	} catch (error) {
		console.log('Formato incorrento JSON', error);
	}

	if (Array.isArray(json)) {
		//algoritmo
		json.map(item => {
			const nkeys = Object.keys(item);

			if (keys.length === 0) {
				keys = [...nkeys];
			} else {
				if (nkeys.length !== keys.length) {
					throw new Error('Number of keys are diferent');
				} else {
					console.log('ok', nkeys);
				}
			}
			const row = keys.map(k => item[k]);

			values.push([...row]);
			values.unshift(keys);

			const text = values.map(v => v.join(',')).join('\n');

			cssvForm.value = text;
		});
	} else {
		console.log('No es un arreglo de objetos');
	}
};
