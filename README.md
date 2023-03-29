# assignment-API-mongoDB_RestAPI-Webshop

## Short description:
My second individual assignment in my API-development course was creating a MongoDb (+ mongoose) REST-API for a webshops products & shoppingcarts.

I used Postman for my routes (see routes below).

Frontend developer studies, Medieinstitutet, Stockholm.

---

## Screenshot from project:
![Demonstration of project](https://angelicareutersward.se/Images/mongoDbWebshop/MongoDbWebshop.png?raw=true "MongoDb Webshop")

---

## Techniques used
![VSCode badge](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white/to/img.png)
![HTML5 badge](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white/to/img.png)
![JavaScript badge](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E/to/img.png)
![GitHub badge](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white/to/img.png)
![MongoDb](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)

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
