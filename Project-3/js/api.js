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
function getBodies() {
    const getPromise = async () => {
        const response = await fetch('./js/data.json');
        const res = await response.json();
        return res;
    }
    getPromise().then(bodies => {
        for (const id in bodies) {
            const body = bodies[id];

            var parent = ".Other";
            if (body.title === "Planet") parent = ".Planets";
            else if (body.title === "Moon") parent = ".Moons";
            else if (body.title === "Dwarf Planet") parent = ".Dwarfs";
            else if (body.title === "Asteroid") parent = ".Asteroids";

            const host = document.querySelector(parent);
            host.innerHTML += createBodyInfoElement(body);
        }
    });
}

function createBodyInfoElement(info) {
    return (
        `<div class="body-info">
            <div class="body-info-main">
                <img src=${info.img} alt=${info.name} onerror="this.onerror=null; this.src='./img/default.jpg'"class="body-info-image" />
                <div class="body-info-text">
                    <h2>${info.title}</h2>
                    <h3>${info.name}</h3>
                    <p><strong>${info.sciName},</strong> 
                        <span> ${(info.description.length > 620 ? info.description.substring(0,616) + "..." : info.description)}</span>
                    </p>
                </div>
            </div>
            <div class="body-info-icons">
                ${(info.isPlanet ? `<p>Moons<br/>${info.moons}</p>` :
            (info.around ? `<p>Parent<br/>${info.around[0].toUpperCase() + info.around.substring(1)}</p>` : `<p>Moons<br/>${info.moons}</p>`)
        )}
                <p>Gravity<br/>${info.gravity}</p>
                <p>Mass<br/>${info.mass.massValue.toFixed(2)} x 10 <sup>${info.mass.massExponent}</sup></p>
                <p>Temp<br/>${info.avgTemp}</p>
            </div>
        </div>`
    );
}
getAPOD();
getBodies();