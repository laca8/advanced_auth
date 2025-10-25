import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import helmet from "helmet";

import { connectDB } from "./db/connectDB.js";

import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
app.use(
	helmet.contentSecurityPolicy({
		directives: {
			defaultSrc: ["'self'"],
			styleSrc: ["'self'", "https://fonts.googleapis.com", "'unsafe-inline'"],
			fontSrc: ["'self'", "https://fonts.gstatic.com"],
			scriptSrc: ["'self'"],
			imgSrc: ["'self'", "data:"],
			connectSrc: ["'self'"],
		},
	})
);
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:5173");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
	);
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies

app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV == "production") {
	app.use(express.static(path.join(__dirname, "/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "dist", "index.html"));
	});
} else {
	app.get("/", (req, res) => {
		res.send("API is running....");
	});
}

app.listen(PORT, () => {
	connectDB();
	console.log("Server is running on port: ", PORT);
});
