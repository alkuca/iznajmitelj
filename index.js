const express = require("express")
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const path = require("path");

app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

//middleware

app.use(express.json()); // req.body
app.use(cors());

if (process.env.NODE_ENV === "production") {
    //server static content
    //npm run build
    app.use(express.static(path.join(__dirname, "client/build")));
}

console.log(__dirname);
console.log(path.join(__dirname, "client/build"));

//ROUTES//

//register and login routes
app.use("/auth", require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/items", require("./routes/items"));
app.use("/rentedItems", require("./routes/rentedItems"));
app.use("/messages", require("./routes/messages"));
app.use("/profile", require("./routes/profile"));
app.use("/notifications", require("./routes/notifications"));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
})

app.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}`);
});
