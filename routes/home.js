const express = require('express');
const router = express.Router();
const club = require('../models/Club');

/////////route for read///////////////////////
router.get('/', (req, res) => {
  club
    .find((err, docs) => {
      res.render('home', { clubs: docs });
    })
    .catch((err) => {
      console.log("something wrong with mongodb(can't retrive)");
    });
});
// res.render('home'); //require render home.ejs,after then will be above use syntax

///////////////////route for create/////////////////
router.post('/add', (req, res, next) => {
  // const first_name = req.body.first_name; //// body.first_name is ejs form>input.name , afte then use  const {first_name, middle_name, last_name} = req.body;
  // const middle_name = req.body.middle_name;
  // const last_name = req.body.last_name;

  const { first_name, middle_name, last_name } = req.body;

  console.log(first_name, middle_name, last_name);

  const uclClub = new club({
    first_name: first_name,
    middle_name: middle_name,
    last_name: last_name,
  });
  uclClub.save((err) => {
    if (err) {
      console.log('something went wrong to connect to database');
    } else {
      console.log('Data is recorded sucessfully');
      res.redirect('/');
    }
  });
});

///////////////route to show update element/////////////////////
router.get('/edit/:id', (req, res, next) => {
  console.log(req.params.id);
  club.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, docs) => {
      if (err) {
        console.log(
          "can't retrive data and edit because of some database problem"
        );
        next(err);
      } else {
        res.render('edit', { club: docs });
      }
    }
  );
});

/////////////////route to update element/////////////////////////
router.post('/edit/:id', (req, res, next) => {
  club.findByIdAndUpdate({ _id: req.params.id }, req.body, (err, docs) => {
    if (err) {
      console.log('something went wrong to update your data');
      next(err);
    } else {
      console.log('updated sucessfully');
      res.redirect('/');
    }
  });
});

////////route to delete item///////////////
router.get('/delete/:id', (req, res, next) => {
  club.findByIdAndDelete({ _id: req.params.id }, (err, docs) => {
    if (err) {
      console.log('something went wrong to update your data');
      next(err);
    } else {
      console.log('Deleted succesfully');
      res.redirect('/');
    }
  });
});

///just use for first run localhost start////////

// router.get('/', (req, res, next) => {
//   res.send('express router is working');
// });

///just use for first run localhost end////////
module.exports = router;
