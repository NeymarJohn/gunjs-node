const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const GUN = require('gun');
const axios = require('axios');

const route = require("./app/routes/routes.js");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors("*"));

app.use(express.json()); 

app.use(express.urlencoded({ extended: true })); 

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

route(app);

// var gun = GUN({
//   file: 'data.json'
// });
// gun.wsp(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



const gun = GUN({web: server});

// gun.get('mark').put({boss: 'Hello'});

// gun.get('mark').get('boss').get('name').once(function(data, key){
//   // `once` grabs the data once, no subscriptions.
//   console.log("Mark's boss is", data);
// });

const apiKey = "u6g6bKPjdGNOk4PIX3hyTXLHLLZEPpy8";
const CurrentDate = new Date();
const date = CurrentDate.toISOString().split('T')[0];
const baseUrl = `https://api.polygon.io/v2/aggs/ticker/X:BTCUSD/range/1/minute/${date}/${date}?adjusted=true&sort=asc&limit=1&apiKey=${apiKey}`;
// console.log(baseUrl);
// var val = gun.get('BTCUSD').get('val');
// console.log(val);
setInterval(() => {
  axios.get(baseUrl).then(res => {
    gun.get('BTCUSD').set({'val': res.data.results[0]});
  });
}, 500)


