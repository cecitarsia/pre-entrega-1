const fs = require('fs').promises
const express = require("express")
const router = express.Router()
const ProductManager = require('../managers/ProductManager')
const productManager = new ProductManager()


// Traer todos los productos con y sin limit
router.get("/api/products", async (req,res) => {
    let limit = parseInt(req.query.limit)
    try {
        const products = await productManager.getProducts()
        let limitedProducts = [...products]

        if (limit) {
            limitedProducts = limitedProducts.slice(0, limit)
            res.json(limitedProducts)
        }
        res.json(products);
    } catch (error) {
        res.status(404).json({ message: "404 - Productos no encontrados" });
    }

})  

// Traer un producto por ID
router.get("/api/products/:pid", async (req,res) => {
    try {
        let pid = parseInt(req.params.pid);
        const productById = await productManager.getProductById(pid);
        if (productById) {
            res.status(200).json(productById);
        } 
    } catch (error) {
        res.status(404).json({ message: "Producto no encontrado." });
    }
})


// Agregar un producto
router.post("/api/products", async (req,res) => {
    try {
        const { title, description, code, price, status, stock, category, thumbnail } = req.body
        const result = await productManager.addProduct(title, description, code, price, status, stock, category, thumbnail);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ message: "No se pudo agregar el producto." });
    }
})

// Editar un producto por ID
router.put("/api/products/:pid", async (req,res) => {
    try {
        let pid = parseInt(req.params.pid);
        const updatedProduct = await productManager.updateProduct(pid,req.body);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(404).json({ message: "No se pudo editar el producto." });
    }
})

// Eliminar un producto por ID
router.delete("/api/products/:pid", async (req,res) => {
    try {
        let pid = parseInt(req.params.pid);
        const result = await productManager.deleteProduct(pid);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ message: "No se pudo eliminar el producto." });
    }
})


module.exports = router