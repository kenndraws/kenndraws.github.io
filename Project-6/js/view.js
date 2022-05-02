function main() {
    setTimeout(() => { //Wait for Form to Hide
        $(".user-sign").hide();
        $("header").show();
        $("footer").show();

        displayClickedMenu();
        displayStyleButtons();
        visit_actions();

        if (!dataLoaded) {
            getAPOD();
            //getAsteroids();
            getBodies();
            dataLoaded = !dataLoaded;
        }

        document.querySelectorAll(".paused").forEach(element => {
            element.classList.remove('paused');
        });
    }, 1000)

    renderTable(".Visiters", people);
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
                    <h2><span>━</span> ${info.title}</h2>
                    <h3>Astronomy Photo of the Day</h3>
                    <h3 style="opacity: 0.5">${info.date}</h3>
                </section>
                <p>${(info.explanation.length > 620 ? info.explanation.substring(0, 616) + "..." : info.explanation)}</p>
            </section>
        </section>`
    );
}




function renderTable(containerId, visitors) {
    $(containerId).empty();
    //Table Header
    $(containerId).append(`<section class="log_header">
        <p>Name</p>
        <p>Address</p>
        <p>Phone</p>
        <p>Email</p>
        <p style="display: none">ID</p>
        <p class="visitor_action">Actions</p>
    </section>`);

    //Render List
    for (const id in visitors) {
        const name = visitors[id].fullName.toString()
        const row = `<section id="id-${visitors[id].id}">
            <p>
                <span class="visitor-name-icon" style="background: ${getHSL()}">${name[0]}</span> 
                ${name}
            </p>
            <p>${visitors[id].fullAddress}</p>
            <p>${visitors[id].cell}</p>
            <a class="visitor_email_button" href="mailto:${visitors[id].email}">
                <span>${visitors[id].email}</span>
                <i class="fa-solid fa-envelope button-1"></i>
            </a>
            <p style="display: none" >${visitors[id].id}</p>
            <section class="visitor_action">
                <i class="fa-solid fa-pen-to-square visit-edit"></i>
                <i class="fa-solid fa-trash-can visit-delete"></i>    
            </section>
        </section>`
        $(containerId).append(row);
    }

    //Show Visiter Length
    $(".Visits .log_info span").text(visitors.length);
}

function switchTheme() {
    const styles = document.querySelector('.lightModeCSS');
    if (lightMode) styles.href = "css/lightMode.css";
    else styles.href = "";
    lightMode = !lightMode;
}

function showForm() {
    $("header").hide();
    $("footer").hide();

    $("main").children("section").each(function () {
        $(this).hide();
    });

    $(".user-sign").show();
}