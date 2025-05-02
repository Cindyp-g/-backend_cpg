import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import usuarioRoutes from "./routes/usuarioRoutes";
import productoRoutes from "./routes/productoRoutes";
import categoriaRoutes from "./routes/categoriaRoutes";
import carritoRoutes from "./routes/carritoRoutes";
import ordenRoutes from "./routes/ordenRoutes";

class Server {
    private app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.app.listen(this.app.get("port"), () => {
            console.log("Server on port", this.app.get("port"));
        });
    }

    private config(): void {
        this.app.set("port", process.env.PORT || 3000);

        // Middleware
        this.app.use(morgan("dev"));
        this.app.use(cors());
        this.app.use(express.json());  // Express ya tiene esta funcionalidad integrada
        this.app.use(express.urlencoded({ extended: false }));  // No es necesario usar body-parser
    }

    private routes(): void {
        this.app.use("/", authRoutes); 
        this.app.use("/usuario", usuarioRoutes);
        this.app.use("/producto", productoRoutes);
        this.app.use("/categoria", categoriaRoutes);
        this.app.use("/carrito", carritoRoutes);
        this.app.use("/orden", ordenRoutes);
    }
}

const server = new Server();
