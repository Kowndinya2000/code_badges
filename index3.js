var app = require("express")()
var bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get("/", function (req, res, next) {
    res.render("home2.ejs", { message: "" });
});

app.post("/act", function (req, res, next) {
    console.log(req.body);
    var str = req.body.link;
    const request = require('request');
    const cheerio = require('cheerio');
    var url = "https://github.com/";
    url = url + str;
   // console.log(url);
    if(!str.includes(".java"))
    {
        String.prototype.splice = function(idx, rem, str) {
            return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
        };
        var ans = [];
        request(url, (error, response, html) => {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
                var count = 0;
                $('.js-navigation-open').each((i, el) => {
                    count++;
                    var item = $(el).text();
                    if (count >= 4 && item != "..") {
                        if(item.includes(" "))
                        {
                            var i = 0;
                            while(item[i] != ' ')
                            {
                                i++;
                            }
                            item = item.splice(i,1,"%20");
                        }
                        ans.push(item);
                    }
                });
            }
           // console.log(ans);
            res.json({ message: ans });
        });
    }
    else
    {
        var ans = [];
        request(url, (error, response, html) => {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
                const rt = $('.flex-order-2').text().replace(/\s\s+/g,'').split("lines");
               // console.log(rt[0]);
                var str = rt[0];
                var integer = parseInt(str, 10);
              //  console.log(integer);
                for(i=1;i<=integer;i++)
                {
                    var cat = "#LC";
                    cat = cat + i;
                    $(cat).each((i,el) => {
                     const item = $(el).text();
                       ans.push(item);
                    
                    });
                }
            }
          res.json({ message: ans });
        });
    }
    

    
});

app.listen(5000, function (err) {
    if (err) console.log(err);
    else
        console.log("server strted");
});