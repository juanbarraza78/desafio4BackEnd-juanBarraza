const express = require("express")
const ProductManager = require("../ProductManager")
const uuid4 = require("uuid4")
const { Router } = express
const router = new Router()

router.get("/", (req, res)=>{
    const newProductManager = new ProductManager("./products.json")
    const resp = newProductManager.getProducts()
    resp
        .then(pr => {
            return res.send({data:pr, message:'Todos los productos enviados!'})
        })
        .catch(err =>{
            res.send(err)
        })
})

router.get("/:pid", (req, res)=>{
    let idProduct = req.params.pid
    const newProductManager = new ProductManager("./products.json")
    const resp = newProductManager.getProductById(idProduct)
    resp
        .then(pr => {
        res.send({data:pr, message:'Existe el producto!'})
        })
        .catch(err =>{
        res.send("Error, sorry",err)
        })
})

router.post('/', (req, res)=> {
    let id = uuid4()
    let pr = req.body
    pr.id = id
    const newProductManager = new ProductManager("./products.json")
    if(newProductManager.validateProduct(pr.title, pr.description, pr.code, pr.price, pr.status, pr.stock, pr.category))
    {
      newProductManager.addProduct(pr)
          .then(pr => {
            res.send({data:pr, message:'Producto guardado correctamente'})
          })
          .catch(err =>{
            res.send("Error, sorry",err)
          })
    }
    else
    {
      res.send("No se pasaron los parametros correctamente")
    }

})

router.put('/:pid', (req, res)=>{
    let id = req.params.pid
    let infoNew = req.body
    const newProductManager = new ProductManager("./products.json")
    if(newProductManager.validateProduct(infoNew.title, infoNew.description, infoNew.code, infoNew.price, infoNew.status, infoNew.stock, infoNew.category))
    {
      const resp = newProductManager.updateProduct(id,infoNew)
      resp
        .then(pr => {
          res.send('Producto Actualizado correctamente')
        })
        .catch(err =>{
          res.send("Error, sorry",err)
        })
    }
    else
    {
      res.send("No se pasaron los parametros correctamente")
    }
  })

router.delete('/:pid', (req, res)=>{
    let id = req.params.pid
    const newProductManager = new ProductManager("./products.json")
    const resp = newProductManager.deleteProduct(id)
    resp
      .then(pr => {
        res.send({data:pr, message:'Producto borrado'})
      })
      .catch(err =>{
        res.send("Error, sorry",err)
      })
  })


module.exports = router


  
 
  
  