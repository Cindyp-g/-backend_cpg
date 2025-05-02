import pool from "../config/connection";

class CarritoModelo {
    // Listar los productos en el carrito de un usuario
    public async getcarritotByUser(id_usuario: number) {
        const result = await pool.then(async (connection) => {
            return await connection.query(
                "SELECT c.id, c.id_usuario, c.id_producto, c.cantidad, p.nombre, p.precio, p.stock " +
                "FROM tbl_carrito c " +
                "JOIN tbl_producto p ON c.id_producto = p.id " +
                "WHERE c.id_usuario = ?", 
                [id_usuario]
            );
        });
        return result;
    }

    public async list(userId: number) {
        const result = await pool.then(async (connection) => {
            return await connection.query(
                "SELECT c.id, c.id_usuario, c.id_producto, c.cantidad, p.nombre, p.precio, p.stock " +
                "FROM tbl_carrito c " +
                "JOIN tbl_producto p ON c.id_producto = p.id"
            );
        });
        return result;
    }

    // Agregar un producto al carrito
    public async add(carrito: any) {
        const result = await pool.then(async (connection) => {
            return await connection.query(
                "INSERT INTO tbl_carrito SET ?", [carrito]
            );
        });
        return result;
    }

    // Actualizar la cantidad de un producto en el carrito
    public async update(carrito: any) {
        const result = await pool.then(async (connection) => {
            return await connection.query(
                "UPDATE tbl_carrito SET cantidad = ? WHERE id_usuario = ? AND id_producto = ?", 
                [carrito.cantidad, carrito.id_usuario, carrito.id_producto]
            );
        });
        return result;
    }

    // Eliminar un producto del carrito
    public async delete(id_usuario: number, id_producto: number) {
        return await pool.then(async (connection) => {
            const result = await connection.query(
                "DELETE FROM tbl_carrito WHERE id_usuario = ? AND id_producto = ?", 
                [id_usuario, id_producto]
            );
            console.log("Resultado de la eliminación:", result);
            return result;
        });
    }
    
}

const model = new CarritoModelo();
export default model;
