/* setting */
var express=require("express");
var router = express.Router();
var db = require("../models");

/* route for menu screen (after cooking, after eating) */
router.get("/",function(req,res){
    db.Burger.findAll({}).then(function(data){
        res.render("index",{burgers:data});
    });
});

module.exports=router;