# assignment-API-mongoDB_RestAPI-Webshop

## Description:
My second individual assignment in API-development course.
Frontend developer studies, Medieinstitutet, Stockholm.

---

## Routes
Webshop API routes are as follows:


### Product Routes

##### GET /api/v1/products - Get all products

##### GET /api/v1/products/productId - Get product by id


### Cart Routes

##### GET /api/v1/carts - Get all carts

##### GET /api/v1/carts/cartId - Get cart by id

##### POST /api/v1/carts - Create new cart

##### PUT /api/v1/carts/cartId - add Item To Cart

_Add with productId as follows:_
`{
"pId": ""
}`

##### DELETE /api/v1/carts/cartId/productId - delete Item From Cart

_Delete with productId as follows:_
`{
"pId": ""
}`

##### DELETE /api/v1/carts/cartId - Delete cart (by id)

_Delete with cartId as follows:_
`{
"cartId": ""
}`

---

## Screenshot from project:
![Demonstration of project](https://angelicareutersward.se/Images/mongoDbWebshop/MongoDbWebshop.png?raw=true "MongoDb Webshop")
