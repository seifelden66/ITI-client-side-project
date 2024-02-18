let heroImg = document.querySelector(".hero-img")
let btn1 = document.querySelector(".b1")
let btn2 = document.querySelector(".b2")
let imgs = [
    "imgs/1.jpg",
    // "imgs/hero2.png",
    "imgs/2.png",
    "imgs/3.png"
]
let index = 0;

if(btn2){
    btn2.addEventListener("click", () => {
        if (index < imgs.length - 1) {
            index++
            heroImg.src = imgs[index]
    
        } else {
            index = 0
            heroImg.src = imgs[index]
    
        }
    })
}
if(btn1){
    btn1.addEventListener("click", () => {
        if (index > 0) {
            index--
            heroImg.src = imgs[index]
        } else {
            index = imgs.length - 1
            heroImg.src = imgs[index]
    
        }
    })
}

//============================================================
//sidebar


const side = document.getElementById('sidebar')

function openSideBar() {
    side.style.right = '0';
}

function closeSidebar() {
    side.style.right = '-350px';
}




// =================================================================
// user data

const userData = JSON.parse(localStorage.getItem('userData'));
const isLogged = document.getElementById('userImage')
const drpdwn = document.getElementById('drpdwn')
let cartItems = document.getElementById('cart')
const token = localStorage.getItem('token');
const login = document.getElementById('login')
const circle = document.querySelector('.num')
const circle2 = document.querySelector('.num2')

function logout() {
    localStorage.clear();
    location.reload()
}


if (token) {
    fetch('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        })
        .then(data => {

            login.style.display = "none"
            isLogged.innerHTML = `
            <img src="${data.image}"></img>
            <i class="fa-solid fa-chevron-down"></i>
    `;
            drpdwn.innerHTML = `
            <a href="profile.html">${data.firstName}</a>
            <a href="#" onclick="logout()">logout</a>
            `

        })
        .catch(error => {
            console.error(error);
        });
} else {
    login.innerHTML = `
    <a href="login.html">sign in</a>
    `
    isLogged.style.display = "block"
    circle.style.display="none"
    circle2.style.display="none"

}



// =================================================================
//favorite

if (token) {
    function addToFavorite(productId) {
        let product = products.find(prod => prod.id === productId);
        let favoite = JSON.parse(localStorage.getItem('favorite')) || [];

        if (favoite.some(item => item.id === productId)) {
            alert('Product is already in the cart');
        } else {
            alert('product added successfully!')
            favoite.push(product);
            localStorage.setItem('favorite', JSON.stringify(favoite));
            displayfavoriteItemCount();
        }
    }

    function getFavorite() {
        return JSON.parse(localStorage.getItem('favorite')) || [];
    }

    function displayfavoriteItemCount() {
        let favorite = getFavorite();
        let favoriteItemCountElement = document.getElementById('cartLen');
        if (favoriteItemCountElement) {
            favoriteItemCountElement.textContent = favorite.length.toString();
        }
    }
    displayfavoriteItemCount();


}
//===============================================================
// cart
if (token) {
    function increaseCartItemQuantity(productId) {
        let product = products.find(prod => prod.id === productId);
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let existingItem = cart.find(item => item.product.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            product.quantity = 1;
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItemCount();
    }

    function decreaseCartItemQuantity(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let itemIndex = cart.findIndex(item => item.product.id === productId);
        if (itemIndex !== -1) {
            let item = cart[itemIndex];
            if (item.quantity > 0 || minQuantity === undefined) {
                item.quantity--;
                localStorage.setItem('cart', JSON.stringify(cart));
                displayCartItemCount2();
            } else {
                removeFromCart2Complete(productId);
            }
        } else {
            alert(`Product with ID ${productId} not found in cart.`);
        }
    }

    function removeFromCartComplete(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let itemIndex = cart.findIndex(item => item.product.id === productId);

        if (itemIndex !== -1) {
            cart.splice(itemIndex, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCartItemCount();
        }
    }

    function getCart() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }

    function displayCartItemCount() {
        let cart = getCart();
        let cartItemCountElement = document.getElementById('cartLen2');
        if (cartItemCountElement) {
            let totalQuantity = cart.reduce((acc, item) => acc + +item.quantity, 0);
            cartItemCountElement.textContent = totalQuantity.toString();            
        }
    }

    displayCartItemCount();
}