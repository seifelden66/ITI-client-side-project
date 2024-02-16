


let requests = document.getElementById('requests')
let sum = 0;
let sum_items_numbers = 0;
let sum_for_card = 0;
let select = 0
const selected_items_numbers = [];
let arr_cart;
function getCart() {
    arr_cart = JSON.parse(localStorage.getItem('cart')) || [];  
    for(let i = 0 ; i < arr_cart.length ; i++){
        if (arr_cart[i].number_of_items > 0) {
sum_for_card += +arr_cart[i].number_of_items
document.querySelector('.cart .num').innerHTML = sum_for_card

          } 
          else {
            arr_cart[i].number_of_items = '1'
            sum_for_card += +arr_cart[i].number_of_items
document.querySelector('.cart .num').innerHTML = sum_for_card
localStorage.setItem("cart" , JSON.stringify(arr_cart))

          }
    }
}
getCart()
displayItems()

function displayItems(){
    let temp = ``;
    for(let i = 0 ; i < arr_cart.length ; i++)
    {
        temp +=`<div class="request">
        <div class="img">
         <img src="${arr_cart[i].images[0]}">
        </div>
         <div class="details">
             <h4>  ${arr_cart[i].description} 
             </h4>
                 <span class="Stock">In Stock ${arr_cart[i].stock} available</span>
                 <div class="size"> 
                     <span>size</span>
                      <span>: 3x</span>
                 </div>
                 <div class="size"> 
                 <span>brand</span>
                  <span>: ${arr_cart[i].brand}</span>
             </div>
                 <div class="action" >
                    
                 <select onchange="update_item(this)" value="${i}" target="${i}">
                     <option value="" selected>${arr_cart[i].number_of_items}</option>
                     <option value="1">1</option>
                     <option value="2">2</option>
                     <option value="3">3</option>
                     <option value="4">4</option>
                 </select>
                 <button  onclick="delete_item(this)" value="${i}">delete</button>
                 </div>
         </div>
         <div class="price">
             <span> ${arr_cart[i].price} </span><span> $</span>
         </div>
     </div>`;
        requests.innerHTML = temp;
        sum +=arr_cart[i].price;
        document.getElementById('product-price').innerHTML = sum
        document.getElementById('product-number').innerHTML = arr_cart.length    
        
    }
}
 select = document.querySelectorAll('select')

function delete_item(index)
{
    var deletedItem = arr_cart.splice(index.value, 1)
    localStorage.setItem("cart" , JSON.stringify(arr_cart))
    sum = 0
    displayItems()
    cart_display()
}

function cart_display(){
    sum_for_card  = 0
    for(let i = 0 ; i < arr_cart.length ; i++){
    sum_for_card += +arr_cart[i].number_of_items
    document.querySelector('.cart .num').innerHTML = sum_for_card
    
    }
}

function update_item(index)
{
    let value = index.value; // the new selected value
    let value_index = index.getAttribute('target'); //the index of changed value
    arr_cart[value_index].number_of_items = value
    localStorage.setItem("cart" , JSON.stringify(arr_cart))

    cart_display()
    
    }


    

// sum_for_card += +arr_cart[value_index].number_of_items
// // console.log(sum_for_card)
// document.querySelector('.cart .num').innerHTML = sum_for_card




//  kminchelle
// 0lelplR