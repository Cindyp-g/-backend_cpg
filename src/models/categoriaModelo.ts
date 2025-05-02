import pool from "../config/connection";

class CategoriaModel {
  public async list() {
    const result = await pool.then(async (connection) => {
      return await connection.query("SELECT * FROM tbl_categoria");
    });
    return result;
  }

  public async add(categoria: any) {
    const result = await pool.then(async (connection) => {
        return await connection.query(
            "INSERT INTO tbl_categoria SET ?", [categoria]
        );
    });
    return result;
}
  

public async update(categoria: any) {
  const update = "UPDATE tbl_categoria SET nombre = ?, imagen_url = ? WHERE id = ?";    
  console.log("Update " + update);
  const result = await pool.then(async (connection) => {
    return await connection.query(update, [categoria.nombre, categoria.imagen_url, categoria.id]);
  });
  return result;
}


  public async delete(id: number) {
    const result = await pool.then(async (connection) => {
      return await connection.query("DELETE FROM tbl_categoria WHERE id=?", [id]);
    });
    return result;
  }

  public async getProductsByCategory(categoryId: number) {
    const result = await pool.then(async (connection) => {
      return await connection.query(
        "SELECT * FROM tbl_producto WHERE categoria_id = ?",
        [categoryId]
      );
    });
    return result;
  }
  
}

const model = new CategoriaModel();
export default model;