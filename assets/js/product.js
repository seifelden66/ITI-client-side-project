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
    console.log(products);
    let cardsContainer = document.querySelector(".cards-container");
    let cards = [];
    for(let i = 0; i < products.length; i++){
        let card = document.createElement("div");
        let image = document.createElement("img");
        let title = document.createElement("h3");
        let cardFooter = document.createElement("div");
        let rateDiv = document.createElement("div");
        let price = document.createElement("span");
        image.src = products[i].images[0];
        title.innerHTML = products[i].title;
        price.innerHTML = "$ " + products[i].price;
        cardFooter.classList.add("card-footer");
        rateDiv.classList.add("rate");
        card.classList.add("card");
        for(let j = 0; j < 5; j++){
            let starSpan = document.createElement("span");
            let starIcon = document.createElement("i");
            if((j + 1) < products[i].rating)
            {
                starIcon.setAttribute("class","fas fa-star");
            }
            else{
                starIcon.setAttribute("class","far fa-star");
            }
            starSpan.appendChild(starIcon);
            rateDiv.appendChild(starSpan);
        }
        cardFooter.append(rateDiv, price);
        card.append(image, title, cardFooter);
        cards.push(card);
    }
    cardsContainer.replaceChildren(...cards);
}
function createCategoriesList() {
    console.log(categories);
    let select = document.querySelector("#categories");
    for(let i = 0; i<categories.length; i++){
        let option = document.createElement("option");
        option.innerHTML = categories[i];
        option.value = categories[i];
        select.append(option);
    }
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
