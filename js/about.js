// random background color on fill div on load
let colorNums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'F'];
let index = Math.floor(Math.random() * colorNums.length);
let myColorCode = [];
let myFillDiv = document.querySelector('.fill');

for(let i = 0; i < colorNums.length; i++) {
    myColorCode.push(colorNums[Math.floor(Math.random() * colorNums.length)]);
}

let myColor = `#${myColorCode.slice(0, 6).join("")}`;

window.onload = function () {
    myFillDiv.style.backgroundColor = myColor;
}

// Stop loader
let loader = document.querySelector('.loader');
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.classList.add('loader-hidden');
        loader.addEventListener('transitionend', () => {
            loader.remove();
        })
    }, 1500)
});