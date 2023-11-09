const http = require("http");
const dotenv = require("dotenv");
const loadPhrases = require("./utilities/loadPhrases");
const loadAjaxData = require("./utilities/loadAjaxData");

dotenv.config();

const port = +process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') res.writeHead(404).end();

    const phrases = loadPhrases.loadPhrases();
    const html = [];
    console.log(phrases);
    html.push("<ol>");


    for (const phrase of phrases) {
        html.push(`<li>${phrase.nome}</li>`);
    }

    html.push("</ol>");

    res.setHeader("Content-Type", "text/html;charset=utf-8");
    res.end(html.join(""));
});

const serverAsync = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') res.writeHead(404).end();

    loadAjaxData.loadAjaxData((phrases) => {
        const html = [];

        html.push("<ul>");

        for (const phrase of phrases) {
            html.push(`<li>${phrase}</li>`);
        }

        html.push("</ul>");

        res.setHeader("Content-Type", "text/html;charset=utf-8");
        res.end(html.join(""));
    })
})

serverAsync.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})