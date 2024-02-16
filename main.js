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
//===============================================================
// cart 2
if (token) {
    function addToCart2(productId) {
        let product = products.find(prod => prod.id === productId);
        let cart = JSON.parse(localStorage.getItem('cart2')) || [];
        let existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            product.quantity = 1;
            cart.push(product);
        }

        localStorage.setItem('cart2', JSON.stringify(cart));
        displayCartItemCount2();
    }
    function removeFromCart2(productId) {
        let cart = JSON.parse(localStorage.getItem('cart2')) || [];
        let itemIndex = cart.findIndex(item => item.id === productId);
        if (itemIndex !== -1) {
            let item = cart[itemIndex];
            if (item.quantity > 0 || minQuantity === undefined) {
                item.quantity--;
                localStorage.setItem('cart2', JSON.stringify(cart));
                displayCartItemCount2();
            } else {
                removeFromCart2Complete(productId);
            }
        } else {
            alert(`Product with ID ${productId} not found in cart.`);
        }
    }

    function removeFromCart2Complete(productId) {
        let cart = JSON.parse(localStorage.getItem('cart2')) || [];
        let itemIndex = cart.findIndex(item => item.id === productId);

        if (itemIndex !== -1) {
            cart.splice(itemIndex, 1);
            localStorage.setItem('cart2', JSON.stringify(cart));
            displayCartItemCount2();
        }
    }


    function getCart2() {
        return JSON.parse(localStorage.getItem('cart2')) || [];
    }

    function displayCartItemCount2() {
        let cart = getCart2();
        let cartItemCountElement = document.getElementById('cartLen2');
        if (cartItemCountElement) {
            let totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
            cartItemCountElement.textContent = totalQuantity.toString();
            
        }
    }



    displayCartItemCount2();
}

