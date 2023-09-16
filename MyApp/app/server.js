const express = require("express");
const app = express();
app.use(express.urlencoded({extended:true}))
const Del = require("../helper/delWithJson")
let hbs = require("hbs");
let path = require("path")
let myView = path.join(__dirname, "../resources/views")
let partDir = path.join(__dirname, "../resources/layouts")
hbs.registerPartials(partDir)
const Styles = path.join(__dirname, "../public")
app.use(express.static(Styles))
app.set("view engine", "hbs")
app.set("views", myView)


app.get("/", (req, res) => {
    let allProducts = Del.readFromJson()
    res.render("home", {
        allProducts
    })
})
app.post("/", (req, res) => {
    let Product = { barcode : Date.now(), ...req.body }
    let allProducts = Del.readFromJson()
    console.log(allProducts)
    allProducts.push(Product)
    Del.writeFromJson(allProducts)
    res.render("home")
    
 })
app.get("/active", (req, res) => {
    allProducts = Del.readFromJson()
    let product = allProducts.filter((ele) => {
      return  ele.Status == "Active"
    })
    res.render("active", {
      product
    });
})
app.get("/notactive", (req, res) => {
  allProducts = Del.readFromJson();
  let notActvprod = allProducts.filter((ele) => {
    return ele.Status == "NotActive";
  });
  res.render("notactive", {
    notActvprod,
  });
});
module.exports = app