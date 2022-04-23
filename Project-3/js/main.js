window.addEventListener("DOMContentLoaded", main);

function main() {
    displayClickedMenu();
}

let displayed = true;
function displayMobileMenu() {
    //Get Menu and Menu-Button for Slide Effect
    const menu = document.querySelector("#Menu"); 
    const button = document.querySelector("#menu-button");

    //If menu slide in or out
    if (displayed) {
        menu.classList.add('slide');
        button.classList.add('button-slide');
    }
    else {
        menu.classList.remove('slide');
        button.classList.remove('button-slide');
    }
    //Swap menu display true or false
    displayed = !displayed;
}

function displayClickedMenu() {
    //Get Menu Item to add event listeners to each input
    const menu = document.querySelector("#Menu");
    //Loop through children who are input type
    Array.from(menu.children).filter(elem => elem.tagName === "INPUT").forEach(input => {
        isChecked(input); //Display default checked which is Home
        input.addEventListener("change", () => {
            isChecked(input); //Display Checked
            var mq = window.matchMedia("(max-width: 1200px)");
            if (mq.matches) displayMobileMenu(); //If using mobile then slide menu after click
        });
    });

    function isChecked(input) {
        //if input is checked display section corresponding to the button hide rest
        if (input.checked) { 
            Array.from(document.querySelector("main").children).forEach(section => {
                if (section.classList.contains(input.id)) section.style.display = "";
                else section.style.display = "none";
            });
        }
    }
}