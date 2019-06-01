# SequelizedBurger

This app is simple. 

If you want to eat a burger, then input your name and click the "Devour it!!" button.

But you can eat only one burger, because this is strict rule.

If you want get more burger, then you should give me another name.

Also you can order a new burger using order form.

I hope you help yourself!!


## Site
https://sequelizedburger-17636.herokuapp.com/


### Technologies Used

* HTML5
* CSS3
* jQuery
* Javascript
* MySQL
* Node.js
* express, express-handlebars, sequelize, sequelize-cli


### DB Models & Association
Each customer only can order one burger

#### Customer

```
module.exports=function(sequelize, DataTypes) {
    var Customer=sequelize.define("Customer",{
        customer_name: {
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                len:[1,140]
            }
        }   
    });
    return Customer;
};
```

#### Burger

```
module.exports=function(sequelize, DataTypes) {
    var Burger=sequelize.define("Burger",{
        burger_name: {
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                len:[1,140]
            }
        },
        devoured: {
            type:DataTypes.BOOLEAN,
            defaultValue:false
        }
    });
    Burger.associate=function(models) {
        Burger.belongsTo(models.Customer,{
            foreignKey:{
                allowNull:true
            }
        });
    };
    return Burger;
};
```

### Route & Sequelize

#### Menu

```
router.get("/",function(req,res){
    db.Burger.findAll({include: [db.Customer],order:[["burger_name","ASC"]]}).then(function(data){
        res.render("index",{burgers:data});
    });
});
```

List of burgers' name is showed Alphabetically.

#### Order

```
router.post("/api/burgers", function(req, res) {
    db.Burger.create({burger_name:req.body.burger_name, devoured:false}).then(function(data){
        res.json({data:data});
    });
});
```

#### Eat

```
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
```


### Creator
This is made by Minseok Choi (https://github.com/shirano2)




