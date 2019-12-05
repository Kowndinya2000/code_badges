
function f_server(str){
    const request = require('request');
    const cheerio = require('cheerio');
    var url = "https://github.com/";
    url = url + str;
    console.log(url);
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
            console.log(ans);
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
                var str = rt[0];
                var integer = parseInt(str, 10);
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
            console.log(ans);
        });
    }
    
return ans;
    
}

function loadDoc(str1,bool_flag) {
    var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
          
        var doop = []; 
        doop = f_server(str1);
        console.log(str1);
        console.log(doop);
        var i;
        for(i=0;i<doop.length;i++)
        {
          queue.push(doop[i]);
          console.log(doop[i]);
        }
        if(bool_flag)
        {
          var i;
        if(doop.length >= 1)
        {
            matr.push("https://github.com/" + str1 + "\n");
            console.log("https://github.com/" + str1 + "\n" );
        }
        for(i=0;i<doop.length;i++)
        {
          console.log(doop[i] + "\n");
          matr.push(doop[i] + "\n");
        }
          if(doop.length >= 1)
          {
            console.log("<br/>--------------------<br/>");
            matr.push("--------------------");
          }
        }
        else
        {
         
        for(i=0;i<doop.length;i++)
        {
           if(doop[i].includes("."))
           {
              if(str1.includes("master"))
              loadDoc( str1 + "/" + doop[i],true);
              else
              loadDoc( str1 + "/blob/master/" + doop[i],true);
           }
           else
           {
            if(str1.includes("master"))
              loadDoc( str1 + "/" + doop[i],true);
            else
            loadDoc( str1 + "/tree/master/" + doop[i],false);
           }
        }
       
        }
  }
};
xhttp.open("POST", "server.js", false);
xhttp.setRequestHeader('Content-type', "application/x-www-form-urlencoded")
var str = str1;
console.log(str);
xhttp.send('link='+str);
}
  function myFunct(arr)
  {
                      console.log("Hey");
                      console.log(arr);
                      var i = 0;
                      var pack = []; var p = 0;
                      var syn_class = []; var s = 0;
                      var inh_class = []; var inh = 0;
                      var methods = [];   var m = 0;
                      var overrides = 0;
                      var line;var words;var j = 0;
                      for(i=0;i<arr.length;i++)
                      {
                          line = arr[i];
                          words = line.split(' ');
                          for(j=0;j<words.length;j++)
                          {
                              if(words[j] == ' ')
                                  continue;
                              else
                              {
                                  if(words[j] == "@override")
                                  {
                                      overrides++;
                                  }
                                  else if(words[j] == "import")
                                  {
                                      j++;
                                      while(words[j] == ' ')
                                      {
                                          j++;
                                      }
                                      pack[p] = words[j];
                                      p++;
                                      j--;
                                  }
                                  else if(words[j] == "class")
                                  {
                                      j++;
                                      while(words[j] == ' ')
                                      {
                                          j++;
                                      }
                                      var rt = 0;
                                      var fg = false;
                                      if(s>0)
                                      for(rt=0;rt<s;rt++)
                                      {
                                          if(syn_class[rt] == words[j])
                                          {
                                            fg = true;
                                            break;
                                          }
                                      }
                                      if(!fg)
                                      {
                                          syn_class[s] = words[j];
                                          s++;
                                      }
                                      j--;
                                  }
                                  else if(words[j] == "extends")
                                  {
                                      var rt = 0;
                                      var fg = false;
                                      if(inh>0)
                                      for(rt=0;rt<inh;rt++)
                                      {
                                          if(inh_class[rt] == words[j-1])
                                          {
                                            fg = true;
                                            break;
                                          }
                                      }
                                      if(!fg)
                                      {
                                      inh_class[inh] = words[j-1];
                                      inh++;
                                      }
                                      j++;
                                  }
                                  else if(words[j] == "void"
                                  || words[j] == "int"
                                  || words[j] == "int*"
                                  || words[j] == "char"
                                  || words[j] == "char*"
                                  || words[j] == "float"
                                  || words[j] == "float*"
                                  || words[j] == "double"
                                  || words[j] == "double*"
                                  || words[j] == "short"
                                  || words[j] == "short*"
                                  || words[j] == "byte"
                                  || words[j] == "byte*"
                                  || words[j] == "boolean"
                                  || words[j] == "string"
                                  )
                                  {
                                      
                                      j++;
                                      while(words[j] == ' ')
                                      {
                                          j++;
                                      }
                                      var temp = words[j].split('(');
                                      var tm = temp.length;
                                      if(tm>1)
                                      {
                                      var rt = 0;
                                      var fg = false;
                                      if(m>0)
                                      for(rt=0;rt<m;rt++)
                                      {
                                          if(methods[rt] == words[j])
                                          {
                                            fg = true;
                                            break;
                                          }
                                      }
                                      if(!fg)
                                      {
                                      methods[m] = temp[0];
                                      m++;
                                      } 
                                      }
                                      
                                      
                                      j--;
                                  }
                                  else if(words[j].includes("System") || words[j].includes("if") || words[j].includes("while") || words[j].includes("do") || words[j].includes("for"))
                                  {
                                      break;
                                  }
                                  else
                                  {
                                      continue;
                                  }
                              }
                          }
                      }
                      
                      var ans;
                      for(i=0;i<p;i++)
                      {
                          ans = pack[i].split(';');
                      }
                    var tot =  inh + s;
                    for(i=0;i<inh;i++)
                      {
                          ans = inh_class[i];
                          var ans2 = ans.split('{');
                          if(ans2.length > 1)
                          {
                          }
                          else{
                          }
                        
                      }
                      for(i=0;i<s;i++)
                      {
                          var ans;
                          ans = syn_class[i];
                          var ans2 = syn_class[i].split('{');
                          if(ans2.length > 1)
                          {
                          }
                          else{
                          }
                          
                      }
                       for(i=0;i<m;i++)
                      {
                          ans = methods[i];
                      }
                      var non_over = m - overrides;
                      
                      N_Pack += p;
                      I_Class += inh;
                      I_methods += overrides;
                     
  }
function callDoc() 
{
       loadDoc("Kowndinya2000/java_f2",false);
       console.log(matr);
       //var mg = matr.split('--------------------');
        for(t=0;t<mg.length-1;t++)
        {
          myFunct(mg[t].split('\n'));
        }
        console.log(N_Pack);
        console.log(I_Class);
        console.log(I_methods);
}
var matr = [];
callDoc();