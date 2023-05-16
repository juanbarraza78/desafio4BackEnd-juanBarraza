const express = require("express")
const handlebars = require("express-handlebars")
const routesProducts = require("./routes/home.route")
const routesProductsRealTime = require("./routes/realtimeproducts.route")
const http = require("http")
const { Server } = require("socket.io")
const uuid4 = require("uuid4")

const ProductManager = require("./ProductManager")



const PORT = 8080

// Express
const app = express()

//socket.io
const server = http.createServer(app)
const io = new Server(server)

//Inicializar el socket en el servidor
io.on("connection", (socket)=>{

    console.log("User conectado")

    const newProductManager = new ProductManager("./products.json")
    const resp = newProductManager.getProducts()
    resp.then(pr =>{
        socket.emit("products", pr)
    })

    socket.on("new-product",(data)=>{
        let id = uuid4()
        let pr = data
        pr.id = id
        console.log(pr)
        const newProductManager = new ProductManager("./products.json")
        if(newProductManager.validateProduct(pr.title, pr.description, pr.code, pr.price, pr.status, pr.stock, pr.category))
        {
          newProductManager.addProduct(pr)
        }
        else{
            console.log("error parametros")
        }
    })

})

// Routes
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(__dirname+"/public"))
app.use("/home", routesProducts)
app.use("/realtimeproducts", routesProductsRealTime)


// Express-handlebars views
app.engine("handlebars", handlebars.engine())
app.set("view engine","handlebars")
app.set("views",__dirname+"/views")




server.listen(PORT,()=>{
    console.log("Server running on port "+PORT)
})
