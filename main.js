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
const usernameContainer = document.getElementById('usernameContainer');
const isLogged = document.getElementById('isLoged')

if (userData && userData.username) {
    usernameContainer.textContent = `Hello, ${userData.username}`;
    isLogged.innerHTML = ` logout <i class="fa-solid fa-right-from-bracket"></i>`

} else {
    usernameContainer.textContent = 'Hello user';
    isLogged.innerHTML = ` login <i class="fa-solid fa-right-to-bracket"></i>`
}
