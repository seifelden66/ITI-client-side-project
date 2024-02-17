// const token = localStorage.getItem('token');
const id = localStorage.getItem("ProducID")
async function getData(){
    const response = await fetch(`https://dummyjson.com/products`)
    let data = await response.json()
     products = data.products
    singleProduct(products)
    console.log(products);
}


function singleProduct (products){
let data =""
let container = document.querySelector(".container")
for(let i =0 ; i<products.length ; i++){
    // let search = cart.find((x)=>x.id === products[id-1].id) || []
    data = `
    <div class="product-card">
    
    <div class="single-prod-cont">
    <a href=""><img class="sing-img" src=${products[id-1].images[0]} alt="" ></a>

    <div class = "prod-shap"  >
    <img src=${products[id-1].images[0]} >
    <img src=${products[id-1].images[1]} >
    <img src=${products[id-1].images[2]} >
    <img src=${products[id-1].images[3]} >
    </div>



    </div>
    
    <div class="product-add">
    <div class="single-prod-data">
    <h1>${products[id-1].title}</h1>
    <h5>brand is: ${products[id-1].brand}</h5>
    <h4>Type: ${products[id-1].category}</h4>
    <h4>Price :$ ${products[id-1].price}</h4>
    <div class= "rate">
    <p>The Rating is : </p>
    <span><i class="fa-solid fa-star"></i></span>
    <h5>${products[id-1].rating}/5</h5>
    </div>
    <h6><span>descripton of product:</span>  ${products[id-1].description}</h6>
    </div>    
        <div class="product-num">
            <span onclick="decreaseQuantity('p${products[i].id}-quantity')"><i class="fa-solid fa-minus"></i></span>
            <input type="number" name="quantity" id="p${products[i].id}-quantity" min="1" max="${products[i].stock}" value="1" readonly>
            <span onclick="increaseQuantity('p${products[i].id}-quantity')"><i class="fa-solid fa-plus"></i></span>
        </div>
        
        <div class="add-tocart">
            <button class="btn1"><a href="index.html">Back to Home </a></button>
            <button class="btn2" onclick="${token ? `addToCart(${products[i].id})` : `alert('please sign in!');`}">Buy Now</button>
            <button class="btn3" onclick="${token ? `addToFavorite(${products[i].id})` : `alert('please sign in!');`}">Add to Favorite</button>
        </div>
      
    </div>
</div>
    
`



}

container.innerHTML = data
let prodShap = document.querySelector(".prod-shap")
let singImg = document.querySelector(".sing-img")
 
prodShap.addEventListener("click",(e)=>{
    // console.log(e.target.src);

    if (e.target.src == undefined){
        singImg.src = singImg.src

    }else{
        
        singImg.src = e.target.src
    }
    


})


let btn1 = document.querySelector(".btn1")
let btn2 = document.querySelector(".btn2")
let BuyNow = document.querySelector(".BuyNow")
let close = document.querySelector(".closee")
btn2.addEventListener("click",()=>{
    BuyNow.classList.replace("hiden","show")    
    // alert("dsfad")
    close.addEventListener("click",()=>{
        BuyNow.classList.replace("show","hiden")

    })

})


}

getData()
let singleImag = document.querySelector(".sing-img")

//  cart =JSON.parse(localStorage.getItem("prodData")) || []
//let cart = JSON.parse(localStorage.getItem("prodData")) || []

// function minus(id){
//     // let search = products.map()
//     selctedid = id
//     let search = cart.find((x)=> x.id === selctedid)

//     if(search.item === 0){
//         return

//     }else{
//         search.item -=1
//     }
//     // console.log(cart);
//     localStorage.setItem("prodData",JSON.stringify(cart))

//     update(selctedid)
    
// }

// function Plus (id){
//     selectedid = id
//     let search = cart.find((x)=> x.id === selectedid)
    
//     if (search === undefined){
//         cart.push({
//             id : selectedid,
//             item :1
//         })
//     }else{
//         search.item +=1
//     }
//     localStorage.setItem("prodData",JSON.stringify(cart))
//     // console.log(cart);
//     update(selectedid)

// }

// function update (id){
//     let search = cart.find((x)=>x.id === id)
//     document.getElementById(id).innerHTML = search.item    

//     total(id)
// }

// function total(id){
//     selectedid = id

//     let Num = document.querySelector(".num")
//     Num.innerHTML = cart.map((x)=>x.item).reduce((x,y)=>x+y,0)
// }

// const side = document.getElementById('sidebar')

// function openSideBar (){
//     side.style.right = '0';
// }

// function closeSidebar() {
//     side.style.right = '-350px';
// }



/** 
const response = [{id:432,name:"Iphone"},{id:4332,name:"LAPTOP"}]


localStorage = 4332
ID =4332

products[id]



*/