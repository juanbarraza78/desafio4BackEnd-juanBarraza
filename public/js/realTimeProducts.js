let socket = io()

socket.on("connection", (data)=>{
    console.log(data)

    socket.emit("msg", "Soy cliente")
})

socket.on("products", (data)=>{
    renderProduct(data)
})


function addProduct(){
    const product ={
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        code: document.getElementById("code").value,
        price: parseInt(document.getElementById("price").value),
        status: Boolean(document.getElementById("status").value),
        stock: parseInt(document.getElementById("stock").value),
        category: document.getElementById("category").value,
        thumbnails: document.getElementById("thumbnails").value
    }
    socket.emit("new-product", product)
    return false
}

function renderProduct(data){
    const html = data.map((element)=>{
        return (`
            <div>
                <strong> ${element.title}</strong>
                <em>${element.price}</em>
            </div>
        `)
    }).join(" ")
    document.getElementById("listConteiner").innerHTML = html
}