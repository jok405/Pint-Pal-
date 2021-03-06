// Node Dependencies
const express = require('express');
const router = express.Router();
// const beer = require('../models/beer.js');

// Index Redirect
router.get('/', function (req, res) {
  res.redirect('/index');
});

// Index Page (render all beers to DOM)
router.get('/index', function (req, res) {
  beer.selectAll(function(data) {
    var hbsObject = { beers: data };
    //console.log(hbsObject);
    res.render('index', hbsObject);
  });
});

// Create a New Beer
router.post('/beer/create', function (req, res) {
  beer.insertOne(req.body.beer_name, function() {
    res.redirect('/index');
  });
});

// Drink a Beer
router.post('/beer/drink/:id', function (req, res) {
  beer.updateOne(req.params.id, function() {
    res.redirect('/index');
  });
});

// Export routes
module.exports = router;



/*


// Node Dependencies
const express = require('express');
const router = express.Router();
const models = require('../models'); // const beer = require('../models/beer.js');

// extracts the sequelize connection from the models object
const sequelizeConnection.sync();

// sync the tables
sequelizeConnection.sync();

//create routes
//==================================//



// Index Redirect
router.get('/', function (req, res) {
  res.redirect('/index');
});

// index page (render all beers to Dom)
router.get('/index', function (req, res) {

  // sequelize query to get all beers from db (and join them to name of beer, brewery, rating, location?)
  models.beers.findAll({
    include: [{models.beers}]
  }).then(function(data){

    // pass the returned data into a handlebars object and then render it
    var hbsObject = { beers: data };
    res.render('index', hbsObject);
  })

});

// Create a New Beer
router.post('/beer/create', function (req, res) {

  // sequelize query to add new beer to database
  models.beers.create(
    {
      beer_name: req.body.beer_name,
      drank: false
    }
  ).then(function() {
    // After the burger is added to the database, refresh the page
    res.redirect('/index');
  });
});

// Drink a Beer
router.post('/beer/drink/:id', function (req, res) {
  // if not name was added, make it "anonymous"
  if(req.body.beerDrink == '' || req.body.beerDrink == null){
    req.body.beerDrink = 'Anonymous';
  }

  // Create a new beer drinker (and also associate it to the drank beer's id)
  models.drinkers.create({
    drinker_name: req.body.beerDrinker,
    beerID: req.params.id})
    
  // Then select the drank beer by it's id
  .then(function(newDrinker){
    models.beers.findOne( {where: {id: req.params.id}})
    // then, use the returned beer object to...
    .then(function(drankBeer){
      // ... update the beer's status to drink
      ddrinkBeer.update({
        drink: true,
      })
      // then, the beer is drank, so refresh the page
      .then(function(){
        res.redirect('/index');
      });
    });
  });
});

// Export routes
module.exports = router; */