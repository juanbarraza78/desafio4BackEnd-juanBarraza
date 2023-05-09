const fs = require('fs')  

class CartManager
{
    constructor(path)
    {
        this.path = path;
    }

    async addCart(cart)
    { 
        try{
            let result = await fs.promises.readFile(this.path, 'utf-8')
            let arrayCart = JSON.parse(result)
            arrayCart.push(cart)
            await fs.promises.writeFile(this.path, JSON.stringify(arrayCart,null, 2), 'utf-8')
            console.log("cart save")
        }
        catch(e){
            console.log("error addcart")
        }
    }

    async addProductInCart(productCart, cid, pid)
    {
        try{
                let result = await fs.promises.readFile(this.path, 'utf-8')
                let arrayCart = JSON.parse(result)
                let respuesta;
                respuesta = arrayCart.find(element => element.id == cid);
                if(respuesta == undefined)
                {
                    return "Cart not founds"
                }
                else
                {
                    let respuestaProducto
                    respuestaProducto = respuesta.products.find(pr => pr.product == pid)
                    if(respuestaProducto == undefined)
                    {
                        respuesta.products.push(productCart)
                    }
                    else
                    {
                        respuestaProducto.quantity ++
                    }
                    await fs.promises.writeFile(this.path, JSON.stringify(arrayCart,null, 2), 'utf-8')
                    return "add product in cart"
                }
            }
        catch(e){
                console.log("error" + e)
        }

    }

    async getCart()
    {    
        try{
            let result = await fs.promises.readFile(this.path, 'utf-8')
            let arrayCart = JSON.parse(result)
            return arrayCart
        }
        catch(e){
            console.log("error getProducts")
        }    
    }

    async getCartById(id)
    {
        try{
                let result = await fs.promises.readFile(this.path, 'utf-8')
                let arrayCart = JSON.parse(result)
                let respuesta;
                respuesta = arrayCart.find(element => element.id == id);
                if(respuesta == undefined)
                {
                    return "Not founds"
                }
                return respuesta.products;
            }
        catch(e){
                console.log("error" + e)
        }

    }

    async updateCart(id, pr)
    {   
        try{
            let result = await fs.promises.readFile(this.path, 'utf-8')
            const arrayCart = JSON.parse(result)
            let respuesta = false
            const newArrayCart = arrayCart.map(function(product){
                if(product.id === id)
                {
                    respuesta = true
                    pr.id = id
                    return pr
                }
                else
                {
                    return product
                }
            })
            await fs.promises.writeFile(this.path, JSON.stringify(newArrayCart,null, 2), 'utf-8')
            if(!respuesta)
            {
                console.log("not Found")
            }
        }
        catch(e){
            console.log("error updateCart")
        }
        
    }

    async deleteCart(id)
    {    
        try{
            let result = await fs.promises.readFile(this.path, 'utf-8')
            const arrayProducts = JSON.parse(result)
            const newArrayProducts = arrayProducts.filter(product => product.id !== id)
            await fs.promises.writeFile(this.path, JSON.stringify(newArrayProducts,null, 2), 'utf-8')
        }
        catch(e){
            console.log("error deleteProduct")
        }
        
    }

    validateCart(title, description, code, price, status, stock, category) 
    {
        if (typeof title !== 'string' || title.trim().length === 0) {
          return false;
        }
        if (typeof description !== 'string' || description.trim().length === 0) {
          return false;
        }
        if (typeof code !== 'string' || code.trim().length === 0) {
          return false;
        }
        if (typeof price !== 'number' || isNaN(price) || price <= 0) {
          return false;
        }
        if (typeof status !== 'boolean') {
          return false;
        }
        if (typeof stock !== 'number' || isNaN(stock) || stock < 0) {
          return false;
        }
        if (typeof category !== 'string' || category.trim().length === 0) {
          return false;
        }
        return true;
      }
      
}

module.exports = CartManager