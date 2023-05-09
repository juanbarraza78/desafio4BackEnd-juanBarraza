const fs = require('fs')  

class ProductManager
{
    constructor(path)
    {
        this.path = path;
    }

    async addProduct(product)
    { 
        try{
            let result = await fs.promises.readFile(this.path, 'utf-8')
            let arrayProducts = JSON.parse(result)
            arrayProducts.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(arrayProducts,null, 2), 'utf-8')
            console.log("Product save")
        }
        catch(e){
            console.log("error addProduct")
        }
    }

    async getProducts()
    {    
        try{
            let result = await fs.promises.readFile(this.path, 'utf-8')
            let arrayProducts = JSON.parse(result)
            return arrayProducts
        }
        catch(e){
            console.log("error getProducts")
        }    
    }

    async getProductById(id)
    {
        try{
                let result = await fs.promises.readFile(this.path, 'utf-8')
                let arrayProducts = JSON.parse(result)
                let respuesta;
                respuesta = arrayProducts.find(element => element.id == id);
                if(respuesta == undefined)
                {
                    return "Not founds"
                }
                return respuesta;
            }
        catch(e){
                console.log("error" + e)
        }

    }

    async updateProduct(id, pr)
    {   
        try{
            let result = await fs.promises.readFile(this.path, 'utf-8')
            const arrayProducts = JSON.parse(result)
            let respuesta = false
            const newArrayProducts = arrayProducts.map(function(product){
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
            await fs.promises.writeFile(this.path, JSON.stringify(newArrayProducts,null, 2), 'utf-8')
            if(!respuesta)
            {
                console.log("not Found")
            }
        }
        catch(e){
            console.log("error updateProduct")
        }
        
    }

    async deleteProduct(id)
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

    validateProduct(title, description, code, price, status, stock, category) 
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

module.exports = ProductManager