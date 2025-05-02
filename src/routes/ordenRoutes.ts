import { Router } from "express";
import { OrdenController } from "../controllers/ordenController";

class OrdenRoutes {

  public router: Router;
  private ordenController: OrdenController;

  constructor() {
    this.router = Router();
    this.ordenController = new OrdenController();
    this.config();
  }

  private config(): void {
  
    this.router.get('/', this.ordenController.list);
    this.router.get('/:id', this.ordenController.getById);
    this.router.post('/', this.ordenController.add);
  }
}

const ordenRoutes = new OrdenRoutes();
export default ordenRoutes.router;
