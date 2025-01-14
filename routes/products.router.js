const express = require('express')
const ProductsService = require('../services/products.service')
const validatorHandler = require('../middlewares/validator.handler')
const { getProductSchema, updateProductSchema, createProductSchema } = require('../schemas/product.schema')

const router = express.Router()
// creamos una nueva instancia del servicio de productos
const service = new ProductsService()


// Solicitud para obtener productos
router.get('/', async (req, res) =>  {
  // Obteniendo una lista de productos directamente del servicio
  const products = await service.find()
  // Retorna el array de productos en formato json
  res.json(products)
})

// Los endpoints de forma especifica deben ir antes de los que son de forma dinámica para evitar choques entre endpoints
router.get('/filter', (req, res) => {
  res.send('soy un filter')
})

// Esta solicitud responde con un producto en especifico
router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params
    // Obtengo el producto directamente del servicio
    const product = await service.findOne(id)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

// Solicitud para crear un nuevo producto
router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
  try {
    // Almacenamos el cuerpo de la solictud
    const body = req.body
    const newProduct = await service.create(body)
    // respondemos en json con un mensaje de creacion y la data con la que se va a crear el producto
    res.status(201).json(newProduct)
  } catch (err) {
    next(err)
  }

})

// Actualizar un producto
router.put('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const updatedProduct = await service.update(id, body)
    res.json(updatedProduct)
  } catch (err) {
    next(err)
  }

})

// Eliminar un producto
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const rta = await service.delete(id)
    res.json(rta)
  } catch (err) {
    next(err)
  }

})

module.exports = router
