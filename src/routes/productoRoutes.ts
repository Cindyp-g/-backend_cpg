import { Router } from "express";
import { productoController } from "../controllers/productoController";

class ProductoRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get("/", productoController.list);
        this.router.post("/", productoController.add);
        this.router.put("/", productoController.update);
        this.router.delete("/:id", productoController.delete);
    }
}

const productoRoutes = new ProductoRoutes();
export default productoRoutes.router;
