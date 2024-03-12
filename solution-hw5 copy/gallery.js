// setup badge

const badge = document.querySelector("#cart-oval"); 

if (localStorage.getItem('cartStorage') != null) {
    getCartSize();
  }
else {badge.innerText = 0}; 

function getCartSize() {
    const cartString = localStorage.getItem('cartStorage');
    const cartArray = JSON.parse(cartString);
    
    badge.innerText = cartArray.length; 
  }