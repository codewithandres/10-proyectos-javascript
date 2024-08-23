const DB = {
	items: [
		{ id: 0, title: 'Funko pop', price: 250, qty: 5 },
		{ id: 1, title: 'Mause Gamer', price: 260, qty: 3 },
		{ id: 2, title: 'Keyword gamer', price: 280, qty: 6 },
		{ id: 2, title: 'Head Phone', price: 100, qty: 10 },
		{ id: 2, title: 'Monitor 4K', price: 1000, qty: 2 },
	],
	methods: {
		find: id => {
			return DB.items.find(item => item.id === id);
		},

		remove: items => {
			items.map(item => {
				const product = DB.methods.find(item.id);
				product.qty = product.qty - item.qty;
			});
		},
	},
};

const shoppingCart = {
	items: [],
	methods: {
		Add: (id, qty) => {
			const cartItem = shoppingCart.methods.get(id);

			if (cartItem) {
				if (shoppingCart.methods.hasInventory(id, qty + cartItem.qty)) {
					cartItem.qty++;
				} else {
					alert('No hay inventario suficientes');
				}
			} else {
				shoppingCart.items.push({ id, qty });
			}
		},

		Remove: (id, qty) => {
			const cartIten = shoppingCart.methods.get(id);

			if (cartIten.qty - qty > 0) {
				cartIten.qty--;
			} else {
				shoppingCart.items = shoppingCart.items.filter(item => item.id !== id);
			}
		},

		count: () => {
			return shoppingCart.items.reduce((acc, item) => acc + item.qty, 0);
		},

		get: id => {
			const index = shoppingCart.items.findIndex(item => item.id === id);
			return index >= 0 ? shoppingCart.items[index] : null;
		},

		getToatal: () => {
			const total = shoppingCart.items.reduce((acc, item) => {
				const found = DB.methods.find(item.id);
				return acc + found.price * item.qty;
			}, 0);
			return total;
		},

		hasInventory: (id, qty) => {
			return DB.items.find(item => item.id === id).qty - qty >= 0;
		},

		pureChase: () => {
			DB.methods.remove(shoppingCart.items);
			shoppingCart.items = [];
		},
	},
};

const renderStore = () => {
	document.querySelector('#store-container').innerHTML = '';

	const html = DB.items
		.map(({ title, price, qty, id }) => {
			return ` 
            <div class="item">
                <div class="title">${title}</div>
                <div class="price">${numberToCurrent(price)}</div>
                <div class="qty">${qty} Units</div>

                <div class="actions">
                    <button class="add" data-id="${id}">
                        Add to Shopping Cart 
                    </button>
                </div>
            </div>
        `;
		})
		.join('');

	document
		.querySelector('#store-container')
		.insertAdjacentHTML('beforebegin', html);

	document.querySelectorAll('.item .actions .add').forEach(button =>
		button.addEventListener('click', event => {
			const id = parseInt(button.getAttribute('data-id'));

			const item = DB.items.find(item => item.id === id);

			if (item && item.qty - 1 > 0) {
				//añadir shoping card
				shoppingCart.methods.Add(id, 1);

				renderShoppingCart();
			} else {
				console.log('ya no hay inventarios');
			}
		}),
	);
};

const renderShoppingCart = () => {
	const html = shoppingCart.items.map(item => {
		const { title, price } = DB.methods.find(item.id);

		return ` 
            <div class="item">
                <div class="title">${title}</div>
                <div class="price">${numberToCurrent(price)}</div>
                <div class="qty">${item.qty} Units</div>
                
                <div class="subtotal">
                    Sub Total: ${numberToCurrent(item.qty * price)} 
                </div>

                <div class="actions">
                    <button class="add-one" data-id="${item.id}"> + </button>
                    <button class="remove-one" data-id="${item.id}"> - </button>
                </div>
            </div>
        `;
	});

	const closeButton = ` 
        <div class="cart-header">
            <button class="button-close"> close </button>
        </div>
    `;

	const purchaseButton =
		shoppingCart.items.length > 0
			? ` <div class="cart-actions"> 
                    <button id="button-purchase"> Purchase </button>
                </div>`
			: '';

	const total = shoppingCart.methods.getToatal();

	const totalContainer = ` 
        <div class="total">
            Total: ${numberToCurrent(total)}
        </div>
    `;

	const shopingCardContainer = document.querySelector(
		'#shopping-card-container',
	);

	const elemets = closeButton + html.join('') + totalContainer + purchaseButton;

	shopingCardContainer.classList.remove('hide');
	shopingCardContainer.classList.add('show');

	shopingCardContainer.innerHTML = elemets;

	document.querySelectorAll('.add-one').forEach(element => {
		element.addEventListener('click', event => {
			const id = parseInt(element.getAttribute('data-id'));
			shoppingCart.methods.Add(id, 1);
			renderShoppingCart();
		});
	});

	document.querySelectorAll('.remove-one').forEach(element => {
		element.addEventListener('click', event => {
			const id = parseInt(element.getAttribute('data-id'));
			shoppingCart.methods.Remove(id, 1);
			renderShoppingCart();
		});
	});

	document.querySelector('.button-close').addEventListener('click', event => {
		shopingCardContainer.classList.remove('show');
		shopingCardContainer.classList.add('hide');
	});

	document
		.querySelector('#button-purchase')
		?.addEventListener('click', event => {
			shoppingCart.methods.pureChase();
			renderStore();
			renderShoppingCart();
		});
};

const numberToCurrent = number => {
	return new Intl.NumberFormat('en-US', {
		maximumSignificantDigits: 2,
		style: 'currency',
		currency: 'USD',
	}).format(number);
};

numberToCurrent();
renderStore();
