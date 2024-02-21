let requests = document.getElementById('requests')
let sum = 0;
let sum_for_card = 0;
let select = 0
let total_price_for_item_container = 0
let total_num_for_item_container = 0
let arr_cart;
let arr_fav ;
function getCart() {
        arr_cart = JSON.parse(localStorage.getItem('cart')) || [];  
        for(let i = 0 ; i < arr_cart.length ; i++){
        sum_for_card += +arr_cart[i].quantity
        document.querySelector('.cart .num2').innerHTML = sum_for_card
        total_num_for_item =  arr_cart[i].quantity
        total_num_for_item = parseInt(total_num_for_item);
        total_num_for_item_container  += total_num_for_item
        document.querySelector('.total span.num').innerHTML = total_num_for_item_container 
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
         <img src="${arr_cart[i].product.images[0]}"> 
        </div>
         <div class="details">
             <h4>  ${arr_cart[i].product.description}
             </h4>
                 <span class="Stock">In Stock ${arr_cart[i].product.stock} available</span>
                 <div class="size"> 
                     <span>rating</span>
                      <span>: ${arr_cart[i].product.rating}</span>
                 </div>
                 <div class="size"> 
                 <span>brand</span>
                  <span>: ${arr_cart[i].product.brand}</span>
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
                     
                 </select>
                 
                 <button  onclick="delete_item(this)" value="${i}">delete</button>
                 </div>
         </div>
         <div class="price">
             <span> ${arr_cart[i].product.price} </span><span> EGP</span>
         </div>
     </div>`;
        requests.innerHTML = temp;
        document.querySelector('.summary .sub-total span.num').innerHTML = arr_cart.length 
        document.getElementById('product-number').innerHTML = arr_cart.length  
         total_price_for_item =  arr_cart[i].quantity * arr_cart[i].product.price
          total_price_for_item = parseInt(total_price_for_item);
            total_price_for_item = parseInt(total_price_for_item);
            total_price_for_item_container  += total_price_for_item
        document.querySelector('.summary .total span.price').innerHTML = total_price_for_item_container 
        document.getElementById('product-price').innerHTML = total_price_for_item_container
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
    if(index.value == 0)
    {
        window.location.reload();
    }
}

function cart_display(){
    sum_for_card  = 0
    total_price_for_item_container = 0
    total_num_for_item_container = 0
    for(let i = 0 ; i < arr_cart.length ; i++){
    sum_for_card += +arr_cart[i].quantity
    document.querySelector('.cart .num2').innerHTML = sum_for_card
    total_price_for_item =  arr_cart[i].quantity * arr_cart[i].product.price
    total_price_for_item = parseInt(total_price_for_item);
      total_price_for_item_container  += total_price_for_item
  document.querySelector('.summary .sub-total span.num').innerHTML = arr_cart.length 

  total_num_for_item =  arr_cart[i].quantity
  total_num_for_item = parseInt(total_num_for_item);
  total_num_for_item_container  += total_num_for_item
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


function getFav() {
     arr_fav = JSON.parse(localStorage.getItem('favorite'));  

            document.querySelector('.cart .num').innerHTML = arr_fav.length
          } 
          getFav()





          async function fetchDate(){
            let response = await fetch('https://dummyjson.com/products/1');
            let data = await response.json();
            // return data
                console.log(data)
          }

          fetchDate();


        //  kminchelle
       // 0lelplR
          