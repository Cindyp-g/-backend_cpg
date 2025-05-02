import { Router } from "express";
import { carritoController } from "../controllers/carritoController";

class carritoROutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  private config() {
    this.router.get("/:id_usuario", carritoController.list);
    this.router.post("/", carritoController.add);
    this.router.put("/", carritoController.update);
    this.router.delete("/", carritoController.delete);
    

  }
}

const cartRoutes = new carritoROutes();
export default cartRoutes.router;
