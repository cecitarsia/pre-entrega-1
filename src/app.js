const express = require("express")
const app = express()
const PORT = 8080
const productsRouter = require("./routes/products.route.js")
const cartsRouter = require("./routes/carts.route.js")



//Middlewares 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// app.use(express.static(path.join(__dirname, 'public')))
app.use("/", productsRouter)
app.use("/", cartsRouter)



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
