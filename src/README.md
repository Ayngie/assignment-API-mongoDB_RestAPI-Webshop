### Routes

Webshop API routes are as follows:

###### Product Routes

GET /api/v1/products - Get all products

GET /api/v1/products/productId - Get product by id

###### Cart Routes

GET /api/v1/carts - Get all carts

GET /api/v1/carts/cartId - Get cart by id

POST /api/v1/carts - Create new cart

PUT /api/v1/carts/cartId - add Item To Cart

DELETE /api/v1/carts/cartId/productId - delete Item From Cart

DELETE /api/v1/carts/cartId - Delete cart (by id)
