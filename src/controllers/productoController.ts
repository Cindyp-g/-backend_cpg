import { Request, Response } from "express";
import model from "../models/productoModelo";

class ProductoController {
  getById(arg0: string, getById: any) {
      throw new Error("Method not implemented.");
  }

  // Listar productos
  public async list(req: Request, res: Response) {
    try {
      const productos = await model.list(); 
      return res.json({ message: "Listado de Productos", productos, code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `Error: ${error.message}`, code: 1 });
    }
  }

  // Agregar un nuevo producto
  public async add(req: Request, res: Response) {
    try {
      const { nombre, descripcion, precio, stock,categoria_id,imagen_url } = req.body;

      if (!nombre || precio === undefined || stock === undefined || !categoria_id=== undefined || imagen_url=== undefined) {
        return res.status(400).json({ message: "Faltan campos obligatorios", code: 2 });
      }

      const nuevoProducto = { nombre, descripcion, precio, stock, categoria_id,imagen_url };
      const result = await model.add(nuevoProducto); 

      return res.json({ message: "Producto agregado correctamente", result, code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `Error: ${error.message}`, code: 3 });
    }
  }

  // Modificar un producto
  public async update(req: Request, res: Response) {
    try {
      const { id, nombre, descripcion, precio, stock, categoria_id,imagen_url } = req.body;

      if (!id || !nombre || precio === undefined || stock === undefined || !categoria_id=== undefined || imagen_url=== undefined) {
        return res.status(400).json({ message: "Faltan campos obligatorios", code: 2 });
      }

      const producto = { id, nombre, descripcion, precio, stock, categoria_id,imagen_url };
      const result = await model.update(producto); 

      return res.json({ message: "Producto actualizado correctamente", result, code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `Error: ${error.message}`, code: 3 });
    }
  }

  // Eliminar un producto
  // Eliminar un producto
public async delete(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id); 

    if (!id) {
      return res.status(400).json({ message: "Falta el ID del producto", code: 2 });
    }

    const result = await model.delete(id);
    return res.json({ message: "Producto eliminado correctamente", result, code: 0 });
  } catch (error: any) {
    return res.status(500).json({ message: `Error: ${error.message}`, code: 3 });
  }
}
}

export const productoController = new ProductoController();
