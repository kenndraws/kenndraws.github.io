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

function getHSL(){
    const degree = Math.floor(Math.random() * 360)
    return `hsl(${degree}, 56%, 57%)`;
}

let lightMode = false; //Display mode
let dataLoaded = false; //If API is called then no need to recall
let displayed = true; 
let numDeleted = 0; //stat
let numEdited = 0; //stat
let userIDStart = 100; //Used for no clashing id's
let isGrid = false;

class Visitor {
    constructor(id, firstName, lastName, address, city, state, zip, email, cell, find, comments) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.email = email;
        this.cell = cell;
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
    new Visitor(1, "Ken", "Jenson", "1234 W. Main St.", "Mapleton", "Utah", "84664", "ken@gmail.com", "801-444-5555", { google: true, friend: false, news: true }, "notes"),
    new Visitor(2, "Ben", "Jenson", "1234 W. Main St.", "Mapleton", "Utah", "84664", "ben@gmail.com", "801-444-5555", { google: true, friend: false, news: false }, "notes"),
    new Visitor(3, "Ken", "Jenson", "1234 W. Main St.", "Mapleton", "Utah", "84664", "ken@gmail.com", "801-444-5555", { google: true, friend: false, news: true }, "notes"),
];

//adds new visitor object to your array
function modelAddVisitor(visitor) { 
    people.push(visitor)
}
//removes visitor object with given 'id' from array
function modelDeleteVisitor(id) { 
    people = people.filter(obj => obj.id !== id);
    console.log(people, id);
} 
//finds and updates a visitor object a your array}   //Only for extra credit 'edit' function
function modelUpdateVisitor(id) { 
    let user = people.filter(obj => obj.id === id)[0]; //grab user
    let values = Object.values(user).slice(1); //Get values of user minus ID
    let find = Object.values(values[8]); //Get checkbox values
    values.splice(8, 1); //turn into one array for easy loop

    find.forEach(bool => {
        values.splice(values.length - 1, 0, bool);
    })

    $("#myform ").find("input").each(function(i){
        if(this.type === "checkbox") {
            if(values[i]) $( this ).prop( "checked", true );
        }
        else $(this).val(values[i]);
    })

    addVisitor(); //Show's Form
    
    $("#myform").submit(function (event) {
        submitForm($("#myform"), event); //Add New Temp User

        let updated = people[people.length - 1]; //Grab Newest user which is the updated one
        updated.id = id; //Set new ID to old ID
        userIDStart--; //Decrement ID by one since new user doesn't count
        people.splice(people.length - 1, 1); //Remove it

        people.forEach(person => {
            if(person.id === id) people[people.indexOf(person)] = updated; //Update Current User
        })
    });
} 