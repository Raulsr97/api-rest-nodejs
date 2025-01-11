const express = require('express')

const router = express.Router()

// Solicitud que muestra varios niveles de enrutamiento
router.get('/:categoryId/product/:productId', (req, res) => {
  const { categoryId, productId } = req.params

  res.json({
    categoryId,
    productId
  })
})

module.exports = router
