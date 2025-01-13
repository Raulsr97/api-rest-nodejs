// importamos faker para crear informacion random
const { faker } = require('@faker-js/faker')
// Importamos a boom
const boom = require('@hapi/boom')

// Clase que actua como servicio para gestionar productos
class ProductsService {

  constructor() {
    // Inicializa un array vacío donde se almacenaran los productos
    this.products = []
    // Cada que creemos una instancia del servicio va a generar los 100 productos
    this.generate()
  }

  generate() {
    const limit = 100 // limite de productos
    // ciclo para agregar un producto al array mientras sea menor al limite
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean()
      })
    }
  }

  // Este metodo retorna la lista de productos
  async find() {
    // simulando un evento asíncrono
    return new Promise ((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products)
      }, 2000)
    })
  }

  // Retorna un producto en especifico buscandolo por su id
  async findOne(id) {
    const product = this.products.find(item => item.id === id)
    if(!product) {
      throw boom.notFound('Product not found')
    } else if (product.isBlock) {
      throw boom.conflict('Product is lock')
    }
    return product
  }

  // Metodo para crear un producto mediante cierta data recibida
  async create(data) {
    // Cada que se reciba un producto se va a crear un objeto con un id unico y la data recibida
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    }
    // Una vez recibido se va a guardar en el array de productos
    this.products.push(newProduct)
    // Se retorna el producto creado
    return newProduct
  }

  // Actualizar un producto, recibe un id y los cambios como parámetros
  async update(id, changes) {
     // Busca la poscion del producto en el array mediante su id
     const index = this.products.findIndex(item => item.id === id)
     // Si el producto no se encuentra arroja un error (la posicion -1 inidica que no existe el elemento)
     if (index === -1) {
      throw boom.notFound('Product not found')
     }
     // una vez validado que el producto si se encuentra en el array se guarda en una variable llamada product
     const product = this.products[index]

     // guarda la informacion que existe en el producto original y le agrega las modificaciones realizadas
     this.products[index] = {
      ...product,
      ...changes
     }
     // Retorna el producto actualizado
     return this.products[index]
  }

  // Metodo para eliminar un producto mediante un id
  async delete(id) {
    // Busca la poscion del producto en el array mediante su id
     const index = this.products.findIndex(item => item.id === id)
     // Si el producto no se encuentra arroja un error (la posicion -1 inidica que no existe el elemento)
     if (index === -1) {
      throw boom.notFound('Product not found')
     }
     // Elimina el producto del array con el metodo splice() de los arrays
     this.products.splice(index, 1)
     // Retorna el id del producto eliminado.
     return { id }
  }
}

module.exports = ProductsService
