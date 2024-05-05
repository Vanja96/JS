

// Helper function to format price
const formatPrice = (price) => {
  const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  return formatter.format(price);
};

// Function to create a cart item element
const createCartItemElement = (item) => {
  const itemElement = document.createElement('div');
  itemElement.className = 'cart-item';

  // Image
  const imageContainer = document.createElement('div');
  imageContainer.className = 'item-image';
  imageContainer.innerHTML = `<img src="${item.image || 'placeholder-image-url'}" alt="${item.title || 'Product Image'}">`;

  // Item details
  const detailsContainer = document.createElement('div');
  detailsContainer.className = 'item-details';
  detailsContainer.innerHTML = `
    <p>Title: ${item.title}</p>
    <p>Size: ${item.size}</p>
    <p>Color: ${item.color}</p>
    <p>Price: ${formatPrice(item.price)}</p>
    <p>Quantity: <span id="quantity-${item.id}">${item.quantity}</span></p>
  `;

  // Increment and decrement buttons will be handled by event delegation
  const incrementButton = document.createElement('button');
  incrementButton.textContent = '+';
  incrementButton.dataset.itemId = item.id;
  incrementButton.className = 'increment-button';

  const decrementButton = document.createElement('button');
  decrementButton.textContent = '-';
  decrementButton.dataset.itemId = item.id;
  decrementButton.className = 'decrement-button';

  // Remove item button
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.dataset.itemId = item.id;
  removeButton.className = 'remove-button';

  // Append buttons to details
  detailsContainer.appendChild(incrementButton);
  detailsContainer.appendChild(decrementButton);
  detailsContainer.appendChild(removeButton);

  itemElement.appendChild(imageContainer);
  itemElement.appendChild(detailsContainer);

  return itemElement;
};

// Improved displayCartItems function
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

// Event listener for cart items container
document.getElementById('cart-items').addEventListener('click', (event) => {
  const itemId = event.target.dataset.itemId;
  if (event.target.matches('.increment-button')) {
    incrementQuantity(itemId);
  } else if (event.target.matches('.decrement-button')) {
    decrementQuantity(itemId);
  } else if (event.target.matches('.remove-button')) {
    removeFromCart(itemId);
  }
  displayCartItems('cart-items'); // Re-render the cart items to reflect the changes
});

// Variable declarations for cart icon and dropdown
const cartIcon = document.getElementById('cart-icon');
const cartDropdown = document.getElementById('cart-dropdown');
const cart = document.querySelector('.cart');

const translateY = (element, pixels) => {
  element.style.transform = `translateY(${pixels}px)`;
};

// Function to save cart items to local storage
const saveCartToLocalStorage = (cart) => {
  localStorage.setItem('cartItems', JSON.stringify(cart));
};

// Function to get cart items from local storage
const getCartFromLocalStorage = () => {
  const cartItems = localStorage.getItem('cartItems');
  return cartItems ? JSON.parse(cartItems) : [];
};

// Event listener for cart icon click
cartIcon.addEventListener('click', (event) => {
  event.stopPropagation(); // Prevents click from propagating to other elements
  cartDropdown.classList.toggle('active');
});

// Close the cart dropdown if the user clicks outside of it
document.addEventListener('click', (event) => {
  if (!cart.contains(event.target)) {
    cartDropdown.classList.remove('active');
  }
});

// Prevent closing the dropdown when clicking inside of it
cartDropdown.addEventListener('click', (event) => {
  event.stopPropagation();
});

// Call displayCartItems
