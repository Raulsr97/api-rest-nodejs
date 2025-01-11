const { faker } = require('@faker-js/faker')

class ProductsService {

  constructor() {
    this.products = []
    // Cada que creemos una instancia del servicio va a generar los 100 productos
    this.generate()
  }

  generate() {
    const limit = 100 // limite de productos
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.url()
      })
    }
  }

  find() {
    return this.products
  }

  findOne(id) {
    return this.products.find(item => item.id === id)
  }

  create(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    }
    this.products.push(newProduct)
    return newProduct
  }

  update(id, changes) {
     const index = this.products.findIndex(item => item.id === id)
     if (index === -1) {
      throw new Error('Product not found')
     }
     const product = this.products[index]
     this.products[index] = {
      ...product,
      ...changes
     }
     return this.products[index]
  }

  delete(id) {
     const index = this.products.findIndex(item => item.id === id)
     if (index === -1) {
      throw new Error('Product not found')
     }
     this.products.splice(index, 1)
     return { id }
  }
}

module.exports = ProductsService
