// scripts.js
let cart = [];

function addToCart(productId) {
    const productElement = document.querySelector(`.product[data-id='${productId}']`);
    const productName = productElement.getAttribute('data-name');
    const productPrice = parseFloat(productElement.getAttribute('data-price'));

    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = '';

    let total = 0;
    let count = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        count += item.quantity;

        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <span>${item.name} - $${item.price} x ${item.quantity}</span>
            <div>
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
                <button onclick="changeQuantity(${item.id}, -1)">-</button>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
        cartItemsElement.appendChild(cartItemElement);
    });

    document.getElementById('cart-count').innerText = count;
    document.getElementById('cart-total').innerText = total.toFixed(2);
}

function changeQuantity(productId, delta) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity += delta;
        if (product.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function toggleCart() {
    const cartSection = document.getElementById('cart-section');
    if (cartSection.style.display === 'none') {
        cartSection.style.display = 'block';
    } else {
        cartSection.style.display = 'none';
    }
}
