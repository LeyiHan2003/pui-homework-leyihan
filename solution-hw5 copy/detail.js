
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
const Price = rolls[rollType].basePrice;
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



// price calculation

const glazingPrice = {
    "Keep original": 0,
    "Sugar milk": 0,
    "Vanilla milk": 0.5,
    "Double chocolate":1.5,
};


const packPrice = {
    "1": 1,
    "3":3,
    "6":5,
    "12":10,
};



// create glazing drop down

const selectGlazing = document.querySelector("#glazing-options");

for (const[glazing,price] of Object.entries(glazingPrice)){
const option = document.createElement("option");
option.textContent = glazing;
option.value = price;
selectGlazing.appendChild(option);
}

// create pack size drop down

const selectPackSize = document.querySelector("#pack-size-options");

for (const [pack,price] of Object.entries(packPrice)){
    const option = document.createElement("option");
    option.textContent = pack;
    option.value = price;
    selectPackSize.appendChild(option);
}



function glazingChange(element) {
  // get value of selected glazing option

  GlazingPriceCurrent = parseFloat(element.value);
  glazingOption = element.options[element.selectedIndex].text; 
  updatePrice();

}

function packSizeChange(element){
  // get value of selected packsize option
  PackPriceCurrent = parseFloat(element.value);
  packSizeOption = element.options[element.selectedIndex].text; 
  updatePrice();
}


// update base price
function updatePrice(){
  // set up product base price
  if (rollType == "Original"){
      unitPrice = 2.49
  } 
  else{
      unitPrice = rolls[rollType]["basePrice"]
  }
  const priceFinal = document.querySelector("#price-text")
  const totalPrice = (unitPrice + GlazingPriceCurrent) * PackPriceCurrent;

  priceFinal.textContent = "$" + totalPrice.toFixed(2);
}




// add to cart

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = parseFloat(basePrice);
        let totalPrice = (this.basePrice + glazingPrice[this.glazing])*packPrice[this.size];
        this.totalPrice = totalPrice.toFixed(2);
    }
}

// default values
let GlazingPriceCurrent = 0;
let PackPriceCurrent = 1;
let glazingOption = "Keep original"
let packSizeOption = "1" 
const cart = [];


//get cart information

if (localStorage.getItem("cartStorage")!=null){
    retrieveFromLocalStorage();
}

function retrieveFromLocalStorage(){
    const cartItemString = localStorage.getItem("cartStorage");
    const cartArray = JSON.parse(cartItemString);
    for (const rollInfo of cartArray){
        const cartItem = new Roll (rollInfo.type, rollInfo.glazing, rollInfo.size, rollInfo.basePrice);
        cart.push(cartItem);
    }
}

const badge = document.querySelector("#cart-oval"); 
badge.innerText = cart.length

// add to cart event listener

const addToCartBtn = document.querySelector ("#add-to-cart");
addToCartBtn.addEventListener('click', ()=> {addtoCart()});


function addtoCart(){
    const addedRollType = rollType;
    const addedrollGlazing = glazingOption;
    const addedpackSize = packSizeOption.toString();
    const addedbasePrice = rolls[rollType]["basePrice"];
    const newRoll = new Roll(addedRollType, addedrollGlazing, addedpackSize, addedbasePrice);
    cart.push(newRoll);
    console.log(cart);
    badge.innerText = cart.length

    saveToLocalStorage();
    }

saveToLocalStorage();

function saveToLocalStorage() {  
    const cartItemString = JSON.stringify(cart);
  
    localStorage.setItem('cartStorage', cartItemString);
    console.log(localStorage.getItem('cartStorage')); 
  }
