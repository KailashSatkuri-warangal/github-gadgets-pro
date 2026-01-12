import { getFullStats } from "./statsController.js";
import { renderHeatmap } from "../renderers/heatmapRenderer.js";

export const getHeatmapSVG = async (req, res) => {
    try {
        const stats = await getFullStats(req);
        const svg = renderHeatmap(stats, req.query.theme);

        res.setHeader("Content-Type", "image/svg+xml");
        res.send(svg);
    } catch (err) {
        console.error("Heatmap Error:", err.message);
        res.status(500).send("Failed to generate heatmap");
    }
};
