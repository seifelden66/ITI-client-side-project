let products = [];
let categories = [];
let limit = 30;
let total = 0;
let currentPage = 1;
async function getAllPrducts() {
    const response = await fetch("https://dummyjson.com/products");
    let data = await response.json();
    products = data.products;
    total = data.total;
    createProductsCard();
}
async function GetProductsPerPage(currentPage) {
    let skip = limit * (currentPage - 1);
    const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
    let data = await response.json();
    products = data.products;
    createProductsCard();
    var productContainer = document.querySelector("#products");
    window.scroll({
        behavior: "smooth",
        top: productContainer.offsetTop
    });
}
async function getAllCategories() {
    const response = await fetch("https://dummyjson.com/products/categories");
    categories = await response.json();
    createCategoriesList();
}
async function getProductByCategory(category) {
    const response = await fetch(`https://dummyjson.com/products/category/${category}`);
    let data = await response.json();
    products = data.products;
    total = data.total;
    createProductsCard();
}
async function searchProductName(productName) {
    const response = await fetch(`https://dummyjson.com/products/search?q=${productName}`);
    let data = await response.json();
    products = data.products.filter(p => p.title.toLowerCase().includes(productName.toLowerCase()));
    total = data.total;
    createProductsCard();
}
function filterByCategory(category){
    debugger
    if(category){
        getProductByCategory(category);
    }
    else{
        getAllPrducts();
    }
}

