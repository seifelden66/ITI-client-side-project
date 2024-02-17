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
    circle.style.display = "none"
    circle2.style.display = "none"

}



// =================================================================
//cart favs

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







if (token) {
    let cart3 = JSON.parse(localStorage.getItem("prodData")) || [];
    let Num = document.querySelector(".num2");
    total()



    function reduce(id) {
        let selectedId = id;
        let search = cart3.find((x) => x.id === selectedId);
        if (search && search.item > 0) {
            search.item -= 1;
            localStorage.setItem("prodData", JSON.stringify(cart3));
            update(selectedId);
        }
    }

    function increase(id) {
        let selectedId = id;
        let search = cart3.find((x) => x.id === selectedId);

        if (search === undefined) {
            cart3.push({
                id: selectedId,
                item: 1
            });
        } else {
            search.item += 1;
        }
        localStorage.setItem("prodData", JSON.stringify(cart3));
        update(selectedId);
    }

    function update(id) {
        let search = cart3.find((x) => x.id === id);
        let value = search ? search.item : 0;
        document.getElementById(id).innerHTML = value;
        total();
        let updatedValue = JSON.parse(localStorage.getItem("updatedValue")) || {};
        updatedValue[id] = value;
        localStorage.setItem('updatedValue', JSON.stringify(updatedValue));
        return value;

    }
 

    // Log the retrieved value


    function total() {
        Num.innerHTML = cart3.map((x) => x.item).reduce((x, y) => x + y, 0);

    }


}