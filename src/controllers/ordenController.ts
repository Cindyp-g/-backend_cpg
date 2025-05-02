import { Request, Response } from 'express';
import pool from '../config/connection';

export class OrdenController {
  
  // Listar todos los pedidos
  public async list(req: Request, res: Response): Promise<void> {
    try {
      const result = await pool.then(async (connection) => {
        return await connection.query("SELECT id, usuario_id, fecha, total, estado FROM tbl_orden");
      });
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las órdenes', error });
    }
  }

  // Obtener detalles de una orden específica
  public async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    
    try {
      // Primero obtenemos la orden
      const order = await pool.then(async (connection) => {
        const result = await connection.query("SELECT * FROM tbl_orden WHERE id = ?", [id]);
        return result[0];  // Debería devolver un único objeto de la orden
      });

      if (!order) {
        return res.status(404).json({ message: 'Orden no encontrada' });
      }

      // Luego obtenemos los detalles de la orden
      const orderDetails = await pool.then(async (connection) => {
        const result = await connection.query("SELECT * FROM tbl_ordendetalle WHERE orden_id = ?", [id]);
        return result;
      });

      // Devolvemos la orden junto con los detalles
      res.json({
        ...order,
        detalles: orderDetails
      });

    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los detalles de la orden', error });
    }
  }


    // Crear una nueva orden
  public async add(req: Request, res: Response): Promise<void> {
    const { usuario_id, total, estado, productos } = req.body;
  
    try {
      const result = await pool.then(async (connection) => {
        // Insertar la orden
        const insertResult = await connection.query("INSERT INTO tbl_orden SET ?", {
          usuario_id,
          total,
          estado
        });
  
        const newOrderId = insertResult.insertId;
  

        for (const producto of productos) {
          if (producto.precio == null) {
            throw new Error('El precio del producto no puede ser nulo');
          }
        

          if (!producto.nombre) {
            const [resultProducto] = await connection.query(
              "SELECT nombre FROM tbl_producto WHERE id = ?",
              [producto.id_producto]
            );
            
            producto.nombre = resultProducto.length > 0 ? resultProducto[0].nombre : 'Desconocido';
          }
        
          console.log("Producto a insertar en tbl_ordendetalle:", producto);
        
          await connection.query(
            "INSERT INTO tbl_ordendetalle (orden_id, producto_id, nombre, cantidad, precio) VALUES (?, ?, ?, ?, ?)", 
            [newOrderId, producto.id_producto, producto.nombre, producto.cantidad, producto.precio]
          );
        }
  
        return { insertId: newOrderId };
      });
  
      res.json({
        message: 'Orden registrada correctamente',
        result,
        code: 0
      });
  
    } catch (error) {
      console.error('Error al crear la orden', error);
      res.status(500).json({ message: 'Error al crear la orden', error });
    }
  }
}
  


 