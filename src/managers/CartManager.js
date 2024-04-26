const fs = require('fs').promises;
const ProductManager = require('./ProductManager')
const productManager = new ProductManager()

class CartManager {

    constructor() {
        this.carts = []
        this.path = 'Carts.json'
    }

    // AGREGAR UN PRODUCTO AL CARRITO, Y CREARLO SI ESTE NO EXISTE
    // async addProductToCart(cid, pid) {
    //     try {
    //         // Busca el carrito por ID
    //         let cart = this.getCartById(cid)
    //         // Si no existe el carrito, lo crea
    //         if (!cart) {
    //             cart = await this.createCart()
    //         }
    //         cart.products.push( {id:pid, quantity:1} )      
            
    //     } catch (error) {
    //         console.error("El carrito buscado no existe", error);
    //     }
    // }

//     async createCart(){
//         try {
//             const id = this.carts.length + 1
//             const newCart = {
//                 id: id,
//                 products : [],
//             }
//             this.carts.push(newCart)
//                 await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
//                 console.log("Carrito creado.")
//                 return newCart
// x
//         } catch (error) {
//             console.error("No se pudo crear el carrito", error);
//         }
//     }

    async addCart() {
        try {
            const cartId = this.carts.length + 1
            const cart = {
                id: cartId,
                products: [],
            }
            this.carts.push(cart);
            await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
            return cart;

        } catch (error) {
            console.error("Error al crear el carrito", error);
        }

    }

    async getCarts(){
        try {
            return await this.readCarts()
        } catch (error) {
            console.error("Error al consultar carritos", error);
            return [];
        }
    }

    async readCarts() {
        try {
            const data = await fs.readFile(this.path, 'utf8')
            return JSON.parse(data)
        } catch (error) {
            if (error.code === 'ENOENT') {
                return [];
            } else {
                throw error;
            }
        }
    }

    async getCartById(cid){
        try {
            const carts = await this.getCarts()
            const cartFound = await carts.find((cart) => cart.id === cid)
            if (!cartFound) {
                return "No existe un carrito con ese Id."
            } else {
                return cartFound
            }
        } catch (error) {
            console.error("Error en la búsqueda de carrito.", error);
        }
    }

    async updateCart(cid,pid) {
        try {
            const carts = await this.getCarts();

            const cartToUpdate = await carts.find(cart => cart.id === cid);
            if (cartToUpdate) {
                const cartProducts = cartToUpdate.products;
                const productToUpdate = cartProducts.find((p) => p.id === pid);

                if(productToUpdate){
                    productToUpdate.quantity++
                } else {
                    cartProducts.push({
                        "product":pid,
                        "quantity":1
                    })  
                }
                
                const newCartList = carts.filter(c => c.id != cid);
                newCartList.push(cartToUpdate);
                await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
                return cartToUpdate;
            } else {
                console.log("No se encontró el carrito para actualizar");
            }

        } catch (error) {
            console.error("Error al actualizar el carrito", error);
        }

    }




}

module.exports = CartManager