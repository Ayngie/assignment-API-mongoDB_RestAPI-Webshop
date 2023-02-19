# assignment-API-mongoDB_RestAPI-Webshop
Andra individuella inlämningsuppgiften i API-utvecklingskursen, Medieinstitutet (termin 2), Stockholm

# Routes

## Webshop API routes are as follows:

### Product Routes

##### GET /api/v1/products - Get all products

##### GET /api/v1/products/productId - Get product by id

### Cart Routes

##### GET /api/v1/carts - Get all carts

##### GET /api/v1/carts/cartId - Get cart by id

##### POST /api/v1/carts - Create new cart

##### PUT /api/v1/carts/cartId - add Item To Cart

Add with productId as follows:
{
"pId": ""
}

##### DELETE /api/v1/carts/cartId/productId - delete Item From Cart

Delete with productId as follows:
{
"pId": ""
}

##### DELETE /api/v1/carts/cartId - Delete cart (by id)

Delete with cartId as follows:
{
"cartId": "63f255e80f65e261cf18ba2a"
}
