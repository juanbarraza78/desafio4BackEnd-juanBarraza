const express = require("express")
const { Router } = express
const router = new Router()
const ProductManager = require("../ProductManager")

router.get("/", (req, res)=>{
    const newProductManager = new ProductManager("./products.json")
    const resp = newProductManager.getProducts()
    resp
        .then(pr => {
            return res.render("home",{products:pr, mensaje:"exito"})
        })
        .catch(err =>{
            res.send(err)
        })
})

module.exports = router