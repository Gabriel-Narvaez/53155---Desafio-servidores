import fs from "fs";

class ProductManager {
  constructor() {
    // Array vacío para almacenar los productos y ruta del archivo donde se guardarán los productos
    this.products = [];
    this.pathFile = "./data/products.json";
  }

  // Función para obtener todos los productos
  async getProducts(limit) {
    //Archivo JSON que contiene los productos
    const productsJson = await fs.promises.readFile(this.pathFile, "utf8");

    // Parsear el JSON y asignarlo al array de productos
    this.products = JSON.parse(productsJson) || [];

    // Retornar la lista de productos
    if (limit !== undefined) {
      return this.products.slice(0, limit);
    } else {
      return this.products;
    }
  }

  // Función para obtener un producto por su ID
  async getProductById(id) {
    // Obtener todos los productos
    await this.getProducts();

    // Buscar el producto por su ID
    const product = this.products.find((product) => product.id === id);

    // Si no se encuentra el producto, mostrar un mensaje de error y retornar
    if (!product) {
      return null;
    }

    // Retornar el producto encontrado
    return product;
  }
}

export default ProductManager;
