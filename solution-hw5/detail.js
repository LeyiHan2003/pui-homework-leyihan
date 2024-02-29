
const rolls = {
    "Original": {
        "basePrice": 2.49,
        "imageFile": "original-cinnamon-roll.jpg"
    },
    "Apple": {
        "basePrice": 3.49,
        "imageFile": "apple-cinnamon-roll.jpg"
    },
    "Raisin": {
        "basePrice": 2.99,
        "imageFile": "raisin-cinnamon-roll.jpg"
    },
    "Walnut": {
        "basePrice": 3.49,
        "imageFile": "walnut-cinnamon-roll.jpg"
    },
    "Double-Chocolate": {
        "basePrice": 3.99,
        "imageFile": "double-chocolate-cinnamon-roll.jpg"
    },
    "Strawberry": {
        "basePrice": 3.99,
        "imageFile": "strawberry-cinnamon-roll.jpg"
    }    
};


// First, we get the query string from the URL. This is the list of parameters
// that begins with a question mark. (These are known as "search parameters")
const queryString = window.location.search;

console.log(queryString);

// Then, we use the query string to create a URLSearchParams object:
const params = new URLSearchParams(queryString);

console.log(params);

// Finally, we can access the parameter we want using the "get" method:
const rollType = params.get('roll');
console.log(rollType);

/* ------------------------------------------------------------------------- */


// Update the header text
const detailHeader = document.querySelector('#detail-title');

if (rollType == "Original"){
    detailHeader.innerText =  'Original Cinnamon Roll'
}
else{ 
    detailHeader.innerText =  rollType + ' Cinnamon Roll'} 
   

// update base price text
const Price = rolls[rollType].basePrice
const rollPrice = document.querySelector('#price-text');

if (rollType == "Original"){
    rollPrice.innerText =  '$ 2.49'
}
else{ 
    rollPrice.innerText =  '$' + Price} 


// Update the image
const rollImage = document.querySelector('.detail-picture');

if (rollType == "Original"){
    rollImage.src="assets/products/original-cinnamon-roll.jpg"
}
else{ 
    rollImage.src='assets/products/' + rolls[rollType].imageFile} 




