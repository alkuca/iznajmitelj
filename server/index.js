const express = require("express")
const app = express();
const cors = require("cors");

//middleware

app.use(express.json()); // req.body
app.use(cors());

//ROUTES//

//register and login routes
app.use("/auth", require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/items", require("./routes/items"));
app.use("/rentedItems", require("./routes/rentedItems"));
app.use("/messages", require("./routes/messages"));
app.use("/profile", require("./routes/profile"));
app.use("/notifications", require("./routes/notifications"));

app.listen(5000, () => {
    console.log("Server is running on port 5000")
})
