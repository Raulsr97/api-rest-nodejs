// Importamos faker para poder trabajar con data de prueba
const { faker } = require('@faker-js/faker')
// Importamos express
const express = require('express')
// Creamos una intancia de express, sirve para manejar rutas, solicitudes y respuestas
const app = express()
// Puerto donde va a correr la aplicacion
const port = 3000

// manejo de una solicitud tipo get
app.get('/', (req, res) => {
  // Respuesta de la solicitud
  res.send('servidor en express')
})

// se genera un nuevo endpoint para ver como funciona el routing
app.get('/nuevo-endpoint', (req, res) => {
  res.send('nuevo endpoint')
})

// ejemplo de como se maneja una entrada a una ruta de productos, respondiendo con un código de estado y un json(por lo general se responde de esta manera)
app.get('/products', (req, res) =>  {
  const products = []
  for (let index = 0; index < 100; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: faker.commerce.price()
    })
  }
  res.json(products)
})

// Esta solicitud responde con un producto en especifico
app.get('/products/:id', (req, res) => {
  const { id } = req.params
  res.json({
    id,
    name: 'magazine',
    price: '350',
    isAvailable: true
  })
})

// Solicitud con query params(opcionales), solo muestra como funcionan
app.get('/users', (req, res) => {
  const { limit, offset } = req.query

  if(limit && offset) {
    res.json({
      limit,
      offset
    })
  } else {
    res.send('No hay parametros')
  }
})

// Solicitud que muestra varios niveles de enrutamiento
app.get('/categories/:categoryId/product/:productId', (req, res) => {
  const { categoryId, productId } = req.params

  res.json({
    categoryId,
    productId
  })
})

// Inicia el servidor en un puerto específico
app.listen(port, () => {
  console.log(`Esuchando en el puerto ${port}`);
})
