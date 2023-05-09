const express = require("express")
//const ProductManager = require("./ProductManager")

const app = express()
const PORT = 8080
const routesProducts = require("./routes/products")
const routesCarts = require("./routes/carts")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/products", routesProducts)
app.use("/api/carts", routesCarts)

//app.use('/static', express.static(__dirname + '/public'))

app.listen(PORT, ()=>{
    console.log("Server run port", PORT)
})