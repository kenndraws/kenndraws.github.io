# kenndraws.github.io 
# Project 6 Astronomy Info Project
Kenndraws Website

I used a few API calls to build my Space API in order to make it run smoother.

Here is the function I used:

    info.description = getDesc(info.searchName).then((promise) => {
        console.log(promise); // <---Will Print Paragraph from Query
        return promise; // <-- Will Return Promise not Paragraph
    });

    const body = myJSON[219];
    getDesc(body.searchName, body.id);
    console.log(body);

    for(const i in myJSON){
        //getDesc(myJSON[i].searchName, myJSON[i].id);
        if(!myJSON[i].isPlanet){
            
        }
    }
    console.log(myJSON);
    exportToJsonFile(myJSON);

    function getDesc(name, id) {
        const URL = `https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=extracts&exlimit=max&explaintext&titles=${name}`;
        return axios.get(URL).then((promise) => {
            const firstSentence = promise.data.query.pages[Object.keys(promise.data.query.pages)[0]].extract
            if (firstSentence.includes("(moon)")) getDesc(name + "_(moon)", id)
            else {
                //console.log(firstSentence.split(/\r?\n/)[0]);
                //return { desc: firstSentence.split(/\r?\n/)[0], id: id};
                myJSON[id].description = firstSentence.split(/\r?\n/)[0];
            }
        });
    }
    function getBodyImage(name, id) {
        const URL = `https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=pageimages&titles=${name}&pithumbsize=500`;
        return axios.get(URL).then((promise) => {
            const imageURL = promise.data.query.pages[Object.keys(promise.data.query.pages)[0]].thumbnail.source;
            //console.log(name, imageURL);
            //return { img: imageURL, id: id};
            myJSON[id].img = imageURL;
        });
    }
    function exportToJsonFile(jsonData) {
        let dataStr = JSON.stringify(jsonData);
        let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        let exportFileDefaultName = 'DATA.json';

        let linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }
    
What this would do is it would allow me to form a single JSON file of the hundreds of space bodies like planets, moons, asteroids etc. 
and call a WIKI api for an image and a description. Edit those existing objects and then re-export it. It may not have been the cleanest code but it got the job done.
Another api called Solar System OpenData was required to get all the objects first though. Documentation for that can be found here: https://api.le-systeme-solaire.net/en/

Once I managed to collect all the data I had to make some changes to the descriptions as the wiki call wasn't the most intuitive and since moons often 
have names in Greek Mythology, the call would not get it all correct. The data is still imperfect and requires updating however.
