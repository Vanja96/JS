import { API_JACKETS_URL } from "./constants.mjs";

// -------------------------------
const formatPrice = (price) => {
  const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  return formatter.format(price);
};

// -------------------------------
const createCartItemElement = (item) => {
  const itemElement = document.createElement('div');
  itemElement.className = 'cart-item';

  // -------------------------------
  const imageContainer = document.createElement('div');
  imageContainer.className = 'item-image';
  imageContainer.innerHTML = `<img src="${item.image || 'placeholder-image-url'}" alt="${item.title || 'Product Image'}">`;

  // -------------------------------
  const detailsContainer = document.createElement('div');
  detailsContainer.className = 'item-details';
  detailsContainer.innerHTML = `
    <p>Title: ${item.title}</p>
    <p>Size: ${item.size}</p>
    <p>Color: ${item.color}</p>
    <p>Price: ${formatPrice(item.price)}</p>
    <p>Quantity: <span id="quantity-${item.id}">${item.quantity}</span></p>
  `;

  // -------------------------------
  const incrementButton = document.createElement('button');
  incrementButton.textContent = '+';
  incrementButton.dataset.itemId = item.id;
  incrementButton.className = 'increment-button';

  const decrementButton = document.createElement('button');
  decrementButton.textContent = '-';
  decrementButton.dataset.itemId = item.id;
  decrementButton.className = 'decrement-button';

  // -------------------------------
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.dataset.itemId = item.id;
  removeButton.className = 'remove-button';

  // -------------------------------
  detailsContainer.appendChild(incrementButton);
  detailsContainer.appendChild(decrementButton);
  detailsContainer.appendChild(removeButton);

  itemElement.appendChild(imageContainer);
  itemElement.appendChild(detailsContainer);

  return itemElement;
};

// -------------------------------
function displayCartItems(itemDetalis) {
  showLoader('./loader.mjs');
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';

  const checkoutButton = document.getElementById('checkout-button');
  const cart = getCart('.cartUtils.mjs');
  let totalPrice = 0;

  if (cart.length === 0) {
    checkoutButton.style.display = 'none';
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'Your cart is empty';
    cartItemsContainer.appendChild(emptyMessage);
  } else {
    checkoutButton.style.display = 'block';
    
    const fragment = document.createDocumentFragment();
    cart.forEach((item) => {
      const itemElement = createCartItemElement(item);
      fragment.appendChild(itemElement);
      totalPrice += item.price * item.quantity;
    });

    cartItemsContainer.appendChild(fragment);
    const totalPriceElement = document.getElementById('cart-total');
    totalPriceElement.textContent = formatPrice(totalPrice);
  }

  hideLoader();
}

// -------------------------------
document.getElementById('cart-items').addEventListener('click', (event) => {
  const itemId = event.target.dataset.itemId;
  if (event.target.matches('.increment-button')) {
    incrementQuantity(itemId);
  } else if (event.target.matches('.decrement-button')) {
    decrementQuantity(itemId);
  } else if (event.target.matches('.remove-button')) {
    removeFromCart(itemId);
  }
  displayCartItems('cart-items'); 
});

// -------------------------------
const cartIcon = document.getElementById('cart-icon');
const cartDropdown = document.getElementById('cart-dropdown');
const cart = document.querySelector('.cart');

const translateY = (element, pixels) => {
  element.style.transform = `translateY(${pixels}px)`;
};

// -------------------------------
const saveCartToLocalStorage = (cart) => {
  localStorage.setItem('cartItems', JSON.stringify(cart));
};

// -------------------------------
const getCartFromLocalStorage = () => {
  const cartItems = localStorage.getItem('cartItems');
  return cartItems ? JSON.parse(cartItems) : [];
};

// -------------------------------
cartIcon.addEventListener('click', (event) => {
  event.stopPropagation(); 
  cartDropdown.classList.toggle('active');
});

// -------------------------------
document.addEventListener('click', (event) => {
  if (!cart.contains(event.target)) {
    cartDropdown.classList.remove('active');
  }
});

// -------------------------------
cartDropdown.addEventListener('click', (event) => {
  event.stopPropagation();
});


