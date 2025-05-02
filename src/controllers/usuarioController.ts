import { Request, Response } from "express";
import model from "../models/usuarioModel"; // Importando el modelo
import { utils } from "../utils/utils";

class UsuarioController {

  // Listar usuarios
  public async list(req: Request, res: Response) {
    try {
      const usuarios = await model.list(); 
      return res.json({ message: "Listado de Usuarios", usuarios, code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `Error: ${error.message}`, code: 1 });
    }
  }

  // Agregar un nuevo usuario
  public async add(req: Request, res: Response) {
    try {
      const { name, email, password, role } = req.body;
  
      // Validar campos obligatorios
      if (!name || !email || !password) {
        return res.status(400).json({ message: "Faltan campos obligatorios (name, email, password)", code: 2 });
      }
  
      const userRole = role || "cliente";  
  
      // Encriptar contraseña
      const encryptedText = await utils.hashPassword(password);
      
      // Preparar objeto de usuario
      const nuevoUsuario = { name, email, password: encryptedText, role: userRole };
      
      const result = await model.add(nuevoUsuario); 
  
      return res.json({ message: "Usuario agregado correctamente", result, code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `Error: ${error.message}`, code: 3 });
    }
  }
  

  // Modificar un usuario
public async update(req: Request, res: Response) {
  try {
      const { name, email, password, role } = req.body;

      if (!name || !email || !password || !role) {
          return res.status(400).json({ message: "Faltan campos obligatorios (name, email, password, role)", code: 2 });
      }

      const encryptedPassword = await utils.hashPassword(password); 

      const usuarioActualizado = {
          name,
          email,
          password: encryptedPassword,
          role
      };

      const result = await model.update(usuarioActualizado);
      return res.json({ message: "Usuario actualizado correctamente", result, code: 0 });
  } catch (error: any) {
      return res.status(500).json({ message: `Error: ${error.message}`, code: 3 });
  }
}


  // Eliminar un usuario
  public async delete(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Falta el id del usuario", code: 2 });
    }

    const result = await model.delete(id);
    return res.json({ message: "Usuario eliminado correctamente", result, code: 0 });
  } catch (error: any) {
    return res.status(500).json({ message: `Error: ${error.message}`, code: 3 });
  }
}



// Buscar usuario por email
public async getUserByEmail(req: Request, res: Response) {
  try {
    console.log("Datos recibidos en el backend:", req.body);

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Faltan campos obligatorios (email, password)", code: 2 });
    }

    const usuarios = await model.getUserByEmail(email);
    if (usuarios.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado", code: 404 });
    }

    console.log(usuarios[0].password);
    const isMatch = await utils.checkPassword(password, usuarios[0].password);
    if (!isMatch) {
      return res.status(200).json({ message: "Contraseña incorrecta", code: 200 });
    }

    // Enviar el ID del usuario en la respuesta
    return res.json({ 
      message: "Bienvenido " + usuarios[0].name, 
      code: 200, 
      user: {
        id: usuarios[0].id,
        name: usuarios[0].name,
        email: usuarios[0].email,
        role: usuarios[0].role
      } 
    });

  } catch (error: any) {
    return res.status(500).json({ message: `Error: ${error.message}`, code: 3 });
  }
}

}

export const usuarioController = new UsuarioController();
