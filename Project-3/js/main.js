window.addEventListener("DOMContentLoaded", main);

function main() {
    displayClickedMenu();
}

let displayed = true;
function displayMobileMenu() {
    const menu = document.querySelector("#Menu");
    const button = document.querySelector("#menu-button");
    const header = document.querySelector("header");
    if (displayed) {
        menu.classList.add('slide');
        button.classList.add('button-slide');
    }
    else {
        menu.classList.remove('slide');
        button.classList.remove('button-slide');
    }
    displayed = !displayed;
}

function displayClickedMenu(){
    const menu = document.querySelector("#Menu");
    Array.from(menu.children).filter(elem => elem.tagName === "INPUT").map(input => {
        isChecked(input);
        input.addEventListener("change", () => {
            isChecked(input);
        });
    });

    function isChecked(input){
        if (input.checked) {
            Array.from(document.querySelector("main").children).map(section => {
                if (section.classList.contains(input.id)) section.style.display = "block";
                else section.style.display = "none";
            });
        }
    }
}