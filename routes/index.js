const express = require('express')
const productsRouter = require('./products.router')
const usersRouter = require('./users.router')
const categoriesRouter = require('./categories.router')


//configura las rutas principales de la aplicación y las asocia con los routers específicos que manejaran las rutas
function routerApi(app) {
  const router = express.Router()
  app.use('/api/v1', router)

  router.use('/products', productsRouter)
  router.use('/users', usersRouter)
  router.use('/categories', categoriesRouter)
}

module.exports = routerApi
