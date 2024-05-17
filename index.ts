import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import stringsController from "./controllers/strings";
import articleController from "./controllers/articleController";
import commentController from "./controllers/commentController";
import comment from "./models/comment";
import authorController from "./controllers/authorController";

// Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://kermoohno:qwertyqwerty@cluster0.hz9iewh.mongodb.net/");
const database = mongoose.connection;

// Database connection event listeners
database.on('error', (error) => {
  console.error('Database connection error:', error);
  process.exit(1); // Exit the application if database connection fails
});

database.once('connected', () => {
  console.log('Database connected');
});

// Create Express app
const app: Express = express();

app.use(express.json());

// Define routes
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use('/', stringsController);
app.use('/', articleController);
app.use('/', commentController);
app.use('/', authorController);

// Start the server
const PORT = process.env.PORT || 3000; // Use environment variable PORT if available
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
