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
function filterByCategory(category) {
    debugger
    if (category) {
        getProductByCategory(category);
    }
    else {
        getAllPrducts();
    }
}
function createProductsCard() {
    console.log(products);
    let cardsContainer = document.querySelector(".cards-container");
    let cards = "";
    let owlTheme = document.querySelector(".carousel-container")
    for (let i = 0; i < products.length; i++) {
        let rate = "";

        for (let j = 1; j <= 5; j++) {
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
                    <button onclick="${token ? `removeFromCart2(${products[i].id})` : `alert('please sign in!');`}"><i class="fa-solid fa-minus"></i></button>
                    <button onclick="${token ? `addToCart2(${products[i].id})` : `alert('please sign in!');`}"><i class="fa-solid fa-plus"></i></button>
                </div>
                <div>
                    <button onclick="${token ? `addToCart(${products[i].id})` : `alert('please sign in!');`}"><i class="fa-regular fa-heart"></i></button>
                </div>
            </div>
        </div>
            
        `;
    }

    cardsContainer.innerHTML = cards;


    carouselData = `
            <div class="owl-carousel owl-theme">
            <div class="item">            
            <img src=${products[1].images[0]}>

            
            <div class ="carsule-cont">
            <h4> prod title:${products[1].title}</h4>
            <h4> prod category: ${products[1].category}</h4>
            <h4> prod rating:<span><i class="fa-solid fa-star star"></i></span>  ${products[1].rating} /5 </h4>
            </div>


            </div>


       
            <div class="item">            
            <img src=${products[2].images[0]}>


            <div class ="carsule-cont">
            <h4> prod title:${products[2].title}</h4>
            <h4> prod category: ${products[2].category}</h4>
            <h4> prod rating:<span><i class="fa-solid fa-star star"></i></span>  ${products[2].rating} /5 </h4>
            </div>


            </div>


       
            <div class="item">            
            <img src=${products[3].images[0]}>


            <div class ="carsule-cont">
            <h4> prod title:${products[3].title}</h4>
            <h4> prod category: ${products[3].category}</h4>
            <h4> prod rating:<span><i class="fa-solid fa-star star"></i></span>  ${products[3].rating} /5 </h4>
            </div>


            </div>


       
            <div class="item">            
            <img src=${products[4].images[0]}>


            <div class ="carsule-cont">
            <h4> prod title:${products[4].title}</h4>
            <h4> prod category: ${products[4].category}</h4>
            <h4> prod rating:<span><i class="fa-solid fa-star star"></i></span>  ${products[4].rating} /5 </h4>
            </div>


            </div>


       
            <div class="item">            
            <img src=${products[5].images[0]}>


            <div class ="carsule-cont">
            <h4> prod title:${products[5].title}</h4>
            <h4> prod category: ${products[5].category}</h4>
            <h4> prod rating:<span><i class="fa-solid fa-star star"></i></span>  ${products[5].rating} /5 </h4>
            </div>


            </div>


       
            </div>
        
            `

    owlTheme.innerHTML = carouselData



    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 35,
        nav: false,
        autplay: true,
        autplayTimeout: 1000,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    })

}
function createCategoriesList() {
    console.log(categories);
    let select = document.querySelector("#categories");
    let options = "";
    for (let i = 0; i < categories.length; i++) {
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
function increaseQuantity(id){
    let input = document.querySelector(`#p${id}-quantity`);
    if(input.value < input.max)
    input.value++;
}
function decreaseQuantity(id){
    let input = document.querySelector(`#p${id}-quantity`);
    if(input.value > input.min)
    input.value--;
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
function saveId(id) {
    localStorage.setItem("ProducID", JSON.stringify(id))

}

getAllCategories();
getAllPrducts();
