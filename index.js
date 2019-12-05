var app = require("express")()
var bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get("/", function (req, res, next) {
    res.render("home.ejs", { message: "" });
});

app.post("/act", function (req, res, next) {
    var str = req.body.gitlink;
    var ans = "";
    const request = require('request');
    const cheerio = require('cheerio');
    var url = "https://github.com/";
    url = url + str;
    console.log(url);
    request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            var count = 0;
            $('.js-navigation-open').each((i, el) => {
                count++;
                const item = $(el).text();
                if (count >= 4 && item != "..") {
                    ans = ans + item + "<br/>";
                      console.log(item);
                }
            });
        }
        res.render("home.ejs", { message: ans });
    });

    
});

app.listen(5000, function (err) {
    if (err) console.log(err);
    else
        console.log("server strted");
});