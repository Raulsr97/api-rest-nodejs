// Importamos express
const express = require('express')
// Importamos el archivo index que va a manejar las rutas
const routerApi = require('./routes')
// Creamos una intancia de express, sirve para manejar rutas, solicitudes y respuestas
const app = express()
// Puerto donde va a correr la aplicacion
const port = 3000
// importamos middlewares de error
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

// Middleware para analizar JSON
app.use(express.json())

// manejo de una solicitud tipo get
app.get('/', (req, res) => {
  // Respuesta de la solicitud
  res.send('servidor en express')
})

// se genera un nuevo endpoint para ver como funciona el routing
app.get('/nuevo-endpoint', (req, res) => {
  res.send('nuevo endpoint')
})

routerApi(app)

// Los middlewares de tipo error se deben usar despues de definir el routing
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)


// Inicia el servidor en un puerto específico
app.listen(port, () => {
  console.log(`Esuchando en el puerto ${port}`);
})
