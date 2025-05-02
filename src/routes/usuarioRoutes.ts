import { Router } from "express";
import { usuarioController } from "../controllers/usuarioController";


class UsuarioRoutes {


    public router: Router;


    constructor() {
        this.router = Router();
        this.config();
    }


    private config() {
        
        this.router.get('/', usuarioController.list);        
        this.router.post('/', usuarioController.add);
        this.router.put('/', usuarioController.update);
        this.router.delete('/:id', usuarioController.delete);
        this.router.post('/email', usuarioController.getUserByEmail);

        
        
    }
}
const usuarioRoutes = new UsuarioRoutes();
export default usuarioRoutes.router;
