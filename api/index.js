// import "./loadEnv.js";

// import express from "express";
// import cors from "cors";
// import { getFullStats } from "../src/controllers/statsController.js";
// import { renderStats } from "../src/renderers/statsRenderer.js";
// import { getStatsSVG } from "../src/controllers/svgController.js";
// import { getTrophySVG } from "../src/controllers/trophyController.js";
// import { getStreakSVG } from "../src/controllers/streakController.js";
// import { getHeatmapSVG } from "../src/controllers/heatmapController.js";
// import { getLanguageSVG } from "../src/controllers/languageController.js";
// import { getBadgeSVG } from "../src/controllers/badgeController.js";
// import { getBannerSVG } from "../src/controllers/bannerController.js";
// import { getRepoHealth } from "../src/controllers/repoHealthController.js";
// import { getProductivityScore } from "../src/controllers/productivityController.js";
// import { getCareerRecommendation } from "../src/controllers/careerController.js";
// import { getAISummary } from "../src/controllers/aiSummaryController.js";
// import { getProjectShowcase } from "../src/controllers/projectShowcaseController.js";


// if (!process.env.GITHUB_TOKEN) {
//     console.error("ERROR: GitHub token not loaded.");
//     process.exit(1);
// } else {
//     console.log("Token loaded: YES");
//     console.log("GitHub Auth Header Preview:", `token ${process.env.GITHUB_TOKEN.slice(0, 8)}...`);
// }

// const app = express();
// app.use(express.static("public"));


// app.get("/", (req, res) => {
//     res.send("GitHub Gadget Engine is running");
// });

// app.get("/api/stats", async (req, res) => {
//     try {
//         const stats = await getFullStats(req);
//         const svg = renderStats(stats, req.query.theme);

//         res.setHeader("Content-Type", "image/svg+xml");
//         res.status(200).send(svg);

//     } catch (err) {
//         console.error("Error in /api/stats:", err.response?.data || err.message || err);
//         res.status(500).send("Failed to generate stats");
//     }
// });

// app.get("/api/stats-card", getStatsSVG);
// app.get("/api/trophies", getTrophySVG);
// app.get("/api/streak", getStreakSVG);
// app.get("/api/heatmap", getHeatmapSVG);
// app.get("/api/languages", getLanguageSVG);
// app.get("/api/badges", getBadgeSVG);
// app.get("/api/banner", getBannerSVG);
// app.get("/api/repo-health", getRepoHealth);
// app.get("/api/productivity", getProductivityScore);
// app.get("/api/career", getCareerRecommendation);
// app.get("/api/ai-summary", getAISummary);
// app.get("/api/project-showcase", getProjectShowcase);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


import express from "express";
import cors from "cors";
import { Analytics } from "@vercel/analytics/next"
import { getFullStats } from "../src/controllers/statsController.js";
import { renderStats } from "../src/renderers/statsRenderer.js";
import { getStatsSVG } from "../src/controllers/svgController.js";
import { getTrophySVG } from "../src/controllers/trophyController.js";
import { getStreakSVG } from "../src/controllers/streakController.js";
import { getHeatmapSVG } from "../src/controllers/heatmapController.js";
import { getLanguageSVG } from "../src/controllers/languageController.js";
import { getBadgeSVG } from "../src/controllers/badgeController.js";
import { getBannerSVG } from "../src/controllers/bannerController.js";
import { getRepoHealth } from "../src/controllers/repoHealthController.js";
import { getProductivityScore } from "../src/controllers/productivityController.js";
import { getCareerRecommendation } from "../src/controllers/careerController.js";
import { getAISummary } from "../src/controllers/aiSummaryController.js";
import { getProjectShowcase } from "../src/controllers/projectShowcaseController.js";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.send("GitHub Gadget Engine is running on Vercel");
});

app.get("/api/stats", async (req, res) => {
    try {
        const stats = await getFullStats(req);
        const svg = renderStats(stats, req.query.theme);

        res.setHeader("Content-Type", "image/svg+xml");
        res.status(200).send(svg);
    } catch (err) {
        console.error("Error in /api/stats:", err.message);
        res.status(500).send("Failed to generate stats");
    }
});

app.get("/api/stats-card", getStatsSVG);
app.get("/api/trophies", getTrophySVG);
app.get("/api/streak", getStreakSVG);
app.get("/api/heatmap", getHeatmapSVG);
app.get("/api/languages", getLanguageSVG);
app.get("/api/badges", getBadgeSVG);
app.get("/api/banner", getBannerSVG);
app.get("/api/repo-health", getRepoHealth);
app.get("/api/productivity", getProductivityScore);
app.get("/api/career", getCareerRecommendation);
app.get("/api/ai-summary", getAISummary);
app.get("/api/project-showcase", getProjectShowcase);
app.use(Analytics);
/* 🚫 DO NOT USE app.listen() */
export default app;
