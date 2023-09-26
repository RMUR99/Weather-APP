const http = require('http'); 
const fs = require ('fs'); 

const homeFile = fs.readFileSync("home.html" , "UTF-8"); 



var requests = require("requests");

const replaceVal = (tempVal , orgVal) => {
//    let temperature = tempVal.replace("{%tempval%}" , orgVal.main.temp);
//   temperature = temperature.replace("{%tempmin%}" , orgVal.main.temp_min);
//   temperature = temperature.replace("{%tempmax%}" , orgVal.main.temp_max);
//   temperature = temperature.replace("{%location%}" , orgVal.main.name);
//   temperature = temperature.replace("{%country%}" , orgVal.sys.country);
//   return temperature ;
};


const server = http.createServer((req , res) => {

 if(req.url == "/") {

    requests(
    "https://api.openweathermap.org/data/2.5/weather?q=Riyadh&appid=cea514439f95caf4bdd0fa617be50168")
    .on("data" , function (chunk) {
        const objdata = JSON.parse(chunk);
        const arrData = [objdata];
       //console.log(arrData[0].main.temp);
       const realTimeData = arrData.map((val) =>  replaceVal(homeFile, val)
       .join("") ); 
       // res.write(realTimeData);
       console.log(realTimeData);
    
    })
    .on("end", function(err) {
     if (err) return console.log('connection closed due to error' , err);
     res.end();
    
     console.log('end');
 
    });
     

 }
 else {
    res.end("FILE IS NOT FOUND")
 }
  
 


 

});

server.listen(8000 , "127.0.0.1"); 
