import pool from '../config/connection';

class ProductoModelo {
    // Listar todos los productos
    public async list() {
        const result = await pool.then(async (connection) => {
            return await connection.query(
                "SELECT id, nombre, descripcion, precio, stock,imagen_url, categoria_id FROM tbl_producto"
            );
        });
        return result;
    }

    // Agregar un nuevo producto
    public async add(producto: any) {
        const result = await pool.then(async (connection) => {
            return await connection.query(
                "INSERT INTO tbl_producto SET ?", [producto]
            );
        });
        return result;
    }

    // Actualizar un producto
    public async update(producto: any) {
        const update = "UPDATE tbl_producto SET nombre='" + producto.nombre +
        "', descripcion='" + producto.descripcion +
        "', precio=" + producto.precio +
        ", stock=" + producto.stock +
        ", categoria_id=" + producto.categoria_id +
        ", imagen_url='" + producto.imagen_url + "'" +  
        " WHERE id=" + producto.id;    
        console.log("Update " + update);
        const result = await pool.then(async (connection) => {
            return await connection.query(update);
        });
        return result;
    }

    // Eliminar un producto
    public async delete(id: number) {
        console.log('Eliminando producto');
        const result = await pool.then(async (connection) => {
            return await connection.query(
                "DELETE FROM tbl_producto WHERE id = ?", [id]
            );
        });
        return result;
    }

    // Obtener el stock de un producto por su ID
    public async getStock(id: number) {
        const result: any = await pool.then(async (connection) => {
            return await connection.query(
                "SELECT stock FROM tbl_producto WHERE id = ?", [id]
            );
        });

        if (result.length > 0) {
            return result[0].stock; 
        }
        return null; 
    }
}

const model = new ProductoModelo();
export default model;
