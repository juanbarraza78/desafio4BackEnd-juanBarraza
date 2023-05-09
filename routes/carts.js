const express = require("express")
const CartManager = require("../CartManager")
const uuid4 = require("uuid4")
const { Router } = express
const router = new Router()

router.post('/', (req, res)=> {
    let id4 = uuid4()
    cart = {
        id:id4,
        products:[]
    }
    const newCartManager = new CartManager("./cart.json")
    const resp = newCartManager.addCart(cart)
    resp
        .then(pr => {
            res.send({data:pr, message:'Carrito guardado correctamente'})
        })
        .catch(err =>{
            res.send("Error",err)
        })
    
})

router.get("/:cid", (req, res)=>{
    let idCart = req.params.cid
    const newCartManager = new CartManager("./cart.json")
    const resp = newCartManager.getCartById(idCart)
    resp
        .then(pr => {
        res.send({data:pr, message:'Existe el carrito!'})
        })
        .catch(err =>{
        res.send("Error, sorry",err)
        })
})

router.post('/:cid/product/:pid', (req, res)=> {
    let idCart = req.params.cid
    let idProduct = req.params.pid
    const productCart = {
        product: idProduct,
        quantity:1
    }
    const newCartManager = new CartManager("./cart.json")
    const resp = newCartManager.addProductInCart(productCart, idCart, idProduct)
    resp
        .then(pr => {
            res.send({data:pr, message:'producto guardado en carrito correctamente'})
        })
        .catch(err =>{
            res.send("Error",err)
        })
    
})


module.exports = router