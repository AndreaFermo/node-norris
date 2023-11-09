const fs = require("fs");
const path = require("path");

function loadAjaxData(onSuccess) {
    const phrasesPath = path.join(__dirname, "../db", "phrases.json");
    const url = "https://api.chucknorris.io/jokes/random";
    const phrases = JSON.parse(fs.readFileSync(phrasesPath, "utf-8"));

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (phrases.includes(data.value)) {
                console.log("duplicata");
                loadAjaxData(onSuccess);
            } else {
                phrases.push(`${data.value}`);

                fs.writeFileSync(phrasesPath, JSON.stringify(phrases));

                onSuccess(phrases);
            }


        })
}


module.exports = { loadAjaxData };

