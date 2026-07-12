const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";

main().then(async () => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));


app.get("/", (req, res) => {
    res.send("root working");
});


// Index Route
app.get("/listings", async (req, res) => {
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
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});


// Show Route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});

// //gpt replacement codes
// app.get("/listings", async (req, res) => {
//     const allListings = await Listing.find({});

//     allListings.forEach((listing) => {
//         console.log(
//             "Title:", listing.title,
//             "| Price:", listing.price,
//             "| ID:", listing._id
//         );
//     });

//     res.render("listings/index.ejs", { allListings });
// });

// Create Route
app.post("/listings", async(req, res)=>{
       //let{title, description, image, price, country, location} = req.body;
    // let listing = req.body.listing;
    const newlisting = new Listing(req.body.listing);
    await newlisting.save();
    // console.log(newlisting);
    res.redirect("/listings");
});
// //Create Route
// app.post("/listings", async (req, res) => {
//     console.log(req.body);

//     const newlisting = new Listing(req.body.listing);
//     console.log(newlisting);

//     await newlisting.save();
//     res.redirect("/listings");
// });

//Edit route
app.get("/listings/:id/edit", async(req, res)=> {
     let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});

//Update Route
app.put("/listings/:id", async (req, res) =>{
     let { id } = req.params;
     await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`); // to show the same thing again but edited wala
    // res.redirect("/listings");
});

//Delete Route
app.delete("/listings/:id", async(req, res) => {
     let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect(`/listings`);
})



// app.get("/testListing",async (req,res) => {
//     let sampleListing = new Listing({
//         title: "My New Villa",
//         description: "By the Beach",
//         price: 1200,
//         location: "Calonguate, Goa",
//         country:"India",
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });

app.listen(8080, () => {
    console.log("server is listening to port 8080");
});


// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const Listing = require("./models/listing.js");
// const path = require("path");


// const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";

// main().then(async () => {
   
//     console.log("connected to DB");
// })
// .catch((err) => {
//     console.log(err);
// });
// async function main(){
//  await mongoose.connect(MONGO_URL);
// }

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// app.use(express.urlencoded({extended: true}));

// app.get("/", (req, res) => {
//     res.send("root working");
// });


// //Index Route
// app.get("/listings",async (req, res) => {
//    const allListings = await Listing.find({});
//    res.render("listings/index.ejs",{allListings});


// //   .then((res) => {
// //         console.log(res);
// //     })
// //     .catch((err) => {
// //         console.log(err);
// //     })
// });

// //New Route
// app.get("/listings/new", (req, res) =>{
//     // res.render("/listings/new.ejs");
//      res.render("new page working");
// })


// //Show Route
// app.get("/listings/:id", async (req, res) => {
//     let {id} = req.params;
//     const listing = await Listing.findById(id);
//     res.render("listings/show.ejs", {listing});
// });


// // app.get("/testListing",async (req,res) => {
// //     let sampleListing = new Listing({
// //         title: "My New Villa",
// //         description: "By the Beach",
// //         price: 1200,
// //         location: "Calonguate, Goa",
// //         country:"India",
// //     });

// //     await sampleListing.save();
// //     console.log("sample was saved");
// //     res.send("successful testing");
// // });

// app.listen(8080, () => {
//     console.log("server is listening to port 8080");
    
// });