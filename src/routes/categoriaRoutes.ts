import { Router } from "express";
import { categoriaController } from "../controllers/categoriaController";

class CategoriaRoutes {
    
    public router: Router;


    constructor() {
        this.router = Router();
        this.config();
    }


    private config() {
        
        this.router.get('/', categoriaController.list);        
        this.router.post('/', categoriaController.add);
        this.router.put('/:id', categoriaController.update);
        this.router.delete('/:id', categoriaController.delete);
        this.router.get('/:id/products', categoriaController.getProducts)
        
        
    }
}
const categoriaRoutes = new CategoriaRoutes();
export default categoriaRoutes.router;
