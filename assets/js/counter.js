function increaseQuantity(id){
    let input = document.getElementById(id);
    if(input.value < input.max)
    input.value++;
}
function decreaseQuantity(id){
    let input = document.getElementById(id);
    if(input.value > input.min)
    input.value--;
}
function addToCart(id){
    let cart = localStorage.getItem('cart');
    let quantity = document.querySelector(`#p${product.id}-quantity`).value;
    if(!cart){
        localStorage.setItem("cart",`[{"product": ${JSON.stringify(product)}, "quantity": ${quantity}}]`)
    }
    else{
        let cartItems = JSON.parse(cart);
        let existItemIndex = cartItems.findIndex(item => item.product.id == id);
        if(existItemIndex != undefined && existItemIndex != -1){
            cartItems[existItemIndex].quantity = +cartItems[existItemIndex].quantity + +quantity;
        }
        else{
            cartItems.push({"product": JSON.stringify(product), "quantity": quantity});
        }
        localStorage.setItem("cart",JSON.stringify(cartItems));
    }
    displayCartItemCount();
}