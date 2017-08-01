
var express = require('express');
var app = express();

app.use(express.static('public'));


app.set('view engine', 'pug')


app.get("/json", (request, response)=>{
  var header = {}
  header.ipaddress = request.headers["x-forwarded-for"].split(",")[0] ||request.connection.remoteAddress
  header.language = request.headers["accept-language"].split(",")[0]
  var userAgent = request.headers["user-agent"]
  userAgent = /\(.+?\)/.exec(userAgent)[0].replace("(", "").replace(")", "")
  header.software = userAgent
  response.set('Content-Type', 'text/json');
  response.json(header)
})
app.get("/", function (request, response) {
  var header = {}
  header.ipaddress = request.headers["x-forwarded-for"].split(",")[0] ||request.connection.remoteAddress
  header.language = request.headers["accept-language"].split(",")[0]
  var userAgent = request.headers["user-agent"]
  userAgent = /\(.+?\)/.exec(userAgent)[0].replace("(", "").replace(")", "")
  header.software = userAgent
  // var headerArray = []
  // Object.keys(header).map(key=>{
  //   headerArray[key] = header[key]
  // })
  // console.log(headerArray)
  response.render("index", {parsedHeader: header})
});



var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
