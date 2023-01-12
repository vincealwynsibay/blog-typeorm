import express from "express";
import "dotenv/config";

const app = express();
app.use(express.json());

app.listen(5000, () => {
	console.log("Server is running on http://localhost:5000/");
});
