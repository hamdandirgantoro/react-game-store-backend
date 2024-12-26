import express, { Application } from "express";
import { Request, Response } from "express";
import cors from "cors";
import authRoutes from "./app/routes/auth";
import protectedRoutes from "./app/routes/protected";
import { myDataSource } from "./app/config/database";

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const corsOptions = {
  origin: process.env.CORS_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 3000;

// Middleware
app.use(cors());
// app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/api", protectedRoutes);
app.get("/", async (req: Request, res: Response): Promise<void> => {
  res.send("hello");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
