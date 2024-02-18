
var built = [{
    brand: "Royal_Mirage",
    category: "fragrances",
    description: "Royal_Mirage Sport Brown Perfume for Men & Women - 120ml",
    discountPercentage: 15.66,
    id: 12,
price : 20,
quantity : 2,
title : 'title1',
stock : 'stock1',
img: 'imgs/1.jpg'
},

{
    brand: "Royal2",
    category: "fragrances2",
    description: "Royal_Mirage 2",
    discountPercentage: 2,
    id: 2,
price : 10,
quantity : 2,
title : 'title2',
stock : 'stock2',
img: 'imgs/2.png'
}
]

let requests = document.getElementById('requests')
let summaryhead = document.querySelector('.summary h4 span')
let summarynum = document.querySelector('.summary h4')
let sum = 0;
let sum_items_numbers = 0;
let sum_for_card = 0;
let select = 0
let total_price_for_item_container = 0
let total_num_for_item_container = 0
const selected_items_numbers = [];
let arr_cart;
function getCart() {
    // arr_cart = JSON.stringify(localStorage.setItem('cart' , built)) || [];  
    arr_cart = localStorage.setItem("cart" , JSON.stringify(built))
     arr_cart = JSON.parse(localStorage.getItem('cart'));  

// console.log(arr_cart)

        // arr_cart = JSON.parse(localStorage.getItem('cart')) || [];  
        // console.log(arr_cart)
        for(let i = 0 ; i < arr_cart.length ; i++){
        if (arr_cart[i].quantity) {
        sum_for_card += +arr_cart[i].quantity
        document.querySelector('.cart .num2').innerHTML = sum_for_card
          } 
//           else {
//             arr_cart[i].quantity = '1'
//             sum_for_card += +arr_cart[i].quantity
// document.querySelector('.cart .num').innerHTML = sum_for_card
// localStorage.setItem("cart" , JSON.stringify(arr_cart))

//           }
    }
    cart_display()
}
getCart()
displayItems()

function displayItems(){
    let temp = ``;
    for(let i = 0 ; i < arr_cart.length ; i++)
    {
        // alert(arr_cart.length)
        console.log(arr_cart[i].title)
        temp +=`<div class="request">
        <div class="img">
         <img src="${arr_cart[i].img}"> 
        </div>
         <div class="details">
             <h4>  ${arr_cart[i].title} ...
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
                     <option value="" selected> ${arr_cart[i].quantity} </option>
                     <option value="1">1</option>
                     <option value="2">2</option>
                     <option value="3">3</option>
                     <option value="4">4</option>
                     <option value="5">5</option>
                     <option value="6">6</option>
                     <option value="7">7</option>
                     <option value="8">8</option>
                     <option value="9">9</option>
                     <option value="10">10</option>
                     <option value="10">10</option>
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
        // document.getElementById('product-price').innerHTML = sum
        document.querySelector('.summary h4 span.price').innerHTML = sum
        document.querySelector('.summary .sub-total span.num').innerHTML = arr_cart.length 
        document.getElementById('product-number').innerHTML = arr_cart.length  

         total_price_for_item =  arr_cart[i].quantity * arr_cart[i].price
          total_price_for_item = parseInt(total_price_for_item);
            // total_price_for_item = parseInt(total_price_for_item);
            total_price_for_item_container  += total_price_for_item
        document.querySelector('.summary .total span.price').innerHTML = total_price_for_item_container 
        cart_display()
    }
}
 select = document.querySelectorAll('select')
function delete_item(index)
{
    var deletedItem = arr_cart.splice(index.value, 1)
    localStorage.setItem("cart2" , JSON.stringify(arr_cart))
    sum = 0
    displayItems()
    cart_display()
}

function cart_display(){
    sum_for_card  = 0
    total_price_for_item_container = 0
    total_num_for_item_container = 0
    for(let i = 0 ; i < arr_cart.length ; i++){
    sum_for_card += +arr_cart[i].quantity
    document.querySelector('.cart .num2').innerHTML = sum_for_card
    total_price_for_item =  arr_cart[i].quantity * arr_cart[i].price
    total_price_for_item = parseInt(total_price_for_item);
      total_price_for_item_container  += total_price_for_item
//   document.querySelector('.summary .sub-total span.num').innerHTML = total_price_for_item_container 
  document.querySelector('.summary .sub-total span.num').innerHTML = arr_cart.length

  total_num_for_item =  arr_cart[i].quantity
  total_num_for_item = parseInt(total_num_for_item);
  total_num_for_item_container  += total_num_for_item
//   console.log(total_num_for_item_container)
  document.querySelector('.total span.num').innerHTML = total_num_for_item_container 
  document.querySelector('.total span.price').innerHTML = total_price_for_item_container 
  document.getElementById('product-price').innerHTML = total_price_for_item_container
    localStorage.setItem("cart" , JSON.stringify(arr_cart))
    }
    total_price_for_item_container = 0
    total_num_for_item_container = 0
    
}

function update_item(index)
{
    let value = index.value; // the new selected value
    let value_index = index.getAttribute('target'); //the index of changed value
    arr_cart[value_index].quantity = value    
    cart_display()
    }


    






//  kminchelle
// 0lelplR