import { Request, Response } from "express";
import model from "../models/pagoModel";

class pagoController {
  // Registrar un pago
  public async add(req: Request, res: Response) {
    try {
      const { orden_id, metodo_pago, estado } = req.body;

      if (!orden_id || !metodo_pago|| !estado) {
        return res.status(400).json({ message: "Faltan campos obligatorios", code: 2 });
      }

      const result = await model.add({ orden_id, metodo_pago, estado });

      return res.json({ message: "Pago registrado correctamente", result, code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `Error: ${error.message}`, code: 3 });
    }
  }

  // Listar pagos de un pedido
  public async list(req: Request, res: Response) {
    try {
      const { orden_id } = req.params;

      if (!orden_id) {
        return res.status(400).json({ message: "Falta orden_id", code: 2 });
      }

      const pagos = await model.list(Number(orden_id));
      return res.json({ message: "Métodos de pago", pagos, code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `Error: ${error.message}`, code: 1 });
    }
  }
}

export const PagoController = new pagoController();
