var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var options = {
  key: fs.readFileSync(__dirname + '/keys/certPk.pem'),
  cert: fs.readFileSync(__dirname + '/keys/server.crt')
};

// Create a service (the app object is just a callback).
var app = express();

// Create an HTTP service.
http.createServer(app)
  .listen(process.env.PORT || 80)

// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app)
  .listen(443)

app.use(express.static('public'));

// Set the client credentials and the OAuth2 server
var credentials = {
  clientID: '0IMIUPY4N2PSM04DAAAFLDII2WSJI0TCQ2BTMQV4NXAF5AGC',
  clientSecret: 'PVPKRO4WEUYNAIV3MOLVR3HSST1O4SZPCCIQOHGR5NRCDEIE',
  site: 'https://foursquare.com',
  authorizationPath: '/oauth2/authorize',
  tokenPath: '/oauth2/access_token'
};

// Initialize the OAuth2 Library
var oauth2 = require('simple-oauth2')(credentials);

// Authorization oauth2 URI
var authorization_uri = oauth2.authCode.authorizeURL({
  redirect_uri: 'https://ec2-52-90-28-246.compute-1.amazonaws.com/redirect',
  state: '3(#0/!~'
});

// Initial page redirecting to Foursquare
app.get('/auth', function (req, res) {
    res.redirect(authorization_uri);
});

// Callback service parsing the authorization token and asking for the access token
app.get('/redirect', function (req, res) {
  var tokenConfig = {
    code: req.query.code,
    redirect_uri: 'https://ec2-52-90-28-246.compute-1.amazonaws.com/redirect'
  };

  oauth2.authCode.getToken(tokenConfig)
    .then(function saveToken(result) {
      token = oauth2.accessToken.create(result);
      console.log('SUCCESS!!', token);
      res.redirect('/')
    })
    .catch(function logError(error) {
      console.log('Access Token Error', error.message);
    });
});


// // Set the client credentials and the OAuth2 server
// var config = {
//   secrets: {
//     clientId: '0IMIUPY4N2PSM04DAAAFLDII2WSJI0TCQ2BTMQV4NXAF5AGC',
//     clientSecret: 'PVPKRO4WEUYNAIV3MOLVR3HSST1O4SZPCCIQOHGR5NRCDEIE',
//     redirectUrl: 'https://localhost/redirect'
//   }
// };
// var foursquare = (require('node-foursquare'))(config);
//
// // Initial page redirecting to Foursquare
// app.get('/auth', function (req, res) {
//   res.redirect(foursquare.getAuthClientRedirectUrl());
//     // res.writeHead(303, { location: foursquare.getAuthClientRedirectUrl() });
//     // res.end()
// });
//
// // Callback service parsing the authorization token and asking for the access token
// app.get('/redirect', function (req, res) {
//     foursquare.getAccessToken({
//       code: req.query.code
//     }, function (error, accessToken) {
//       if (error) {
//         res.send('An error was thrown: ' + error.message)
//       } else {
//
//       }
//     })
// });
