import { Request, Response } from "express";
import validator from "validator";
import model from '../models/authModelo';
import { utils } from "../utils/utils";
import jwt from "jsonwebtoken";


class AuthController {

    public async iniciarSesion(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            if (!email || !password || validator.isEmpty(email.trim()) || validator.isEmpty(password.trim())) {
                return res.status(400).json({ message: "Los campos son requeridos", code: 1 });
            }
    
            const lstUsers = await model.getuserByEmail(email);
            if (lstUsers.length <= 0) {
                return res.status(404).json({ message: "El usuario y/o contraseña es incorecto", code: 1 });
            }
    
            const user = lstUsers[0];
    
            let result = utils.checkPassword(password, user.password);
            result.then((value)=>{
            
            if (value) {
                const newUser = {
                    email:lstUsers[0].email,
                    password: lstUsers[0].password,
                    role: lstUsers[0].role
                }
                console.log (process.env.SECRET)
                const env = require('dotenv').config();
                let token = jwt.sign(newUser,process.env.SECRET, {expiresIn: '1h'})
                return res.json({ message: "Autenticación correcta", token,code: 0 });
            } else {
                return res.json({ message: "Contraseña incorrecta", code: 1 });
            }
        })

        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: `Error en el servidor: ${error.message}` });
        }
    }
    
    

    public async saludar(req: Request, res: Response) {
        const { nombre, correo, edad } = req.body;
    
        if (!nombre || !correo || !edad) {
            return res.status(400).json({ message: "Por favor, proporcione todos los campos", code: 1 });
        }
    
        return res.json({ nombre, correo, edad });
    }
}

export const authController = new AuthController();
