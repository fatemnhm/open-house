const express = require('express')
const router = express.Router()

const Listing = require('../models/listing')
// render a list of all listings
router.get('/', async (req, res) => {
    try {
        const populatedListings = await Listing.find({}).populate('owner')
        console.log('listings: ', populatedListings)
        res.render('listings/index.ejs', {
            listings: populatedListings
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

//render a new listing form (create 2)
router.get('/new', (req, res) => {
    res.render('listings/new.ejs')
})

//create (create 1)
router.post('/', async (req, res) => {
    req.body.owner = req.session.user._id
    await Listing.create(req.body)
    res.redirect('/listings')
})

// controllers/listings.js

router.get('/:listingId', async (req, res) => {
    try {
      const populatedListings = await Listing.findById(
        req.params.listingId
      ).populate('owner');
  
      res.render('listings/show.ejs', {
        listing: populatedListings,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });
module.exports = router