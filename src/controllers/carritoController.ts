import { Request, Response } from "express";
import model from "../models/carritoModelo";
import productoModel from "../models/productoModelo"; // Importar modelo de productos

class CarritoController {
  // Listar productos en el carrito de un usuario
  public async list(req: Request, res: Response) {
    try {
      const { id_usuario } = req.params;
      const userId = Number(id_usuario);

      if (isNaN(userId) || userId <= 0) {
        return res.status(400).json({ message: "ID de usuario inválido", code: 2 });
      }

      const carrito = await model.list(userId);
      return res.json({ message: "Productos en el carrito", carrito, code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `Error: ${error.message}`, code: 1 });
    }
  }

  // Agregar un producto al carrito
  public async add(req: Request, res: Response) {
    try {
      const { id_usuario, id_producto, cantidad } = req.body;

      if (!id_usuario || !id_producto || !cantidad) {
        return res.status(400).json({ message: "Faltan campos obligatorios", code: 2 });
      }

      const userId = Number(id_usuario);
      const productId = Number(id_producto);
      const cantidadSolicitada = Number(cantidad);

      if (isNaN(userId) || isNaN(productId) || isNaN(cantidadSolicitada) || cantidadSolicitada <= 0) {
        return res.status(400).json({ message: "Datos inválidos", code: 3 });
      }

      // Obtener el stock disponible del producto
      const stockDisponible = await productoModel.getStock(productId);

      if (stockDisponible === null) {
        return res.status(400).json({ message: "El producto no existe", code: 4 });
      }
      if (cantidadSolicitada > stockDisponible) {
        return res.status(400).json({
          message: `Stock insuficiente. Solo hay ${stockDisponible} unidades disponibles.`,
          code: 5
        });
      }

      const carritoActual = await model.getcarritotByUser(userId);
      const productoEnCarrito = carritoActual.find((item: any) => item.producto_id === productId);
      const cantidadTotal = productoEnCarrito ? productoEnCarrito.cantidad + cantidadSolicitada : cantidadSolicitada;

      if (cantidadTotal > stockDisponible) {
        return res.status(400).json({
          message: `Stock insuficiente. Solo hay ${stockDisponible} unidades disponibles.`,
          code: 5
        });
      }

      const result = await model.add({ id_usuario: userId, id_producto: productId, cantidad: cantidadSolicitada });
      return res.json({ message: "Producto agregado al carrito", result, code: 0 });

    } catch (error: any) {
      return res.status(500).json({ message: `Error: ${error.message}`, code: 3 });
    }
  }

  // Actualizar la cantidad de un producto en el carrito
  public async update(req: Request, res: Response) {
    try {
      const { id_usuario, id_producto, cantidad } = req.body;

      if (!id_usuario || !id_producto || !cantidad) {
        return res.status(400).json({ message: "Faltan campos obligatorios", code: 2 });
      }

      const userId = Number(id_usuario);
      const productId = Number(id_producto);
      const cantidadNueva = Number(cantidad);

      if (isNaN(userId) || isNaN(productId) || isNaN(cantidadNueva) || cantidadNueva <= 0) {
        return res.status(400).json({ message: "Datos inválidos", code: 3 });
      }

      // Obtener el stock disponible
      const stockDisponible = await productoModel.getStock(productId);

      if (stockDisponible === null) {
        return res.status(400).json({ message: "El producto no existe", code: 4 });
      }

      // Verificar si la cantidad solicitada excede el stock
      if (cantidadNueva > stockDisponible) {
        return res.status(400).json({
          message: `Stock insuficiente. Solo hay ${stockDisponible} unidades disponibles.`,
          code: 5
        });
      }

      const result = await model.update({ usuario_id: userId, id_producto: productId, cantidad: cantidadNueva });
      return res.json({ message: "Cantidad actualizada en el carrito", result, code: 0 });

    } catch (error: any) {
      return res.status(500).json({ message: `Error: ${error.message}`, code: 3 });
    }
  }

  // Eliminar un producto del carrito
  public async delete(req: Request, res: Response) {
    console.log("Datos recibidos en DELETE:", req.body);
  
    const { id_usuario, id_producto } = req.body;
    if (!id_usuario || !id_producto) {
      return res.status(400).json({ message: "Faltan campos obligatorios", code: 2 });
    }
  
    const userId = Number(id_usuario);
    const productId = Number(id_producto);
  
    if (isNaN(userId) || isNaN(productId)) {
      return res.status(400).json({ message: "Datos inválidos", code: 3 });
    }
  
    const result = await model.delete(userId, productId);
    console.log("Resultado de la eliminación:", result);
  
    return res.json({ message: "Producto eliminado del carrito", result, code: 0 });
  }
  
}

export const carritoController = new CarritoController();
