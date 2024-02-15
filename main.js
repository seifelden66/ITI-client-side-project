let heroImg = document.querySelector(".hero-img")
let btn1 = document.querySelector(".btn1")
let btn2 = document.querySelector(".btn2")
let imgs = [
    "imgs/1.jpg",
    // "imgs/hero2.png",
    "imgs/2.png",
    "imgs/3.png"
]
let index = 0;


btn2.addEventListener("click", () => {
    if (index < imgs.length - 1) {
        index++
        heroImg.src = imgs[index]

    } else {
        index = 0
        heroImg.src = imgs[index]

    }
})
btn1.addEventListener("click", () => {
    if (index > 0) {
        index--
        heroImg.src = imgs[index]
    } else {
        index = imgs.length - 1
        heroImg.src = imgs[index]

    }
})

// =================================================================
// user data

const userData = JSON.parse(localStorage.getItem('userData'));
const isLogged = document.getElementById('userImage')
const drpdwn = document.getElementById('drpdwn')
let cartItems = document.getElementById('cart')
const token = localStorage.getItem('token');

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    localStorage.removeItem('cart');
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

            isLogged.innerHTML = `
            <img src="${data.image}"></img>
            <i class="fa-solid fa-chevron-down"></i>
    `;
            drpdwn.innerHTML = `
            <a href="#">${data.firstName}</a>
            <a href="#" onclick="logout()">logout</a>
            `

        })
        .catch(error => {
            console.error(error);
        });
} else {
    isLogged.innerHTML = `
        <img src="/imgs/user.png"></img>
        <i class="fa-solid fa-chevron-down"></i>
    `
    drpdwn.innerHTML = `
    <a href="login.html">sign in</a>
    `;
}



// =================================================================
//cart

if (token) {
    function addToCart(productId) {
        let product = products.find(prod => prod.id === productId);
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (cart.some(item => item.id === productId)) {
            alert('Product is already in the cart');
        } else {
            alert('product added successfully!')
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCartItemCount();

        }
    }


    function getCart() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }

    function displayCartItemCount() {
        let cart = getCart();
        let cartItemCountElement = document.getElementById('cartLen');
        if (cartItemCountElement) {
            cartItemCountElement.textContent = cart.length.toString();
            
        }
    }


    displayCartItemCount();
   

}

