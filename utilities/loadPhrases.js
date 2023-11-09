const fs = require("fs");
const path = require("path");

function loadPhrases() {
    const phrasesPath = path.join(__dirname, "../db", "phrases.json");

    try {
        const phrases = fs.readFileSync(phrasesPath, "utf-8");
        return JSON.parse(phrases);
    } catch (err) {
        console.log(err.message);
        return [];
    }
}

module.exports = { loadPhrases };