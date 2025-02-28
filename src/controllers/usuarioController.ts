import { Request, Response } from "express";
import model from "../models/usuarioModel"; // Importando el modelo
import { utils } from "../utils/utils";

class UsuarioController {

  // Listar usuarios
public async list(req: Request, res: Response) {
    try {
      const { email, password, role } = req.body;
  
      if (!email || !password || !role) {
        return res.status(400).json({ message: "Faltan campos obligatorios", code: 2 });
      }
  
      const usuarios = await model.list(); 
      return res.json({ message: "Listado de Usuarios", usuarios, code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `Error: ${error.message}`, code: 1 });
    }
  }
  

  // Agregar un nuevo usuario
  public async add(req: Request, res: Response) {
    try {
      const { email, password, role } = req.body;

      if (!email || !password || !role) {
        return res.status(400).json({ message: "Faltan campos obligatorios", code: 2 });
      }
      var encryptedText = await utils.hashPassword(password);
      const nuevoUsuario = { email,password: encryptedText, role };
      const result = await model.add(nuevoUsuario); 

      return res.json({ message: "Usuario agregado correctamente", result, code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `Error: ${error.message}`, code: 3 });
    }
  }

  // Modificar un usuario
  public async update(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const { password } = req.body;

  
      if (!email || !password) {
        return res.status(400).json({ message: "Faltan campos obligatorios", code: 2 });
      }

      var encryptedText = await utils.hashPassword(password);
      const usuario = { email,password: encryptedText };
      const result = await model.update(usuario); 

      return res.json({ message: "Usuario actualizado correctamente", result, code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `Error: ${error.message}`, code: 3 });
    }
  }

  // Eliminar un usuario
  public async delete(req: Request, res: Response) {
    try {
      const { email } = req.body;

      // Validación de existencia de email
      if (!email) {
        return res.status(400).json({ message: "Falta el email del usuario", code: 2 });
      }

      const result = await model.delete(email);
      return res.json({ message: "Usuario eliminado correctamente", result, code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `Error: ${error.message}`, code: 3 });
    }
  }
}

export const usuarioController = new UsuarioController();
