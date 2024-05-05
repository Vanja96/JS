
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

// -------------------------------

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
        const products = await getData(); 

        productSection.innerHTML = ''; 

        products
            .filter((product) => {
                if (genderFilter !== 'all' && product.gender.toLowerCase() !== genderFilter.toLowerCase()) {
                    return false;
                }
                return true;
            })
            .forEach((product) => {
                const productArticle = document.createElement("article");


// -------------------------------
const productLink = document.createElement("a");
productLink.href = `../product.html?id=${product.id}`;
        
const productImage = document.createElement("img");
productImage.src = product.image || 'placeholder-image-url';
productImage.alt = product.title || 'Product Image';
        
productLink.appendChild(productImage);
productArticle.appendChild(productLink);


// -------------------------------
const productTitle = document.createElement("h2");
productTitle.textContent = product.title || 'Product Title';
productArticle.appendChild(productTitle);


// -------------------------------
const productPrice = document.createElement("p");
productPrice.textContent = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price);
productArticle.appendChild(productPrice);


// -------------------------------
const sizeSelector = document.createElement("div");
sizeSelector.classList.add('size-selector');

// -------------------------------
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
            console.log(`Selected size ${size} for product ${product.id}`);
        } else {
            console.log(`Deselected size ${size} for product ${product.id}`);
        }
    
    
    });
    
    
    sizeSelector.appendChild(sizeButton);
});

productArticle.appendChild(sizeSelector);


// -------------------------------
const productBaseColor = document.createElement("h5");
productBaseColor.textContent = product.baseColor || 'Base Color';
productArticle.appendChild(productBaseColor);


// -------------------------------
productSection.appendChild(productArticle);
    });
} catch (error) {
console.error("Error creating product HTML:", error);

}
}

createProductHTML(); 


