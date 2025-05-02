import pool from '../config/connection';

class UsuarioModelo {

    // Listar usuarios (ahora muestra nombre, email, sin mostrar contraseñas)
    public async list() {
        const result = await pool.then(async (connection) => {
            return await connection.query(
                "SELECT u.id,u.name, u.email, u.role FROM tbl_usuario u"
            );
        });
        return result;
    }

    // Agregar nuevo usuario
    public async add(usuario: any) {
        const result = await pool.then(async (connection) => {
            return await connection.query(
                "INSERT INTO tbl_usuario (name, email, password, role) VALUES (?, ?, ?, ?)", 
                [usuario.name, usuario.email, usuario.password, usuario.role]
            );
        });
        
    }

 
    public async update(usuario: any) {
        const update = `
            UPDATE tbl_usuario
            SET name = ?, password = ?, role = ?
            WHERE email = ?
        `;
        console.log("Update:", update);
        const result = await pool.then(async (connection) => {
            return await connection.query(update, [usuario.name, usuario.password, usuario.role, usuario.email]);
        });
        return result;
    }

    // Eliminar usuario por id
    public async delete(id: string) {
        console.log('Eliminando usuario con id:', id);
        const result = await pool.then(async (connection) => {
            return await connection.query(
                "DELETE FROM tbl_usuario WHERE id = ?", [id]
            );
        });
        return result;
    }

    public async getUserByEmail(email: string) {
        try {
          let query = "SELECT * FROM tbl_usuario WHERE email = ?";
          const result = await pool.then(async (connection) => {
            return await connection.query(query, [email]);  
          });
          console.log("Resultado de la consulta:", result);
      
          return result;
        } catch (error) {
          console.error("Error en la consulta SQL:", error); 
          throw error;
        }
      }
      

    
}

const model = new UsuarioModelo();
export default model;
