const boom = require('@hapi/boom')

// Define una función llamada `validatorHandler` que actúa como un middleware en Express.
// - `schema`: Esquema de validación (Joi) que se usará para validar los datos.
// - `property`: Es el lugar en el objeto `req` (request) donde se encuentran los datos a validar,
//   como `body`, `params`, o `query`.
function validatorHandler (schema, property) {
  // Devuelve un middleware (una función) que recibirá `req`, `res`, y `next` como parámetros.
  return (req, res, next) => {
    // Obtiene los datos de `req` según el valor de `property` (por ejemplo, `req.body`).
    // Esto permite validar diferentes partes de la solicitud (como cuerpo, parámetros o query).
    const data = req[property]
    // Valida los datos usando el esquema proporcionado.
    // - `schema.validate(data)` devuelve un objeto que contiene:
    //   - `value`: Los datos validados.
    //   - `error`: Un error si la validación falla.
    const { error } = schema.validate(data, { abortEarly: false})
    // Si hay un error en la validación, entra en esta condición.
    if (error) {
      next(boom.badRequest(error))
    }
    // Si no hay errores en la validación, llama a `next()` para pasar el control al siguiente middleware.
    next()
  }
}

module.exports = validatorHandler
