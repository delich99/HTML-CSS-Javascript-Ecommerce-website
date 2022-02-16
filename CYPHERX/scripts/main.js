"use strict";

//Open/Close cart

var cartIcon = document.querySelector('#cart-icon');
var cart = document.querySelector('.cart');
var closeCart = document.querySelector('#close-cart');

cartIcon.onclick = () => {
    console.debug("Hello?");
    cart.classList.add("active");
};
closeCart.onclick = () => {
    cart.classList.remove("active");
};

if (document.readyState == 'loading') {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready(){
    //removing from cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    for (var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    //Quantity Changes
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener('click', quantityChanged);
    }
    //Add to Cart
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }
    //buying button
    document
        .getElementsByClassName("btn-buy")[0]
        .addEventListener("click", buyButtonClicked);
}

//Buy button
function buyButtonClicked(){
    var cartContent = document.getElementsByClassName("cart-content")[0];
    if (!cartContent == null){
    if (cartContent.hasChildNodes()){
    alert('Your order is placed.');
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
    }else{
        alert('Your cart is empty.');
    }}else{
        alert('Your cart is empty.');
    }
}

//Removes items from cart
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

function quantityChanged(event){
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateTotal();
}

function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-image')[0].src;

    addProductToCart(title, price, productImg);
    updateTotal();
}

//Adding products to cart
function addProductToCart(title, price, productImg){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add('item-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];

    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (var i = 0; i < cartItemsNames.length; i++){

        if (cartItemsNames[i].innerText == title){
            alert('You have already added this item to cart.');
            return;
        }
    }
            var cartBoxContent = `
                <img src="${productImg}" alt="" class="cart-img">
                <div class="detail-box">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">${price}</div>
                <input type="number" value="1" class="cart-quantity">
                </div>                            
                <!-- Remove from cart button -->
                <i class='bx bxs-trash-alt cart-remove'></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox
        .getElementsByClassName('cart-remove')[0]
        .addEventListener('click', removeCartItem);
    cartShopBox
        .getElementsByClassName('cart-quantity')[0]
        .addEventListener('change', quantityChanged);
}
//Updating total price

function updateTotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var itemBoxes = document.getElementsByClassName("item-box");
    var total = 0;
    for (var i = 0; i < itemBoxes.length; i++){
        var cartBox = itemBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
        // If price contains cent value
        
        total = Math.round(total * 100) / 100;
        document.getElementsByClassName("total-price")[0].innerText = '$' + total;
    
}

