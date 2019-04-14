/* express */
var express = require("express");
var PORT = process.env.PORT || 3000;
var app = express();

/* db */
var db=require("./models");

/* static content in "public" directory */
app.use(express.static("public"));

/* parse request body as JSON */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* handlebars */
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

/* route */
var htmlRoutes = require("./routes/htmlRoutes.js");
app.use(htmlRoutes);
var apiRoutes = require("./routes/apiRoutes.js");
app.use(apiRoutes);

/* listener */
db.sequelize.sync({force:true}).then(function(){
  app.listen(PORT, function() {
    console.log("Micheal, Can you hear me? I'm in",PORT,"port, please come here.... (Mute)");
  });
});