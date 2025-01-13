function logErrors (err, req, res, next) {
  console.log(err);
  next(err)
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
}

function boomErrorHandler(err, req, res, next) {
  // Comprueba si el error tiene la propiedad `isBoom` (indicando que es un error Boom).
  if(err.isBoom) {
    // Extrae el objeto `output` del error Boom.
    const { output } = err
    // Establece el código de estado HTTP basado en `output.statusCode`.
    // Devuelve una respuesta JSON con el `output.payload`, que contiene el mensaje del error y otros datos.
    res.status(output.statusCode).json(output.payload)
  } else {
    // Si el error no es un error Boom, pasa el error al siguiente middleware en la cadena.
    next(err)
  }

}

module.exports = { logErrors, errorHandler, boomErrorHandler }
