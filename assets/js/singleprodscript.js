// const token = localStorage.getItem('token');
const id = localStorage.getItem("ProducID")
let products = []
async function getData(){
    const response = await fetch(`https://dummyjson.com/products/${id}`)
    let data = await response.json()
     product = data
     products.push (product)
    singleProduct(product)
}


function singleProduct (product){
let data =""
let container = document.querySelector(".container")
    // let search = cart.find((x)=>x.id === products[id-1].id) || []
    data = `
    <div class="product-card">
    
    <div class="single-prod-cont">
    <a href=""><img class="sing-img" src=${product.images[0]} alt="" ></a>

    <div class = "prod-shap"  >
    <img src=${product.images[0]} >
    <img src=${product.images[1]} >
    <img src=${product.images[2]} >
    <img src=${product.images[3]} >
    </div>



    </div>
    
    <div class="product-add">
    <div class="single-prod-data">
    <h1>${product.title}</h1>
    <h5>brand is: ${product.brand}</h5>
    <h4>Type: ${product.category}</h4>
    <h4>Price :$ ${product.price}</h4>
    <div class= "rate">
    <p>The Rating is : </p>
    <span><i class="fa-solid fa-star"></i></span>
    <h5>${product.rating}/5</h5>
    </div>
    <h6><span>descripton of product:</span>  ${product.description}</h6>
    </div>    
        <div class="product-num">
            <span onclick="decreaseQuantity('p${product.id}-quantity')"><i class="fa-solid fa-minus"></i></span>
            <input type="number" name="quantity" id="p${product.id}-quantity" min="1" max="${product.stock}" value="1" readonly>
            <span onclick="increaseQuantity('p${product.id}-quantity')"><i class="fa-solid fa-plus"></i></span>
        </div>
        
        <div class="add-tocart">
            <button class="btn1"><a href="index.html">Back to Home </a></button>
            <button class="btn2" onclick="${token ? `addToCart(${product.id})` : `alert('please sign in!');`}">Buy Now</button>
            <button class="btn3" onclick="${token ? `addToFavorite(${product.id})` : `alert('please sign in!');`}">Add to Favorite</button>
        </div>
      
    </div>
</div>
    
`





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
