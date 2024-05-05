// -------------------------------
import { API_JACKETS_URL } from "./constants.mjs";

// -------------------------------
function getProductIdFromUrl() {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get('id');
}

// -------------------------------
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

// -------------------------------
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

            // -------------------------------
            sizeSelector.querySelectorAll('button').forEach(button => {
                button.classList.remove('selected');
            });

            // -------------------------------
            if (!isSelected) {
                sizeButton.classList.add('selected');
                console.log(`Selected size ${size}`);
            } else {
                console.log(`Deselected size ${size}`);
            }

           // -------------------------------
        });

        sizeSelector.appendChild(sizeButton);
    });

   // -------------------------------
    const addToCartButton = document.getElementById('add-to-cart');
    addToCartButton.addEventListener('click', addToCart);

    function addToCart() {
        const selectedSize = getSelectedSize();

        if (!selectedSize) {
            console.log('Please select a size before adding to cart');
            return;
        }

        // -------------------------------
        const product = {
            id: getProductIdFromUrl(),
            size: selectedSize,
            
        };

    
    }
}

// -------------------------------
function getSelectedSize() {
    const selectedButton = document.querySelector('#size-selector .selected');
    return selectedButton ? selectedButton.textContent : null;
}



// -------------------------------
populateProductDetails();

document.addEventListener('DOMContentLoaded', (event) => {
   // -------------------------------
});
