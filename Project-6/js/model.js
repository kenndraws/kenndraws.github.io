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

            //Grab parent then create info element.
            $(parent).append(createBodyInfoElement(body));
        }
    });
}

function getColor() { //make random color
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const result = randomColor.match(/.{1,2}/g) || []; //Making sure colors are pleasing 

    if(randomColor === "000000" || randomColor === "ffffff" || randomColor.length < 6 || !result.includes("60")){
        //No white, black, ugly, or invalid color
        return getColor();
    }
    console.log(result)
    return randomColor;
}

class Visitor {
    constructor(id, firstName, lastName, address, city, state, zip, cell, email, find, comments) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.cell = cell;
        this.email = email;
        this.find = find;
        this.comments = comments;
    }
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    get fullAddress() {
        return `${this.address}, ${this.city} ${this.state} ${this.zip}`
    }
}

let people = [
    new Visitor(1, "Ken", "Jenson", "1234 W. Main St.", "Mapleton", "Utah", "84664", "801-444-5555", "ken@gmail.com", { google: true, friend: false, news: true }, "notes"),
    new Visitor(2, "Ben", "Jenson", "1234 W. Main St.", "Mapleton", "Utah", "84664", "801-444-5555", "ben@gmail.com", { google: true, friend: false, news: false }, "notes"),
    new Visitor(3, "Ken", "Jenson", "1234 W. Main St.", "Mapleton", "Utah", "84664", "801-444-5555", "ken@gmail.com", { google: true, friend: false, news: true }, "notes"),
];

//adds new visitor object to your array
function modelAddVisitor(visitor) { 
    people.push(visitor)
}
function modelDeleteVisitor(id) { } //removes visitor object with given 'id' from array
function findVisitor(id) { } //returns visitor object with given 'id' from array
function findVisitorIndex(id) { } //returns index in the array of the visitor object with given 'id'.  Handy when trying to delete an object
function modelUpdateVisitor(visitor) { } //finds and updates a visitor object a your array}   //Only for extra credit 'edit' function