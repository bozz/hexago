var express = require('express');
var app = express();

app.use('/', express.static(__dirname + '/public'));

// app.get('/', function(req, res) {
//     res.send('Hexago!');
// });

app.listen(3000);
console.log('listening on port 3000');
