const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.get("/getcookies", (req, res) => {
    res.cookie("greet", "hello");
     res.cookie("greet", "namaste");
    res.send("sent you some cookies!");
});

app.get("/greet", (req, res) => {
    let{name= "anonymous"} = req.cookies;
    res.send(`hi, ${name}`);
});

app.get("/", (req, res) => {
    
    res.send("Hi, I am root");
    console.log(req.cookies);
});

app.use = ("/users", users);
app.use = ("/posts", posts);


app.listen(3000, () => {
    console.log("server is listening to 3000");
}
);