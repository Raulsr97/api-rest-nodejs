const express = require('express')
const ProductsService = require('../services/products.service')

const router = express.Router()
// creamos una nueva instancia del servicio de productos
const service = new ProductsService()


// Solicitud para obtener productos
router.get('/', (req, res) =>  {
  // Obteniendo una lista de productos directamente del servicio
  const products = service.find()
  // Retorna el array de productos en formato json
  res.json(products)
})

// Los endpoints de forma especifica deben ir antes de los que son de forma dinámica para evitar choques entre endpoints
router.get('/filter', (req, res) => {
  res.send('soy un filter')
})

// Esta solicitud responde con un producto en especifico
router.get('/:id', (req, res) => {
  const { id } = req.params
  // Obtengo el producto directamente del servicio
  const product = service.findOne(id)
  res.json(product)
})

// Solicitud para crear un nuevo producto
router.post('/', (req, res) => {
  // Almacenamos el cuerpo de la solictud
  const body = req.body
  const newProduct = service.create(body)
  // respondemos en json con un mensaje de creacion y la data con la que se va a crear el producto
  res.status(201).json(newProduct)
})

// Actualizar un producto
router.put('/:id', (req, res) => {
  const { id } = req.params
  const body = req.body
  const updatedProduct = service.update(id, body)
  res.json(updatedProduct)
})

// Eliminar un producto
router.delete('/:id', (req, res) => {
  const { id } = req.params
  const rta = service.delete(id)
  res.json(rta)
})

module.exports = router
