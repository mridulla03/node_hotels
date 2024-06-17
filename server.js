const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
const Person = require("./models/Person");
const MenuItem = require("./models/MenuItem");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to port 8000");
});

// import the router files
const personRoutes = require("./Routes/personRoutes");
const menuRoutes = require("./Routes/menuRoutes");
// use the routers
app.use("/person", personRoutes);
app.use("/menuitem", menuRoutes);

app.listen(8000, () => {
  console.log("listening to port 8000");
});
