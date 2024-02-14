let products = [];
let categories = [];
let limit;
async function getAllPrducts() {
    const response = await fetch("https://dummyjson.com/products");
    let data = await response.json();
    products = data.products;
    createProductsCard();
}
async function GetProductsPerPage(currentPage) {
    let skip = limit * (currentPage - 1);
    const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
    let data = await response.json();
    products = data.products;
    createProductsCard();
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
    createProductsCard();
}
async function searchProductName(productName) {
    const response = await fetch(`https://dummyjson.com/products/search?q=${productName}`);
    let data = await response.json();
    products = data.products.filter(p => p.title.toLowerCase().includes(productName.toLowerCase()));
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
    let cardsContainer = document.querySelector(".cards-container");
    let cards = "";
    for(let i = 0; i < products.length; i++){
        let rate = "";
        for(let j = 1; j <= 5; j++){
            rate += `
                <span><i class="${j < products[i].rating ? "fas fa-star" : "far fa-star"}" aria-hidden="true"></i></span>
            `
        }
        cards += `
            <a class="card" href="">
            <img src="${products[i].images[0]}">
            <h3>${products[i].title}</h3>
            <div class="card-footer">
            <div class="rate">${rate}</div>
            <span>$ ${products[i].price}</span>
            </div>
            <button class="cart-icon" onclick="">Add to cart</button>
            </a>
        `;
    }
    cardsContainer.innerHTML = cards;
}
function createCategoriesList() {
    let select = document.querySelector("#categories");
    let options = "";
    for(let i = 0; i<categories.length; i++){
        options += `
            <option value="${categories[i]}">${categories[i]}</option>
        `;
    }
    select.innerHTML += options;
}
function search(){
    var searchInput = document.querySelector("#search");
    if(searchInput.value){
        searchProductName(searchInput.value);
        var productContainer = document.querySelector("#products");
        window.scrollTo(0,productContainer.offsetTop);
    }
}
getAllCategories();
getAllPrducts();
