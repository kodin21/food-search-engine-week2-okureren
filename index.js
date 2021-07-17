import Fuse from 'fuse.js';

let titleDom = document.querySelector(".usTitle");
let foodTitleDom = document.querySelector(".fTitle");
let cardDom = document.querySelector("#card");
let searchInput = document.getElementById("searchInput");



fetch("https://jsonplaceholder.typicode.com/users/1")
    .then((response) => response.json()).then(userData => {
        titleDom.innerText = `Merhaba ${userData.name}, Hoşgeldin!`
    })

let timeout;
searchInput.addEventListener("keydown", function (event) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then((response) => response.json())
            .then(data => {
                const fuse = new Fuse(data, { keys: ['title'] });
                const results = fuse.search(event.target.value);
                results.forEach(elementresult => {
                    // console.log(elementresult.item.title);
                    const newDiv = document.createElement('div')
                    newDiv.classList.add("col-5", "text-center", "mt-5",);
                    const newE = document.createElement('h5');
                    newE.classList.add("text-center")
                    const buttonFav = document.createElement('button')
                    buttonFav.classList.add("text-center")

                    newE.innerHTML = elementresult.item['title'];
                    buttonFav.innerHTML = "Favorile"
                    cardDom.append(newDiv);
                    newDiv.appendChild(newE)
                    newDiv.appendChild(buttonFav)

                })
            });
    }, 800);

})



