var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('<strong>Name: </strong> Micah Weatherhead<br><strong>AMI ID:</strong> amzn-ami-hvm-2015.09.1.x86_64-gp2 (ami-60b6c60a)');
});

app.listen(80, function () {
  console.log('Example app listening on port 8080!');
})
