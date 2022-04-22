const getImage = async () => {
    const response = await fetch(`https://images-api.nasa.gov/search?q=${planet.englishName}&description=image%20by%20spacecraft%20`);
    const res = await response.json();
    return res;
}
const data = getImage().then(response => {
    const img = response.collection.items[0];
    const section = document.getElementsByclass("Planets");

    console.log(img.links[0].href)
    const photo = document.createElement("img");
    photo.src = img.links[0].href;
    photo.alt = planet.englishName;

    section[0].appendChild(photo);
});


const key = "KS2V3DrQUTMAfsrqnz9XU2S091HuYzrnL0UnFpG7"; //NASA API Key

function getAPOD() {
    //Fetch Astronomy Photo of the Day from API
    const APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${key}`;

    const getPromise = async () => {
        const response = await fetch(APOD_URL);
        const res = await response.json();
        return res;
    }
    const data = getPromise().then(response => {
        const photo_day = document.querySelector(".photo-day");
        photo_day.src = response.url;
        console.log(response.url);
    });
}
function getBodies(type, parent) {

    const PLANET_URL = `https://api.le-systeme-solaire.net/rest/bodies/`;

    const getPromise = async () => {
        const response = await fetch(PLANET_URL);
        const res = await response.json();

        return res;
    }
    getPromise().then(response => {

        var planets = [];

        response.bodies.map((body) => {
            console.log(body);
            if (body.bodyType === type) {
                const info = {
                    img: `img/${body.englishName.toLowerCase()}.jpg`,
                    title: body.bodyType,
                    name: body.englishName,
                    sciName: body.name,
                    moons: (body.moons ? body.moons.length : 0),
                    isPlanet: body.isPlanet,
                    gravity: body.gravity,
                    avgTemp: body.avgTemp,
                    mass: (body.mass ? body.mass : { massValue: 0 }),
                    around: (body.aroundPlanet ? body.aroundPlanet.planet : ""),
                };
                planets.push();
            }
        });

        planets.map((planet) => {
            //console.log(planet);
            const host = document.querySelector(parent);
            host.innerHTML += createBodyInfoElement(planet);
        });

    });
}
function getBodyDescription(name) {
    const API_DESC = `https://meta.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exlimit=max&explaintext&titles=${name}`;

    const getPromise = async () => {
        const response = await fetch(API_DESC);
        console.log(response);
        const res = await response.json();

        return res;
    }
    getPromise().then(response => {
        console.log(response);
    });
}
function createBodyInfoElement(info) {
    return (
        `<div class="body-info">
            <div class="body-info-main">
                <img src=${info.img} alt=${info.name} class="body-info-image" />
                <div class="body-info-text">
                    <h2>${info.title}</h2>
                    <h3>${info.name}</h3>
                    <p><strong>${info.sciName}</strong> 
                        <span> ${info.desc}
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.                   
                        </span>
                    </p>
                </div>
            </div>
            <div class="body-info-icons">
                ${(info.isPlanet ? `<p>Moons<br/>${info.moons}</p>` : 
                    (info.around ? `<p>Parent<br/>${info.around[0].toUpperCase() + info.around.substring(1)}</p>` : "")
                )}
                <p>Gravity<br/>${info.gravity}</p>
                <p>Mass<br/>${info.mass.massValue.toFixed(2)}</p>
                <p>Temp<br/>${info.avgTemp}</p>
            </div>
        </div>`
    );
}

//getAPOD();

function populateSections(){
    const bodies = [
        {
            bodyTypes: ["Planet"],
            parent: ".Planets"
        },
        {
            bodyTypes: ["Moon"],
            parent: ".Moons"
        },
        {
            bodyTypes: ["Star", "Dwarf Planet", "Comet", "Asteroid"],
            parent: ".Other"
        }]
    for (const body in bodies) {
        console.log(bodies[body])
        for (const type in bodies[body].bodyTypes) {
            getBodies(bodies[body].bodyTypes[type], bodies[body].parent);
        }
    }
}
populateSections();