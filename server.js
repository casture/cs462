var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('<strong>Name: </strong> Micah Weatherhead<br><strong>AMI ID:</strong> i-30880783');
});

app.listen(8080, function () {
  console.log('Example app listening on port 3000!');
})
