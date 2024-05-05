// Import the constant for API URL
import { API_JACKETS_URL } from "./constants.mjs";


// Function to get the product ID from the URL query string
function getProductIdFromUrl() {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get('id');
}

// Function to fetch product details using the product ID
async function fetchProductDetails(productId) {
    try {
        const response = await fetch(`${API_JACKETS_URL}/${productId}`);
        const product = await response.json();
        return product;
    } catch (error) {
        console.error("error fetching product details:", error);
        return null;
    }
}

// Function to populate the product detail page
async function populateProductDetails() {
    const productId = getProductIdFromUrl();
    if (!productId) {
        console.error("Product ID not found in the URL");
        return;
    }

    const product = await fetchProductDetails(productId);
    if (!product) {
        console.error("Product not found");
        return;
    }

    document.getElementById('product-image').src = product.image || 'placeholder-image-url';
    document.getElementById('product-image').alt = product.title || 'Product Image';
    document.getElementById('product-title').textContent = product.title || 'Product Title';

    const priceFormatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price);
    document.getElementById('product-price').textContent = priceFormatted;

    document.getElementById('product-base-color').textContent = product.baseColor || 'Base Color';

    const sizeSelector = document.getElementById('size-selector');
    sizeSelector.innerHTML = ''; // Clear any existing size buttons

    ['S', 'M', 'L', 'XL'].forEach(size => {
        const sizeButton = document.createElement('button');
        sizeButton.textContent = size;

        sizeButton.addEventListener('click', () => {
            const isSelected = sizeButton.classList.contains('selected');

            // Remove 'selected' class from all buttons
            sizeSelector.querySelectorAll('button').forEach(button => {
                button.classList.remove('selected');
            });

            // If the button was not already selected, mark it as selected
            if (!isSelected) {
                sizeButton.classList.add('selected');
                console.log(`Selected size ${size}`);
            } else {
                console.log(`Deselected size ${size}`);
            }

            // You can store the selected size in a variable or perform any other necessary actions based on the selected size.
        });

        sizeSelector.appendChild(sizeButton);
    });
}

// Function to get the selected size from the UI
function getSelectedSize() {
    const selectedButton = document.querySelector('#size-selector .selected');
    return selectedButton ? selectedButton.textContent : null;
}

// Function to get the selected color from the UI
function getSelectedColor() {
    // Example implementation, adjust based on your actual UI structure
    const selectedColorInput = document.querySelector('input[name="color"]:checked');
    return selectedColorInput ? selectedColorInput.value : null;
}


// Call the function to populate the product details when the page loads
populateProductDetails();

document.addEventListener('DOMContentLoaded', (event) => {
    // Your code to run after the DOM is fully loaded
});

