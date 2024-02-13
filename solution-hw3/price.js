
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

const basePrice = 2.49;

let GlazingPriceCurrent = 0;
let PackPriceCurrent = 1;

const selectGlazing = document.querySelector("select#glazing-options");


for (const[glazing,price] of Object.entries(glazingPrice)){
const option = document.createElement("option");
option.textContent = glazing;
option.value = price;
selectGlazing.appendChild(option);
}



const selectPackSize = document.querySelector("select#pack-size-options");

for (const [pack,price] of Object.entries(packPrice)){
    const option = document.createElement("option");
    option.textContent = pack;
    option.value = price;
    selectPackSize.appendChild(option);
}



function glazingChange(element) {
  // get value of selected glazing option

  GlazingPriceCurrent = parseFloat(element.value);
  updatePrice ();

}

function packSizeChange(element){
  // get value of selected packsize option
  PackPriceCurrent = parseFloat(element.value);
  updatePrice  ();
}


function updatePrice (){

const priceFinal = document.querySelector("#price-text")
const totalPrice = (basePrice + GlazingPriceCurrent) * PackPriceCurrent;

priceFinal.textContent = "$" + totalPrice.toFixed(2);
}









