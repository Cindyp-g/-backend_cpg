import pool from '../config/connection';

class pagoModel {
  // Registrar un pago
  public async add(pago: any) {
    const result = await pool.then(async (connection) => {
      return await connection.query(
        "INSERT INTO tbl_pago SET ?", [pago]
      );
    });
    return result;
  }

  // Listar pagos de un pedido
  public async list(pedido_id: number) {
    const result = await pool.then(async (connection) => {
      return await connection.query(
        "SELECT * FROM tbl_pago WHERE orden_id = ?", [pedido_id]
      );
    });
    return result;
  }

  // Obtener stock disponible de un producto
public async getStock(producto_id: number) {
  const query = `SELECT stock FROM tbl_producto WHERE id = ?;`;
  const result = await pool.then(async (connection) => {
      const [rows]: any = await connection.query(query, [producto_id]);
      return rows.length > 0 ? rows[0].stock : null;
  });
  return result;
}

}

const model = new pagoModel();
export default model;
