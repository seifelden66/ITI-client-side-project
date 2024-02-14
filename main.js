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

const token = localStorage.getItem('token');
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
            console.log(token)

            isLogged.innerHTML = `
            <img src="${data.image}"></img>
            <i class="fa-solid fa-chevron-down"></i>
    `;
            drpdwn.innerHTML = `
            <a href="#">${data.firstName}</a>
            <a href="#">logout</a>
            `
        })
        .catch(error => {
            console.error(error);
        });
} else {
    console.log(`hello ${token}`)

    isLogged.innerHTML = `
        <img src="/imgs/user.png"></img>
        <i class="fa-solid fa-chevron-down"></i>
    `
    drpdwn.innerHTML = `
    <a href="#">sign in</a>
    `;
}