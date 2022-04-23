const key = "KS2V3DrQUTMAfsrqnz9XU2S091HuYzrnL0UnFpG7"; //NASA API Key

function getAPOD() {
    //Fetch Astronomy Photo of the Day from API
    const APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${key}`;

    //Typical API Call using ASYNC AWAIT to get Astronomy Photo of the Day
    const getPromise = async () => {
        const response = await fetch(APOD_URL);
        const res = await response.json();
        return res;
    }
    const data = getPromise().then(response => {    
        //Gettings {date, explanation, title, src}
        const host = document.querySelector(".APOD");
        const date = new Date(response.date).toString().split(" ").slice(0,4).join().replaceAll(",", " ")
        host.innerHTML += createAPOD({date: date, explanation: response.explanation, src: response.url, title: response.title});
        console.log(response);
    });
}
function getBodies() {
    //Get data.json for information
    const getPromise = async () => {
        const response = await fetch('https://kenndraws.github.io/Project-3/js/data.json');
        const res = await response.json();
        return res;
    }
    getPromise().then(bodies => {
        //Loop through items in object
        for (const id in bodies) {
            //Easier Handling
            const body = bodies[id];

            //Decide which parent section it will be added too
            var parent = ".Other";
            if (body.title === "Planet") parent = ".Planets";
            else if (body.title === "Moon") parent = ".Moons";
            else if (body.title === "Dwarf Planet") parent = ".Dwarfs";
            else if (body.title === "Asteroid") parent = ".Asteroids";

            //Grab parent then create info element.
            const host = document.querySelector(parent);
            host.innerHTML += createBodyInfoElement(body);
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
                <img src=${info.img} alt=${info.name} "class="body-info-image"  onerror="this.src = './img/default.png'; this.classList.add('image-not-found')" />
                <section class="body-info-text">
                    <h2>${info.title}</h2>
                    <h3>${info.name}</h3>
                    <p><strong>${info.sciName},</strong> 
                        <span> ${(info.description.length > 620 ? info.description.substring(0, 616) + "..." : info.description)}</span>
                    </p>
                </section>
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
            <img src=${info.src} alt=${info.title} "class="photo-day"  onerror="this.src = './img/default.png'; this.classList.add('image-not-found')" />
            <section class="text">
                <section>
                    <h2><span>━</span> ${info.title}</h2>
                    <h3>Astronomy Photo of the Day</h3>
                    <h3 style="opacity: 0.5">${info.date}</h3>
                </section>
                <p>${(info.explanation.length > 620 ? info.explanation.substring(0, 616) + "..." : info.explanation)}</p>
            </section>
        </section>`
    );
}

window.addEventListener('load', main);
function main() {
    getAPOD();
    getBodies();
    setTimeout(function () {
        Array.from(document.getElementsByClassName("paused")).forEach(element => {
            element.classList.remove('paused');
        });
    }, 500);

}