
import { API_JACKETS_URL } from "./constants.mjs";

async function getData() {
    try {
    const response = await fetch(API_JACKETS_URL);
    const data = await response.json();
    return data;
 } catch (error) { 
    console.error("error fetching data:", error);
    return [];
  }
}

// Filter buttons

const filterButtons = document.querySelectorAll('.filter-btn');
document.body.addEventListener('click', function(event) {
    if (event.target.classList.contains('filter-btn')) {
        event.preventDefault();
        const genderFilter = event.target.getAttribute('data-gender');
        createProductHTML(genderFilter);
    }
});

async function createProductHTML(genderFilter = 'all') {
    const productSection = document.querySelector('.jackets');

    if (!productSection) {
        console.error("Product section element not found");
        return;
    }

    try {
        const products = await getData(); // Make sure to define the getData function

        productSection.innerHTML = ''; // Clear existing products before adding new ones

        products
            .filter((product) => {
                if (genderFilter !== 'all' && product.gender.toLowerCase() !== genderFilter.toLowerCase()) {
                    return false;
                }
                return true;
            })
            .forEach((product) => {
                const productArticle = document.createElement("article");


// Product image with link
const productLink = document.createElement("a");
productLink.href = `../product.html?id=${product.id}`;
        
const productImage = document.createElement("img");
productImage.src = product.image || 'placeholder-image-url';
productImage.alt = product.title || 'Product Image';
        
productLink.appendChild(productImage);
productArticle.appendChild(productLink);


// Product title
const productTitle = document.createElement("h2");
productTitle.textContent = product.title || 'Product Title';
productArticle.appendChild(productTitle);


// Product price
const productPrice = document.createElement("p");
productPrice.textContent = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price);
productArticle.appendChild(productPrice);


// Size selector
const sizeSelector = document.createElement("div");
sizeSelector.classList.add('size-selector');

// Add size buttons
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
            console.log(`Selected size ${size} for product ${product.id}`);
        } else {
            console.log(`Deselected size ${size} for product ${product.id}`);
        }
    
        // You can store the selected size in a variable or perform any other necessary actions based on the selected size.
    });
    
    
    sizeSelector.appendChild(sizeButton);
});

productArticle.appendChild(sizeSelector);


// Product base color
const productBaseColor = document.createElement("h5");
productBaseColor.textContent = product.baseColor || 'Base Color';
productArticle.appendChild(productBaseColor);


//--------------------
productSection.appendChild(productArticle);
    });
} catch (error) {
console.error("Error creating product HTML:", error);
// Optionally, display an error message to the user here.
}
}

createProductHTML(); // Call the function when the page loads


