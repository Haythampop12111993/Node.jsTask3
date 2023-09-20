require("../DB/conectWithDb")
const prodectModel = require("../DB/models/prodect.model")
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


app.get("/",async (req, res) => {
     let allProducts = await prodectModel.find()
    res.render("home", {
        allProducts
    })
})
app.post("/",async (req, res) => {
    let Product = { barcode : Date.now(), ...req.body }
    try {
      const addProduct = new prodectModel(Product);
      await addProduct.save();
      // res.send(addProduct)
      res.render("home")
    }
    catch (e) {
      console.log(e.massage)
    }
  }
    
 )
app.get("/active", async(req, res) => {
  try {
    allProducts = await prodectModel.find()
    let product = allProducts.filter(ele => {
      return ele.status == "Active"
    })
    res.render("active", {
      product,
    });
  }
  catch (e) {
    console.log(e)
  }
    
})
app.get("/notactive",async (req, res) => {
  try {
    allProducts = await prodectModel.find()
    let notActvprod = allProducts.filter((ele) => {
      return ele.status == "NotActive";  
      
    })
    res.render("notactive", {
      notActvprod,
    });
  }
  catch (e) {
    console.log(e)
  }
  
});
app.get("/changeStatus/:_id", async (req, res) => {
  try {
    const productData = await prodectModel.findOne({ _id: req.params._id }).exec();
    if (productData) {
      productData.status =
        productData.status !== "Active" ? "Active" : "NotActive";
      await productData.save();
    }
    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
});
module.exports = app