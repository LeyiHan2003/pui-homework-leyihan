
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


const cart = [];
if (localStorage.getItem('cartStorage') != null) {
    retrieveFromLocalStorage();
  }

function retrieveFromLocalStorage() {
    const cartItemString = localStorage.getItem('cartStorage');
    const cartArray = JSON.parse(cartItemString);
    for (const rollInfo of cartArray) {
      const cartItem = new Roll(rollInfo.type, rollInfo.glazing, rollInfo.size, rollInfo.basePrice); 
      cart.push(cartItem); 
      console.log(cart);
    }
  }

console.log(cart);

var totalPrices = 0;


// function for appending DOM element to cart

function showOnCart(item){
const template = document.querySelector("#cart-item-template");
const clone = template.content.cloneNode(true);
item.element = clone.querySelector(".cart-items");

const cartItemsElement = document.querySelector("#rolls-in-cart");
    cartItemsElement.append(item.element);


 const removeBtn = item.element.querySelector('.remove');
 removeBtn.addEventListener("click", ()=> {removeItem(item)});

 updateElement(item);
 updateTotalCartPrice()
saveToLocalStorage();

}



function updateElement(item){

const rollThumbnail = item.element.querySelector('.thumbnail');
rollThumbnail.src = "../assets/products/" + rolls[item.type]["imageFile"];

const cartRollName = item.element.querySelector('#cart-rollName');
cartRollName.innerText = item.type + ' Cinnamon Roll';

const cartGlazing = item.element.querySelector ('#cart-glazing'); 
cartGlazing.innerText = 'Glazing: ' + item.glazing;

const cartPackSize = item.element.querySelector ('#cart-packsize');
cartPackSize.innerText = 'PackSize: ' + item.size;

const cartRollPrice = item.element.querySelector ('#cart-price1');
cartRollPrice.innerText = '$' + item.totalPrice;


const removeButton = item.element.querySelector ('.remove');
removeButton.innerText = "Remove";
removeButton.addEventListener('click', ()=> {removeItem(item)});

updateTotalCartPrice();

};


function updateTotalCartPrice(){
    const TotalCartPrice = document.querySelector('#total-price');
    let calculatedPrice = 0;
    for (const item of cart){
        let eachPrice = parseFloat(item.totalPrice);
        calculatedPrice += eachPrice;
        }

    TotalCartPrice.innerText = '$' + calculatedPrice.toFixed(2);
    console.log(TotalCartPrice)
}

function removeItem(item){
 cart.splice(cart.indexOf(item), 1);
 item.element.remove();
 updateTotalCartPrice(item);
}

for (const rollItem of cart){
    showOnCart(rollItem); 
    }
    
const badge = document.querySelector("#cart-oval"); 
badge.innerText = cart.length
    
function saveToLocalStorage() {  
    const cartArrayString = JSON.stringify(cart);
  
    localStorage.setItem('CartStorage', cartArrayString);
    console.log(localStorage.getItem('CartStorage')); 
  }



  console.log(cart);