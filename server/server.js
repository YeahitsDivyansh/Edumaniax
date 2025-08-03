import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
import financeRoutes from "./routes/financeRoutes.js";
import DMRoutes from "./routes/DMRoutes.js";
import communicationRoutes from "./routes/communicationRoutes.js";
import computersRoutes from "./routes/computersRoutes.js";
import entreprenerushipRoutes from "./routes/entreprenerushipRoutes.js";
import envirnomentRoutes from "./routes/envirnomentRoutes.js";
import lawRoutes from "./routes/lawRoutes.js";
import leadershipRoutes from "./routes/leadershipRoutes.js";
import SELRoutes from "./routes/SELRoutes.js";
import performanceRoutes from './routes/performanceRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS for all origins
app.use(cors());
app.use(express.json());


app.use("/", userRoutes);
app.use("/finance", financeRoutes);
app.use("/digital-marketing", DMRoutes);
app.use("/communication", communicationRoutes);
app.use("/computers", computersRoutes);
app.use("/entrepreneruship", entreprenerushipRoutes); 
app.use("/envirnoment", envirnomentRoutes);
app.use("/law", lawRoutes); 
app.use("/leadership", leadershipRoutes);
app.use("/sel", SELRoutes);
app.use("/performance", performanceRoutes);
app.use("/blogs", blogRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
