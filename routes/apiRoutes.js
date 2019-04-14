/* setting */
var express=require("express");
var router = express.Router();
var db = require("../models");

/* route for cooking (when getting the order from form) */
router.post("/api/burgers", function(req, res) {
    db.Burger.create({burger_name:req.body.burger_name, devoured:false}).then(function(data){
        res.json({data:data});
    });
});

/* route for eating (after clicking the Devour button) */
router.put("/api/burgers/:id", function(req, res) {
    db.Customer.findAll({where:{customer_name:req.body.customer}}).then(function(data){
        if(data.length==0) {
            db.Customer.create({customer_name:req.body.customer}).then(function(data){
                db.Burger.update({CustomerId:data.id,devoured:true},{where:{id:req.params.id}}).then(function(data){
                    res.json({data:data});
                });
            });
        } else {
            res.json(false);
        }
    });
});

module.exports=router;