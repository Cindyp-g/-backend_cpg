import { Request, Response } from "express";
import model from "../models/categoriaModelo";

class CategoriaController {
  public async list(req: Request, res: Response) {
    try {
      const categorias = await model.list();
      return res.json({ message: "Listado de Categorías", categorias, code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `Error: ${error.message}`, code: 1 });
    }
  }

  public async add(req: Request, res: Response) {
    try {
      const { nombre,imagen_url } = req.body;

      if (!nombre || imagen_url=== undefined) {
        return res.status(400).json({ message: "Faltan campos obligatorios", code: 2 });
      }

      const nuevaCategoria = { nombre,imagen_url };
      const result = await model.add(nuevaCategoria); 

      return res.json({ message: "Producto agregado correctamente", result, code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `Error: ${error.message}`, code: 3 });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;  // Obtén el ID desde los parámetros de la URL
      const { nombre, imagen_url } = req.body;
  
      if (!id || !nombre || imagen_url === undefined) {
        return res.status(400).json({ message: "Faltan campos obligatorios", code: 2 });
      }
  
      const categoria = { id, nombre, imagen_url };
      const result = await model.update(categoria); 
  
      return res.json({ message: "Producto actualizado correctamente", result, code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `Error: ${error.message}`, code: 3 });
    }
  }
  
  

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params; // Ahora obtenemos el id desde los parámetros de la URL
      if (!id) {
        return res.status(400).json({ message: "Falta el ID de la categoría", code: 2 });
      }
  
      const result = await model.delete(id);
  
      // Si no se encuentra el resultado, enviamos un 404
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Categoría no encontrada", code: 4 });
      }
  
      return res.json({ message: "Categoría eliminada correctamente", result, code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `Error: ${error.message}`, code: 3 });
    }
  }
  

  public async getProducts(req: Request, res: Response) {
    try {
      const { id } = req.params; // Obtener el ID de la categoría desde los parámetros
      const productos = await model.getProductsByCategory(Number(id));
      return res.json({ productos, code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `Error: ${error.message}`, code: 1 });
    }
  }


}

export const categoriaController = new CategoriaController();