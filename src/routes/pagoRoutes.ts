import { Router } from "express";
import { PagoController } from "../controllers/pagoController";

class pagoRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  private config() {
    this.router.post("/", PagoController.add);   // Registrar pago
    this.router.get("/:pedido_id", PagoController.list); // Listar pagos de un pedido
  }
}

const PagoRoutes = new pagoRoutes();
export default PagoRoutes.router;
