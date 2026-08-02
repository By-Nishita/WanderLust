const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");




const validateListing = (req,res, next) => {
    let{error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
                next();

    }
    }


// Index Route
router.get("/", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });

    //   .then((res) => {
    //         console.log(res);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
});


// New Route
router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
});


// Show Route
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if(!listing){
        req.flash("error", "Listing you requested does not exists!");
        return res.redirect("/listings");
    }
    return res.render("listings/show.ejs", { listing });
}));

// Create Route
router.post("/",
    validateListing,
     wrapAsync(async(req, res, next)=>{
 const newlisting = new Listing(req.body.listing);
    await newlisting.save();
    // console.log(newlisting);
    req.flash("success", "New Listing Created");
    return res.redirect("/listings");
   
}));

//Edit route
router.get("/:id/edit", wrapAsync(async(req, res)=> {
     let { id } = req.params;
    const listing = await Listing.findById(id);

    if(!listing){
        req.flash("error", "Listing you requested does not exists!");
        return res.redirect("/listings");
    }
    
    res.render("listings/edit.ejs",{listing});
}));

//Update Route
router.put("/:id",
    validateListing, 
    wrapAsync(async (req, res) =>{
     let { id } = req.params;
     await Listing.findByIdAndUpdate(id,{...req.body.listing});
     req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`); // to show the same thing again but edited wala
    // res.redirect("/listings");
}));

//Delete Route
router.delete("/:id", wrapAsync(async(req, res) => {
     let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    res.redirect(`/listings`);
}));

module.exports = router;