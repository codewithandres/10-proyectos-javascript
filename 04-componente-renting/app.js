// Rating Component
// This script creates an interactive rating component with a specified number of items

// DOM element selection and configuration
const rantingContainer = document.querySelector('.rating');
const limit = 10;

// Variable to store the current rating value
let currentValue = 0;

// Generate HTML for rating items
const html = Array.from(Array(limit)).map((_, i) => {
	return `
        <!-- Each item in the rating component -->
        <div class="item item-${i}" data-pos="${i}"></div>
    `;
});

// Insert generated HTML into the container
rantingContainer.innerHTML = html.join('');

// Add event listeners to each rating item
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
	});
	
	// Click event listener for setting the rating
	element.addEventListener('click', (event) => {
		const post = element.getAttribute('data-pos');
		currentValue = parseInt(post) + 1;
		console.log(currentValue);
	});
});
