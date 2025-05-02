import pool from '../config/connection';

class OrdenModel {
  // Listar todas las órdenes
  public async list() {
    const result = await pool.then(async (connection) => {
      return await connection.query(
        "SELECT id, usuario_id, fecha, total, estado FROM tbl_orden"
      );
    });
    return result;
  }

  // Obtener una orden por ID
  // Obtener una orden por ID con detalles de productos
public async getById(id: number) {
  const result = await pool.then(async (connection) => {
    const orden = await connection.query(
      "SELECT * FROM tbl_orden WHERE id = ?",
      [id]
    );

    if (!orden[0]) {
      return null;
    }

    // Obtener detalles de productos en la orden
    const detalles = await connection.query(
      `SELECT d.cantidad, d.precio, p.nombre 
       FROM tbl_ordendetalle d 
       JOIN tbl_producto p ON d.producto_id = p.id 
       WHERE d.orden_id = ?`,
      [id]
    );

    return { ...orden[0], detalles };
  });

  return result;
}


  // Registrar una nueva orden
  public async add(orden: any) {
    const result = await pool.then(async (connection) => {
      const insertResult = await connection.query(
        "INSERT INTO tbl_orden SET ?",
        [orden]
      );
      
      return { insertId: insertResult.insertId };
    });
  
    return result; // Devuelve { insertId: ID }
  }

  // Actualizar estado de una orden
  public async updateStatus(id: number, estado: string) {
    const result = await pool.then(async (connection) => {
      return await connection.query(
        "UPDATE tbl_orden SET estado = ? WHERE id = ?",
        [estado, id]
      );
    });
    return result;
  }

  // Eliminar una orden
  public async delete(id: number) {
    const result = await pool.then(async (connection) => {
      return await connection.query("DELETE FROM tbl_orden WHERE id = ?", [id]);
    });
    return result;
  }

  // Agregar un pago
  public async agregarPago(pago: any) {
    const result = await pool.then(async (connection) => {
      return await connection.query(
        "INSERT INTO tbl_pago (orden_id, metodo_pago, cantidad, estado) VALUES (?, ?, ?, ?)",
        [pago.orden_id, pago.metodo_pago, pago.cantidad, pago.estado]
      );
    });
    return result;
  }
}

const model = new OrdenModel();
export default model;