function createProductsCard() {
    console.log(products);
    let cardsContainer = document.querySelector(".cards-container");
    let cards = "";
    let owlTheme = document.querySelector(".carousel-container")
    for(let i = 0; i < products.length; i++){
        let rate = "";
    
        for(let j = 1; j <= 5; j++){
            rate += `
                <span><i class="${j < products[i].rating ? "fas fa-star" : "far fa-star"}" aria-hidden="true"></i></span>
            `
        }
        cards += `
        <div class="card">
            <a onclick="saveId(${products[i].id})" href="Single-Prod.html">
                <img src="${products[i].images[0]}">
                <div>
                    <h3>${products[i].title}</h3>
                    <p>${products[i].description}</p>
                    <div class="card-footer">
                    <div class="rate">${rate}</div>
                    <span>$ ${products[i].price}</span>
                    </div>
                </div>
            </a>
            <div class="card-button">
                <div class="counter">
                    <button onclick="decreaseQuantity('p${products[i].id}-quantity')"><i class="fa-solid fa-minus"></i></button>
                    <input type="number" name="quantity" id="p${products[i].id}-quantity" min="1" max="${products[i].stock}" value="1" readonly>
                    <button onclick="increaseQuantity('p${products[i].id}-quantity')"><i class="fa-solid fa-plus"></i></button>
                </div>
                <div>
                    <button onclick="${token ? `addToCart(${products[i].id})` : `alert('please sign in!');`}"><i class="fa-solid fa-cart-shopping"></i></button>
                    <button onclick="${token ? `addToFavorite(${products[i].id})` : `alert('please sign in!');`}"><i class="fa-regular fa-heart"></i></button>
                </div>
            </div>
        </div>
            
        `;
    }
    
    cardsContainer.innerHTML = cards;
    pagenation();

            carouselData = `
            <div class="owl-carousel owl-theme">

            
            <div class="item">
            
            <img src=${products[1].images[0]}>

            <div class="carsule-cont">
            
            <h4> Product Title : ${products[1].title}</h4>
            <h4> Product Category : ${products[1].category}</h4>
            
            </div>

            </div>

            <div class="item">
            
            <img src=${products[2].images[0]}>

            <div class="carsule-cont">
            
            <h4> Product Title : ${products[2].title}</h4>
            <h4> Product Category : ${products[2].category}</h4>
            
            </div>

            </div>

            <div class="item">
            
            <img src=${products[3].images[0]}>

            <div class="carsule-cont">
            
            <h4> Product Title : ${products[3].title}</h4>
            <h4> Product Category : ${products[3].category}</h4>
            
            </div>

            </div>

            <div class="item">
            
            <img src=${products[4].images[0]}>

            <div class="carsule-cont">
            
            <h4> Product Title : ${products[4].title}</h4>
            <h4> Product Category : ${products[4].category}</h4>
            
            </div>

            </div>

            <div class="item">
            
            <img src=${products[5].images[0]}>

            <div class="carsule-cont">
            
            <h4> Product Title : ${products[5].title}</h4>
            <h4> Product Category : ${products[5].category}</h4>
            
            </div>

            </div>





           
        
            </div>
        
            `
        
        owlTheme.innerHTML = carouselData
    
    
            
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:35,
        nav:false,
        autplay:true,
        autplayTimeout:1000,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:3
            }
        }
    })

}
function createCategoriesList() {
    console.log(categories);
    let select = document.querySelector("#categories");
    let options = "";
    for(let i = 0; i<categories.length; i++){
        options += `
            <option value="${categories[i]}">${categories[i]}</option>
        `;
    }
    select.innerHTML += options;
}
let searchInput = document.querySelector("#search");
searchInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.querySelector("#search-btn").click();
  }
});
function search() {
    if (searchInput.value) {
        searchProductName(searchInput.value);
        var productContainer = document.querySelector("#products");
        window.scroll({
            behavior: "smooth",
            top: productContainer.offsetTop
        });
    }
}
// let CardArr =[]
function increaseQuantity(id){
    // let selectedID = id
    // let search = CardArr.find((x)=>x.id === selectedID)
    let input = document.querySelector(`#p${id}-quantity`);
    // if(input.value < input.max && search === undefined){
    //     CardArr.push({
    //         id : selectedID,
    //         item : 1
    //     })
    // }else{
    //         search.item +=1
    // }
    // console.log(CardArr);
    if(input.value < input.max){

        input.value++;
    }
    // localStorage.setItem("prodNum", JSON.stringify(CardArr)) || []
}
function decreaseQuantity(id){
    // let search = CardArr.find((x)=>x.id === id)
    let input = document.querySelector(`#p${id}-quantity`);
    // if(input.value > input.min && search.item === 0 ){
    //     return
    // }else{
    //     search.item -=1
        
    // }



    // console.log(CardArr);
    if(input.value > input.min){

        input.value--;
    }
    // localStorage.setItem("prodNum", JSON.stringify(CardArr)) || []

}
function listView(){
    let cards = document.querySelectorAll(".card");
    for(let i = 0; i < cards.length; i++){
        cards[i].classList.add("card-list-view");
    }
}
function cardView(){
    let cards = document.querySelectorAll(".card");
    for(let i = 0; i < cards.length; i++){
        cards[i].classList.remove("card-list-view");
    }
}
function pagenation(){
    let pagesNumber = total%limit == 0? total/limit : total/limit + 1;
    if(pagesNumber > 1){
        var pagenationCotainer = document.querySelector(".pagenation");
        let pages = "";
        for (let i = 1; i <= pagesNumber; i++) {
            pages += `
                <button onclick="GetProductsPerPage(${i})" class="page">${i}</button>
            `;
        }
        let prev = `<button onclick="prevPage()" class="page control" ${currentPage == 1? "disabled" : ""}><i class="fa-solid fa-angle-left"></i></button>`;
        let next = `<button onclick="nextPage()" class="page control" ${currentPage == pagesNumber? "disabled" : ""}><i class="fa-solid fa-angle-right"></i></button>`;
        pagenationCotainer.innerHTML = prev + pages + next
        console.log(pagenationCotainer);
    }
}
function prevPage(){
    currentPage--;
    GetProductsPerPage(currentPage);
}
function nextPage(){
    currentPage++;
    GetProductsPerPage(currentPage);
}
function saveId(id) {
    localStorage.setItem("ProducID", JSON.stringify(id))

}

getAllCategories();
getAllPrducts();