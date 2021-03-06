//window.addEventListener("load", main);

function main() {
    setTimeout(() => { //Wait for Form to Hide
        $(".user-sign").addClass("hidden");
        $("header").removeClass("hidden");
        $("footer").removeClass("hidden");

        displayClickedMenu();
        getAPOD();
        //getAsteroids();
        getBodies();
        document.querySelectorAll(".paused").forEach(element => {
            element.classList.remove('paused');
        });
    }, 2000)
}

let displayed = true;
function displayMobileMenu() {
    //Get Menu and Menu-Button for Slide Effect

    //If menu slide in or out
    if (displayed) {
        $("#Menu").addClass("slide");
        $("#menu-button").addClass("button-slide");
    }
    else {
        $("#Menu").removeClass("slide");
        $("#menu-button").removeClass("button-slide");
    }
    //Swap menu display true or false
    displayed = !displayed;
}

function displayClickedMenu() {
    //Get Menu Item to add event listeners to each input
    $("#Menu").children("input").each(function () {
        isChecked(this); //Display default checked which is Home
        $(this).change(function () {
            isChecked(this); //Display Checked
            var mq = window.matchMedia("(max-width: 1200px)");
            if (mq.matches) displayMobileMenu(); //If using mobile then slide menu after click
        });
    });

    function isChecked(input) {
        //if input is checked display section corresponding to the button hide rest
        if (input.checked) {
            $("main").children().each(function () {
                if ($(this).attr("class").includes(input.id)) $(this).show();
                else $(this).hide();
            });
        }
    }
}

const key = "KS2V3DrQUTMAfsrqnz9XU2S091HuYzrnL0UnFpG7"; //NASA API Key

function getAPOD() {
    //Fetch Astronomy Photo of the Day from API
    const APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${key}`;

    //Typical API Call using ASYNC AWAIT to get Astronomy Photo of the Day
    $.getJSON(APOD_URL, function (response) {
        const date = new Date(response.date).toString().split(" ").slice(0, 4).join().replaceAll(",", " ")
        $(".APOD").append(createAPOD({ date: date, explanation: response.explanation, src: response.url, title: response.title }));
    });
}
function getAsteroids() {
    //Fetch Astronomy Photo of the Day from API
    const DATE = new Date();
    var dd = String(DATE.getDate()).padStart(2, '0');
    var mm = String(DATE.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = DATE.getFullYear();

    const AST_URL = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${yyyy}-${mm}-${dd}&api_key=${key}`;

    $.getJSON(AST_URL, function (response) {
        const NEAR_OBJ = response.near_earth_objects[Object.keys(response.near_earth_objects)[0]];
        //console.log(NEAR_OBJ);
    });
}
function getBodies() {
    //Get data.json for information
    $.getJSON("https://kenndraws.github.io/Project-3/js/data.json", function (data) {
        for (const id in data) {
            //Easier Handling
            const body = data[id];

            var parent = ".Other";
            if (body.title === "Planet") parent = ".Planets";
            else if (body.title === "Moon") parent = ".Moons";
            else if (body.title === "Dwarf Planet") parent = ".Dwarfs";
            else if (body.title === "Asteroid") parent = ".Asteroids";

            //Grab parent then create info element.
            $(parent).append(createBodyInfoElement(body));
        }
    });
}

function createBodyInfoElement(info) {
    //Returns a string with html representation of element structure
    //Primarily used to not have repetitive code and automate creation.

    //Logic in body-info includes checking to make sure description isn't too big
    //Checking if the body is a planet and if so show the number of moons.
    //if not a planet, check if it is around an object i.e planet show parent.
    //if not then display if it has moons.

    return (
        `<section class="body-info">
            <section class="body-info-main">
                <section class="body-info-text">
                    <h2>${info.name}</h2>
                    <h3>${info.title}</h3>
                    <p>
                        <span> ${(info.description.length > 620 ? info.description.substring(0, 616) + "..." : info.description)}</span>
                    </p>
                </section>
                <img src=${info.img} alt='FILE_NOT_FOUND' "class="body-info-image"  
                    onerror="this.src = './img/default.png'; this.classList.add('image-not-found')" 
                />
            </section>
            <section class="body-info-icons">
                ${(info.isPlanet ? `<p>Moons<br/>${info.moons}</p>` :
            (info.around ? `<p>Parent<br/>${info.around[0].toUpperCase() + info.around.substring(1)}</p>` : `<p>Moons<br/>${info.moons}</p>`)
        )}
                <p>Gravity<br/>${info.gravity}</p>
                <p>Mass<br/>${info.mass.massValue.toFixed(2)} x 10 <sup>${info.mass.massExponent}</sup></p>
                <p>Temp<br/>${info.avgTemp}</p>
            </section>
        </section>`
    );
}

function createAPOD(info) {
    //Returns a string with html representation of element structure

    return (
        `<section class="info">
            <img src=${info.src} alt='FILE_NOT_FOUND' class="photo-day"  
                onerror="this.src = './img/default.png'; this.classList.add('image-not-found')" 
            />
            <section class="text">
                <section>
                    <h2><span>???</span> ${info.title}</h2>
                    <h3>Astronomy Photo of the Day</h3>
                    <h3 style="opacity: 0.5">${info.date}</h3>
                </section>
                <p>${(info.explanation.length > 620 ? info.explanation.substring(0, 616) + "..." : info.explanation)}</p>
            </section>
        </section>`
    );
}
