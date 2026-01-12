import { getFullStats } from "./statsController.js";
import { renderTrophies } from "../renderers/trophyRenderer.js";

export const getTrophySVG = async (req, res) => {
    try {
        const stats = await getFullStats(req);
        const svg = renderTrophies(stats, req.query.theme);

        res.setHeader("Content-Type", "image/svg+xml");
        res.send(svg);

    } catch (err) {
        console.error("Trophy Error:", err.message);
        res.status(500).send("Failed to generate trophies");
    }
};
