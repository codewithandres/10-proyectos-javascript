const rantingContainer = document.querySelector('.rating');
const limit = 10;

let currentValue = 0;

const html = Array.from(Array(limit)).map((_, i) => {
	return `
        <div class="item item-${i}" data-pos="${i}"></div>
    `;
});

rantingContainer.innerHTML = html.join('');

document.querySelectorAll('.item').forEach((element) => {
	element.addEventListener('mouseover', (event) => {
		const pos = element.getAttribute('data-pos');

		if (currentValue === parseInt(pos) + 1) return;

		document.querySelectorAll('.item').forEach((element) => {
			if (element.classList.contains('item-full'))
				element.classList.remove('item-full');
		});

		for (i = 0; i <= pos; i++) {
			const squere = document.querySelector(`.item-${i}`);

			if (!squere.classList.contains('item-full'))
				squere.classList.add('item-full');
		}
		currentValue = parseInt(pos) + 1;
	}),
		element.addEventListener('click', (event) => {
			const post = element.getAttribute('data-pos');
			currentValue = parseInt(post) + 1;
			console.log(currentValue);
		});
});
