
#Pre-entrega-1 BackEnd

### Stack:
- NodeJS
- Express

### Listado de endpoints:
#### Producto

- Get All Products
  
localhost:8080/api/products

- Get All Products with Limit
  
localhost:8080/api/products?limit=[limit]

- Get One Product by ID
  
localhost:8080/api/products/:id

- Add Product
  
localhost:8080/api/products


En body:

  {
  
    "title": "[title]",
    
    "description": "[description]",
    
    "code": "[code]”,
    
    "price": [price],
    
    "status": true,
    
    "stock": [stock],
    
    "category": "[category]",
    
    "thumbnail": null
    
   }
   
- Update Product by ID
  
localhost:8080/api/products/:id

- Delete Product
  
localhost:8080/api/products/:id


#### Carrito

- Get All Carts
  
localhost:8080/api/carts

- Get Cart by ID
  
localhost:8080/api/carts/:id

- Add Cart
  
localhost:8080/api/carts

- Update Product in Cart by ID
  
localhost:8080/api/carts/:id/products/:id
